import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF66]/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 lg:py-36">
        <Reveal>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">¿Tenés una idea?</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Contanos qué querés construir y podemos convertir esa idea en un producto digital.
            </p>
            <a
              href="#contacto"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-[#00FF66] bg-[#00FF66] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)]"
            >
              Quiero comenzar
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}