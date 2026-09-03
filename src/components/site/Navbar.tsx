import { useEffect, useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/data/brand";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <a href="#inicio" className="group flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-2 transition-colors duration-300 group-hover:border-accent/60">
            <Terminal className="size-4 text-accent" strokeWidth={1.75} />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-base">
            {BRAND.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group/link relative rounded-md px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-accent"
            >
              <span
                aria-hidden
                className="absolute left-0.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
              >
                [
              </span>
              <span className="relative">{l.label}</span>
              <span
                aria-hidden
                className="absolute right-0.5 translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
              >
                ]
              </span>
              <span
                aria-hidden
                className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-accent shadow-[0_0_8px_1px_oklch(0.83_0.11_195_/_70%)] transition-transform duration-300 ease-out group-hover/link:scale-x-100"
              />
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-3 inline-flex items-center rounded-lg border border-accent/50 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:accent-ring"
          >
            Solicitar proyecto
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-surface hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg border border-accent/50 px-4 py-3 text-center font-mono text-sm uppercase tracking-[0.1em] text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Solicitar proyecto
          </a>
        </div>
      </div>
    </header>
  );
}