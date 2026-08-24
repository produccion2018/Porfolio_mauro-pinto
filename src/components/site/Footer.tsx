import { Terminal } from "lucide-react";
import { BRAND } from "@/data/brand";

const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Sobre mí", href: "#sobre-mi" },
];

const services = [
  "Sitios web",
  "E-commerce",
  "Sistemas de gestión",
  "SaaS",
  "Dashboards",
  "Automatización",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface">
                <Terminal className="size-4 text-accent" strokeWidth={1.75} />
              </span>
              <span className="truncate font-display text-base font-semibold">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BRAND.tagline}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Contacto
            </h3>
            <p className="mt-4 break-words text-sm text-muted-foreground">{BRAND.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">{BRAND.location}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {BRAND.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-block rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © 2026 {BRAND.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
