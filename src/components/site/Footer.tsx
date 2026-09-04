import logoImg from "@/assets/logo.png";

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

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/feed/" },
  { label: "Instagram", href: "https://www.instagram.com/mpintoproducciones/" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#00FF66]/20 bg-black text-zinc-300">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#00FF66]/30 bg-black overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="Nodo Tech" 
                  className="size-full object-cover" 
                />
              </span>
              <span className="truncate font-mono text-base font-bold text-[#00FF66] drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                Nodo Tech
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Desarrollo de software y soluciones digitales de alto impacto con estilo futurista.
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF66]">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-[#00FF66]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF66]">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-sm text-zinc-400 transition-colors hover:text-[#00FF66]"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF66]">
              Contacto
            </h3>
            <p className="mt-4 break-words text-sm font-mono text-[#00FF66]">
              nodotech.web@gmail.com
            </p>
            <p className="mt-1 text-sm text-zinc-400">Buenos Aires, Argentina</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg border border-[#00FF66]/30 bg-black px-3 py-1.5 font-mono text-xs text-[#00FF66] transition-all hover:border-[#00FF66] hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_10px_rgba(0,255,102,0.4)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#00FF66]/20 pt-6">
          <p className="font-mono text-xs text-zinc-500">
            © 2026 Nodo Tech. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}