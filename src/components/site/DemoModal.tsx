import { useEffect } from "react";
import { X, ExternalLink, Github, MonitorPlay } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  MockDashboard,
  MockWebsite,
  MockEcommerce,
  MockSystemLogin,
  MockAnalytics,
} from "./MockDashboard";

/** Elige el mockup correcto según la categoría del proyecto. */
function ProjectMock({ project }: { project: Project }) {
  switch (project.category) {
    case "SaaS":
      return <MockDashboard />;
    case "Web":
      return <MockWebsite />;
    case "E-commerce":
      return <MockEcommerce />;
    case "Sistemas":
      return <MockSystemLogin />;
    case "Dashboards":
      return <MockAnalytics />;
    default:
      return <MockDashboard />;
  }
}

export function DemoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Demo de ${project.title}`}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-background/85 p-0 backdrop-blur-md duration-300 animate-in fade-in sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-2xl border border-border-strong bg-surface shadow-[var(--shadow-elevated)] duration-500 animate-in slide-in-from-bottom-6 sm:rounded-2xl"
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
          <div className="flex shrink-0 gap-1.5">
            <button
              aria-label="Cerrar demo"
              onClick={onClose}
              className="size-3 rounded-full bg-destructive/70 transition-opacity hover:opacity-70"
            />
            <span className="size-3 rounded-full bg-muted" />
            <span className="size-3 rounded-full bg-muted" />
          </div>
          <div className="truncate rounded-md border border-border bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
            {project.demoUrl ?? `demo.local/${project.id}`}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-background">
          {project.demoUrl ? (
            <iframe
              src={project.demoUrl}
              title={`Demo de ${project.title}`}
              className="h-[70vh] w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="relative">
              <ProjectMock project={project} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4">
                <span className="rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                  demo placeholder · conectá tu URL en src/data/projects.ts
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-surface-2 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">{project.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {project.technologies.join(" · ")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                aria-label="Ver repositorio"
              >
                <Github className="size-4" />
              </a>
            )}
            <a
              href={project.demoUrl ?? project.projectUrl ?? "#proyectos"}
              target={project.demoUrl || project.projectUrl ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,255,102,0.5)]"
            >
              <MonitorPlay className="size-3.5" />
              Abrir en pestaña
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}