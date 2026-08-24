import type { Project } from "@/data/projects";

/** Preview generado por código (sin imágenes de stock). Usa `project.image` si existe. */
export function ProjectPreview({ project, tall = false }: { project: Project; tall?: boolean }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Vista previa de ${project.title}`}
        loading="lazy"
        className={`w-full object-cover ${tall ? "h-full" : "aspect-[16/10]"}`}
      />
    );
  }

  const accent = `oklch(0.8 0.12 ${project.hue})`;

  return (
    <div
      className={`grid-backdrop relative w-full overflow-hidden bg-surface ${tall ? "h-full min-h-64" : "aspect-[16/10]"}`}
    >
      <div
        className="absolute -left-10 -top-10 size-48 rounded-full blur-3xl opacity-25"
        style={{ background: accent }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: accent }} />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-background/70 p-2 backdrop-blur-sm"
            >
              <div className="h-1.5 w-8 rounded-full bg-border-strong" />
              <div className="mt-2 h-2.5 w-12 rounded-full" style={{ background: accent, opacity: 0.7 }} />
            </div>
          ))}
        </div>

        <div className="flex items-end gap-1.5">
          {[30, 55, 40, 72, 48, 88, 60, 76].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h * 0.34}px`,
                background: `linear-gradient(to top, transparent, ${accent})`,
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
