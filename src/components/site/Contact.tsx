import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
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

const budgets = ["A definir", "< USD 1.000", "USD 1.000 – 3.000", "USD 3.000 – 8.000", "> USD 8.000"];

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-ring";

const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

export function Contact() {
  const [sent, setSent] = useState(false);

  // TODO backend: enviar `new FormData(e.currentTarget)` a tu API o servicio de formularios.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto" className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeading
            eyebrow="contacto"
            title="Contame tu proyecto"
            subtitle="Completá el formulario con la mayor cantidad de detalle posible y te respondo con una propuesta concreta."
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
                    placeholder="Contame qué querés construir…"
                    className={`${fieldClass} resize-y`}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <p
                  aria-live="polite"
                  className={`min-w-0 truncate text-xs transition-opacity duration-500 ${sent ? "text-accent opacity-100" : "text-muted-foreground opacity-70"}`}
                >
                  {sent ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="size-3.5" /> Mensaje preparado correctamente.
                    </span>
                  ) : (
                    "Frontend only · listo para conectar un backend."
                  )}
                </p>
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:accent-ring active:translate-y-0"
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
