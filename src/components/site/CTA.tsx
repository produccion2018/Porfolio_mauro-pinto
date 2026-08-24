import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 lg:py-36">
        <Reveal>
          <div className="relative mx-auto max-w-2xl">
            <span className="pointer-events-none absolute -left-8 -top-10 hidden animate-drift rounded-lg border border-border bg-surface/70 px-3 py-2 font-mono text-[10px] text-muted-foreground backdrop-blur sm:block">
              npm run build
            </span>
            <span className="pointer-events-none absolute -right-6 -bottom-8 hidden animate-float-slow rounded-lg border border-border bg-surface/70 px-3 py-2 font-mono text-[10px] text-muted-foreground backdrop-blur sm:block">
              status: <span className="text-accent">ready</span>
            </span>

            <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">¿Tenés una idea?</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Contame qué querés construir y podemos convertir esa idea en un producto digital.
            </p>
            <a
              href="#contacto"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:accent-ring"
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
