import { useState, type FormEvent, useEffect } from "react";
import { Check, Send, AlertCircle } from "lucide-react";
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
  "USD 1.500 – 3.500",
  "USD 3.500 – 7.000",
  "USD 7.000 – 15.000",
  "Más de USD 15.000 (Enterprise)",
];

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-[#00FF66]/60 focus:ring-2 focus:ring-[#00FF66]/20";

const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [mathProblem, setMathProblem] = useState({ n1: 2, n2: 1 });
  const [userAnswer, setUserAnswer] = useState("");
  const [mathError, setMathError] = useState(false);

  // Genera un reto de multiplicación aleatorio (tablas del 2 al 9) al cargar
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 al 9
    const n2 = Math.floor(Math.random() * 9) + 2; // 2 al 10
    setMathProblem({ n1, n2 });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expected = mathProblem.n1 * mathProblem.n2;
    if (parseInt(userAnswer.trim(), 10) !== expected) {
      setMathError(true);
      return;
    }

    setMathError(false);
    setSent(true);
    setUserAnswer("");
    
    // Generar un nuevo reto para la próxima vez
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 9) + 2;
    setMathProblem({ n1, n2 });

    setTimeout(() => setSent(false), 5000);
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
                      <Check className="size-3" /> ¡Mensaje enviado con éxito!
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#00FF66] bg-[#00FF66] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)] active:translate-y-0"
                >
                  <Send className="size-4" strokeWidth={1.8} />
                  Enviar consulta
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}