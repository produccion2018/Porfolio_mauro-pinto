import { useMemo, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-xs font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:accent-ring"
          >
            <Play className="size-3.5" strokeWidth={2} />
            Ver demo
          </button>
          <a
            href={project.projectUrl ?? "#contacto"}
            target={project.projectUrl ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-3.5 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-2"
          >
            Ver proyecto
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<FilterCategory>("Todos");
  const [active, setActive] = useState<Project | null>(null);

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
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
                filter === c
                  ? "border-transparent bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
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

        <p className="mt-8 font-mono text-[11px] text-muted-foreground">
          * Proyectos de demostración (placeholders). Editá{" "}
          <span className="text-accent">src/data/projects.ts</span> para cargar los reales.
        </p>
      </div>

      <DemoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
