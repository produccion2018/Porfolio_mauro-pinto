import { Reveal } from "./Reveal";

const techs = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vite",
  "Node.js",
  "Python",
  "HTML",
  "CSS",
  "Tailwind",
  "Git",
  "GitHub",
  "PostgreSQL",
];

export function Technologies() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">stack</p>
            <h2 className="text-display mt-3 text-2xl sm:text-3xl">
              Tecnologías que uso todos los días
            </h2>
          </div>

          <div className="relative min-w-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
              {[...techs, ...techs].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="shrink-0 rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
