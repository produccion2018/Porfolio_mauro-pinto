import {
  Globe,
  ShoppingCart,
  SlidersHorizontal,
  Layers,
  LineChart,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Service = { icon: LucideIcon; title: string; description: string };

const services: Service[] = [
  {
    icon: Globe,
    title: "Sitios web",
    description: "Sitios corporativos, institucionales y páginas profesionales.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Tiendas online modernas preparadas para vender.",
  },
  {
    icon: SlidersHorizontal,
    title: "Sistemas de gestión",
    description: "Paneles administrativos y herramientas para gestionar negocios.",
  },
  {
    icon: Layers,
    title: "SaaS",
    description: "Plataformas digitales con usuarios, módulos y funcionalidades escalables.",
  },
  {
    icon: LineChart,
    title: "Dashboards",
    description: "Interfaces para visualizar información y tomar decisiones.",
  },
  {
    icon: Workflow,
    title: "Automatización",
    description: "Procesos automatizados para ahorrar tiempo y reducir tareas repetitivas.",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <Reveal
      as="article"
      delay={index * 70}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-border-strong hover:bg-surface-2"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/12" />
      <span className="grid size-11 place-items-center rounded-xl border border-border bg-background transition-colors duration-500 group-hover:border-accent/50">
        <Icon className="size-5 text-foreground transition-colors duration-500 group-hover:text-accent" strokeWidth={1.6} />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <span className="mt-6 block h-px w-full origin-left scale-x-0 bg-accent/60 transition-transform duration-500 group-hover:scale-x-100" />
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicios" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="servicios"
        title="¿Qué puedo desarrollar para tu negocio?"
        subtitle="Del sitio institucional al producto SaaS completo: cada solución se construye sobre la misma base técnica sólida."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
