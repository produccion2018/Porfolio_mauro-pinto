import { useReveal } from "@/hooks/use-reveal";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Idea", text: "Entendemos qué necesitás construir." },
  { n: "02", title: "Diseño", text: "Transformamos la idea en una experiencia digital clara." },
  { n: "03", title: "Desarrollo", text: "Construimos el producto utilizando tecnologías modernas." },
  { n: "04", title: "Lanzamiento", text: "Dejamos tu producto listo para usuarios reales." },
];

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);

  return (
    <section id="proceso" className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="proceso"
          title="De la idea al producto"
          subtitle="Un recorrido corto, transparente y con entregas visibles en cada etapa."
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-border md:left-0 md:top-[15px] md:h-px md:w-full">
            <div
              className="h-full w-full origin-top bg-accent/70 transition-transform duration-[1600ms] ease-out md:origin-left"
              style={{ transform: visible ? "scale(1)" : "scaleY(0) scaleX(0)" }}
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 160} className="relative min-w-0 pl-12 md:pl-0">
                <span className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-border-strong bg-background md:relative md:mb-8">
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{s.n}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
