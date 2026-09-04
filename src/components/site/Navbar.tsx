import { useEffect, useState } from "react";
import { Menu, X, Home, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png"; // Ajusta la ruta si es necesario (ej: "../../assets/logo.png")

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-[#00FF66]/20 bg-black/90 backdrop-blur-xl"
            : "border-b border-transparent bg-black/40 backdrop-blur-md",
        )}
      >
        <nav
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-8",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <a href="#inicio" className="group flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#00FF66]/30 bg-black overflow-hidden transition-colors duration-300 group-hover:border-[#00FF66]">
              <img
                src={logoImg}
                alt="Nodo Tech"
                className="size-full object-cover"
              />
            </span>
            <span className="truncate font-mono text-sm font-bold tracking-wider sm:text-base text-[#00FF66] drop-shadow-[0_0_12px_rgba(0,255,102,0.6)]">
              Nodo Tech
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group/link relative rounded-md px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 transition-colors duration-300 hover:text-[#00FF66]"
              >
                <span
                  aria-hidden
                  className="absolute left-0.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100 text-[#00FF66]"
                >
                  [
                </span>
                <span className="relative">{l.label}</span>
                <span
                  aria-hidden
                  className="absolute right-0.5 translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100 text-[#00FF66]"
                >
                  ]
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-[#00FF66] shadow-[0_0_10px_2px_rgba(0,255,102,0.8)] transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                />
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-3 inline-flex items-center rounded-lg border border-[#00FF66]/50 bg-black px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-[#00FF66] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,102,0.5)] font-bold"
            >
              Solicitar proyecto
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#00FF66]/30 bg-black text-[#00FF66] transition-colors hover:border-[#00FF66] hover:shadow-[0_0_10px_rgba(0,255,102,0.4)] lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {/* Menú mobile centrado con efecto de entrada escalonado */}
        <div
          className={cn(
            "overflow-hidden border-t border-[#00FF66]/20 bg-black/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
            open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col items-center gap-1 px-5 py-6 text-center">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                className={cn(
                  "w-full max-w-xs rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-[0.1em] text-zinc-400 transition-all duration-500 ease-out hover:bg-black hover:text-[#00FF66]",
                  open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${links.length * 60}ms` : "0ms" }}
              className={cn(
                "mt-3 w-full max-w-xs rounded-lg border border-[#00FF66]/50 px-4 py-3 text-center font-mono text-sm uppercase tracking-[0.1em] text-[#00FF66] transition-all duration-500 ease-out hover:bg-[#00FF66] hover:text-black font-bold",
                open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-95",
              )}
            >
              Solicitar proyecto
            </a>
          </div>
        </div>
      </header>

      {/* Barra flotante de accesos directos (solo mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-[#00FF66]/20 bg-black/95 px-4 py-2.5 backdrop-blur-xl lg:hidden [padding-bottom:calc(0.625rem+env(safe-area-inset-bottom))]">
        <div className="flex w-full max-w-xs items-center justify-between gap-2">
          <a
            href="#inicio"
            className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-zinc-400 transition-colors hover:text-[#00FF66]"
          >
            <Home className="size-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Inicio</span>
          </a>
          <a
            href="#contacto"
            className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-zinc-400 transition-colors hover:text-[#00FF66]"
          >
            <Mail className="size-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Contacto</span>
          </a>
          <a
            href="#contacto"
            className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-[#00FF66]/50 bg-black py-1.5 text-[#00FF66] transition-all hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_10px_rgba(0,255,102,0.4)]"
          >
            <Send className="size-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Proyecto</span>
          </a>
        </div>
      </div>
    </>
  );
}