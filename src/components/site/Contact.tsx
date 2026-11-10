import { useState, type FormEvent, useEffect } from "react";
import { createServerFn } from "@tanstack/react-start";
import { Check, Send, AlertCircle, Loader2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const projectTypes = [
  "Sitio web",
  "E-commerce",
  "Sistema de gestión",
  "SaaS",
  "Dashboard",
  "Automatización",
  "Otro",
];

const budgets = [
  "A definir / Según alcance",
  "USD 1.500 – 3.500 (aprox. $2.300.000 – $5.400.000)",
  "USD 3.500 – 7.000 (aprox. $5.400.000 – $10.800.000)",
  "USD 7.000 – 15.000 (aprox. $10.800.000 – $23.200.000)",
  "Más de USD 15.000 (Enterprise)",
];

/* =====================================================
   BACKEND DEL FORMULARIO (corre solo en el servidor)
   -----------------------------------------------------
   1. Guarda la consulta en Neon (Postgres).
   2. Te manda el email con Resend.
   Variables de entorno (Vercel → Settings → Environment Variables):
     DATABASE_URL       → cadena de conexión de Neon
     RESEND_API_KEY     → API key de Resend
     CONTACT_TO_EMAIL   → a dónde llegan las consultas
     CONTACT_FROM_EMAIL → remitente (opcional, ej. "Nodo Tech <hola@tudominio.com>")
   ===================================================== */

type ContactInput = {
  nombre: string;
  email: string;
  empresa: string;
  tipo: string;
  presupuesto: string;
  mensaje: string;
  website: string; // honeypot anti-bots: debe llegar vacío
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const sendContact = createServerFn({ method: "POST" })
  .inputValidator((raw: ContactInput): ContactInput => {
    const data = {
      nombre: clean(raw?.nombre, 120),
      email: clean(raw?.email, 200),
      empresa: clean(raw?.empresa, 160),
      tipo: clean(raw?.tipo, 80),
      presupuesto: clean(raw?.presupuesto, 120),
      mensaje: clean(raw?.mensaje, 5000),
      website: clean(raw?.website, 200),
    };
    if (data.nombre.length < 2) throw new Error("Ingresá tu nombre.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("Ingresá un email válido.");
    if (data.mensaje.length < 10) throw new Error("Contanos un poco más en el mensaje.");
    return data;
  })
  .handler(async ({ data }) => {
    // Bot detectado: respondemos OK sin guardar ni enviar nada.
    if (data.website) return { ok: true };

    const { DATABASE_URL, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
    let saved = false;
    let mailed = false;

    // 1) Guardar en Neon
    if (DATABASE_URL) {
      try {
        const { neon } = await import("@neondatabase/serverless");
        const sql = neon(DATABASE_URL);
        await sql`CREATE TABLE IF NOT EXISTS contact_requests (
          id SERIAL PRIMARY KEY,
          nombre TEXT NOT NULL,
          email TEXT NOT NULL,
          empresa TEXT,
          tipo TEXT,
          presupuesto TEXT,
          mensaje TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
        await sql`INSERT INTO contact_requests (nombre, email, empresa, tipo, presupuesto, mensaje)
          VALUES (${data.nombre}, ${data.email}, ${data.empresa}, ${data.tipo}, ${data.presupuesto}, ${data.mensaje})`;
        saved = true;
      } catch (err) {
        console.error("[contacto] Error guardando en Neon:", err);
      }
    }

    // 2) Enviar el email
    if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
      const rows: [string, string][] = [
        ["Nombre", data.nombre],
        ["Email", data.email],
        ["Empresa", data.empresa || "—"],
        ["Tipo de proyecto", data.tipo],
        ["Presupuesto", data.presupuesto],
      ];
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0b0f0d;color:#e5e7eb;padding:28px;border-radius:14px">
          <p style="color:#00FF66;font-family:monospace;letter-spacing:3px;font-size:11px;margin:0">NUEVA CONSULTA · NODO TECH</p>
          <h2 style="margin:8px 0 20px;color:#fff">${escapeHtml(data.nombre)} quiere un proyecto</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px 0;color:#9ca3af;width:160px">${k}</td><td style="padding:8px 0;color:#fff">${escapeHtml(v)}</td></tr>`,
              )
              .join("")}
          </table>
          <p style="color:#9ca3af;font-size:13px;margin:20px 0 6px">Mensaje</p>
          <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px;white-space:pre-wrap;color:#fff;font-size:14px">${escapeHtml(data.mensaje)}</div>
          <p style="color:#6b7280;font-size:12px;margin-top:20px">Respondé este email para contestarle directo a ${escapeHtml(data.email)}.</p>
        </div>`;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: CONTACT_FROM_EMAIL || "Nodo Tech <onboarding@resend.dev>",
            to: CONTACT_TO_EMAIL.split(",").map((e) => e.trim()),
            reply_to: data.email,
            subject: `Nueva consulta: ${data.tipo} — ${data.nombre}`,
            html,
          }),
        });
        if (!res.ok) console.error("[contacto] Resend respondió", res.status, await res.text());
        mailed = res.ok;
      } catch (err) {
        console.error("[contacto] Error enviando email:", err);
      }
    }

    if (!saved && !mailed) {
      throw new Error("No pudimos enviar tu consulta. Escribinos directo por email.");
    }
    return { ok: true };
  });

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-[#00FF66]/60 focus:ring-2 focus:ring-[#00FF66]/20";

const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [mathProblem, setMathProblem] = useState({ n1: 2, n2: 1 });
  const [userAnswer, setUserAnswer] = useState("");
  const [mathError, setMathError] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  // Genera un reto de multiplicación aleatorio (tablas del 2 al 9) al cargar
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 al 9
    const n2 = Math.floor(Math.random() * 9) + 2; // 2 al 10
    setMathProblem({ n1, n2 });
  }, []);

  const newChallenge = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 9) + 2;
    setMathProblem({ n1, n2 });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setServerError("");

    const expected = mathProblem.n1 * mathProblem.n2;
    if (parseInt(userAnswer.trim(), 10) !== expected) {
      setMathError(true);
      return;
    }
    setMathError(false);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");

    setSending(true);
    try {
      await sendContact({
        data: {
          nombre: get("nombre"),
          email: get("email"),
          empresa: get("empresa"),
          tipo: get("tipo"),
          presupuesto: get("presupuesto"),
          mensaje: get("mensaje"),
          website: get("website"),
        },
      });
      form.reset();
      setUserAnswer("");
      newChallenge();
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "No pudimos enviar tu consulta. Probá de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeading
            eyebrow="contacto"
            title="Contanos tu proyecto"
            subtitle="Completá el formulario con la mayor cantidad de detalle posible y te respondemos con una propuesta técnica y comercial concreta."
          />

          <Reveal delay={120} className="min-w-0">
            <form onSubmit={handleSubmit} className="surface-panel p-6 sm:p-8">
              {/* Campo trampa para bots: oculto para personas */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className={labelClass} htmlFor="nombre">
                    Nombre
                  </label>
                  <input id="nombre" name="nombre" required placeholder="Tu nombre" className={fieldClass} />
                </div>
                <div className="min-w-0">
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className={fieldClass}
                  />
                </div>
                <div className="min-w-0">
                  <label className={labelClass} htmlFor="empresa">
                    Empresa
                  </label>
                  <input id="empresa" name="empresa" placeholder="Opcional" className={fieldClass} />
                </div>
                <div className="min-w-0">
                  <label className={labelClass} htmlFor="tipo">
                    Tipo de proyecto
                  </label>
                  <select id="tipo" name="tipo" className={fieldClass} defaultValue={projectTypes[0]}>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-surface">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <label className={labelClass} htmlFor="presupuesto">
                    Presupuesto aproximado
                  </label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    className={fieldClass}
                    defaultValue={budgets[0]}
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-surface">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <label className={labelClass} htmlFor="mensaje">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Contanos qué querés construir…"
                    className={`${fieldClass} resize-y`}
                  />
                </div>
              </div>

              {/* Sección de validación anti-bot (Tablas de multiplicar) y botón de envío */}
              <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      Verificación: ¿Cuánto es <strong className="text-[#00FF66]">{mathProblem.n1} × {mathProblem.n2}</strong>?
                    </span>
                    <input
                      type="number"
                      required
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        if (mathError) setMathError(false);
                      }}
                      placeholder="?"
                      className="w-16 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-center font-mono text-sm text-foreground outline-none focus:border-[#00FF66]"
                    />
                  </div>
                  {mathError && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle className="size-3" /> Resultado incorrecto, intentá de nuevo.
                    </span>
                  )}
                  {sent && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00FF66]">
                      <Check className="size-3" /> ¡Consulta enviada! Te respondemos a la brevedad.
                    </span>
                  )}
                  {serverError && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-red-400">
                      <AlertCircle className="size-3" /> {serverError}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="disabled:pointer-events-none disabled:opacity-70 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#00FF66] bg-[#00FF66] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)] active:translate-y-0"
                >
                  {sending ? (
                    <Loader2 className="size-4 animate-spin" strokeWidth={1.8} />
                  ) : (
                    <Send className="size-4" strokeWidth={1.8} />
                  )}
                  {sending ? "Enviando…" : "Enviar consulta"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}