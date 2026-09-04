import { ArrowUpRight } from "lucide-react";
import { MockDashboard, BrowserFrame } from "./MockDashboard";
import { Reveal } from "./Reveal";

/** Cambiá esta constante por la URL real cuando el demo esté publicado. */
const FEATURED_DEMO_URL: string | null = null;

export function DemoShowcase() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#00FF66]/8 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <Reveal className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00FF66]">
              demo destacada
            </p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
              Probá una demo
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Así se siente un producto terminado: navegación, datos, gráficos y flujos reales
              dentro de una interfaz pensada para usarse todos los días.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Navegación lateral y módulos independientes",
                "Métricas, gráficos y tablas en tiempo real",
                "Componentes reutilizables y diseño responsive",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#00FF66]" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={FEATURED_DEMO_URL ?? "#proyectos"}
              {...(FEATURED_DEMO_URL ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-[#00FF66] bg-[#00FF66] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)]"
            >
              Explorar demo
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <Reveal delay={150} className="min-w-0">
            <BrowserFrame url="demo.tuproducto.app/dashboard" className="animate-float-slow">
              <MockDashboard />
            </BrowserFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}