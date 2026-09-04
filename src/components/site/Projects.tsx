import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import {
  projects,
  projectCategories,
  type FilterCategory,
  type Project,
} from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ProjectPreview } from "./ProjectPreview";
import { DemoModal } from "./DemoModal";
import { FILTER_PROJECTS_EVENT } from "./Services";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
  onDemo,
}: {
  project: Project;
  index: number;
  onDemo: (p: Project) => void;
}) {
  return (
    <article
      style={{ animationDelay: `${index * 60}ms` }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 animate-in fade-in slide-in-from-bottom-3 hover:-translate-y-1.5 hover:border-border-strong"
    >
      <div className="relative overflow-hidden border-b border-border">
        <div className="transition-transform duration-700 group-hover:scale-[1.04]">
          <ProjectPreview project={project} />
        </div>
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
          {project.category}
        </span>
        {project.placeholder && (
          <span className="absolute right-3 top-3 rounded-full border border-accent/40 bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
            demo
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => onDemo(project)}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-background active:bg-accent active:text-background"
          >
            <Play className="size-3.5" strokeWidth={2} />
            Ver demo
          </button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<FilterCategory>("Todos");
  const [active, setActive] = useState<Project | null>(null);

  // Escucha el evento disparado desde las cards de "Servicios" para
  // aplicar el filtro correspondiente cuando el usuario llega desde ahí.
  useEffect(() => {
    const onFilterFromServices = (e: Event) => {
      const category = (e as CustomEvent<FilterCategory>).detail;
      if (category) setFilter(category);
    };

    window.addEventListener(FILTER_PROJECTS_EVENT, onFilterFromServices);
    return () => window.removeEventListener(FILTER_PROJECTS_EVENT, onFilterFromServices);
  }, []);

  const visible = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="proyectos" className="relative border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="portfolio"
          title="Proyectos y demos"
          subtitle="Explorá algunos de los productos y experiencias digitales que desarrollé."
        />

        <Reveal className="mt-10 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 font-mono",
                filter === c
                  ? "border-[#00FF66] bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]"
                  : "border-[#00FF66]/30 text-zinc-400 hover:border-[#00FF66] hover:text-[#00FF66]",
              )}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onDemo={setActive} />
          ))}
        </div>
      </div>

      <DemoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}