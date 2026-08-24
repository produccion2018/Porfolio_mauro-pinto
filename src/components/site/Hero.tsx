import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { MockDashboard, BrowserFrame } from "./MockDashboard";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const rect = zoneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: py * -8 });
  };

  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={zoneRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:pb-32"
      >
        <div
          data-visible={mounted}
          className="reveal min-w-0"
          style={{ transitionDelay: "80ms" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="size-3 text-accent" strokeWidth={2} />
            product studio
          </span>

          <h1 className="text-display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
            Creo productos digitales que{" "}
            <span className="relative inline-block">
              hacen crecer
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent/70 [animation:line-grow_1.2s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]" />
            </span>{" "}
            tu negocio.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Desarrollo sitios web, sistemas y plataformas SaaS modernas, escalables y diseñadas para
            resolver problemas reales.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:accent-ring"
            >
              Ver mis proyectos
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface"
            >
              Solicitar un proyecto
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["Enfoque", "Producto"],
              ["Entrega", "Iterativa"],
              ["Código", "Escalable"],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1 truncate font-display text-base">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-visible={mounted}
          className="reveal relative min-w-0"
          style={{ transitionDelay: "260ms" }}
        >
          <div
            className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d]"
            style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          >
            <div className="animate-float-slow">
              <BrowserFrame url="app.tuproducto.com/panel">
                <div className="relative">
                  <MockDashboard compact />
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="animate-scan h-16 w-full bg-gradient-to-b from-transparent via-accent/8 to-transparent" />
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <div className="animate-drift absolute -left-4 bottom-8 hidden w-52 rounded-xl border border-border-strong bg-surface-2/90 p-3 backdrop-blur-md sm:block">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                deploy
              </p>
              <p className="mt-1 font-mono text-xs">
                <span className="text-accent">✓</span> build passed · 12s
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-background">
                <div className="h-full w-3/4 rounded-full bg-accent/70" />
              </div>
            </div>

            <div className="animate-float-slow absolute -right-3 -top-6 hidden rounded-xl border border-border-strong bg-surface-2/90 px-3 py-2 font-mono text-[10px] backdrop-blur-md md:block">
              <span className="text-muted-foreground">const</span> idea{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-accent">producto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
