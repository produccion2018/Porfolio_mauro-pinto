import { User } from "lucide-react";
import { BRAND } from "@/data/brand";
import { Reveal } from "./Reveal";

const specialties = [
  "Producto y arquitectura frontend",
  "Sistemas de gestión a medida",
  "Integraciones y automatizaciones",
  "Diseño de interfaces y design systems",
];

export function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="min-w-0">
          {/* Espacio reservado para tu fotografía: reemplazá este bloque por <img src={...} /> */}
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="grid-backdrop absolute inset-0 opacity-70" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-border-strong bg-background">
                  <User className="size-6 text-muted-foreground" strokeWidth={1.5} />
                </span>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  espacio para tu foto
                </p>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 rounded-lg border border-border bg-background/80 px-3 py-2 backdrop-blur">
              <p className="font-display text-sm font-semibold">{BRAND.personName}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{BRAND.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">sobre mí</p>
          <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Detrás de cada proyecto hay una persona.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            [Descripción editable] Contá acá quién sos, cómo trabajás y qué tipo de problemas te
            gusta resolver. Este texto es un placeholder pensado para que lo reemplaces por tu
            historia real.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Experiencia
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                [Años de experiencia / trayectoria]
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Ubicación
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{BRAND.location}</dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
