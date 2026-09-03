import { Reveal } from "./Reveal";
import mauroPhoto from "@/assets/mauro-pinto.jpeg";
import alejandroPhoto from "@/assets/alejandro-becerra.jpeg";

const team = [
  {
    name: "Mauro Alexander Pinto",
    role: "Desarrollador Full Stack",
    photo: mauroPhoto,
    experience: "+5 años de trayectoria",
    location: "Buenos Aires, Argentina",
    bio: "Licenciado en Comunicación Audiovisual, especializado en crear sitios web, aplicaciones, plataformas SaaS y herramientas digitales a medida, combinando tecnología, diseño y comunicación para desarrollar soluciones modernas, funcionales y profesionales.",
    specialties: [
      "Producto y arquitectura frontend",
      "Diseño de interfaces y design systems",
      "Desarrollo con React, HTML y CSS",
      "Automatización con IA y n8n",
      "APIs y bases de datos",
    ],
  },
  {
    name: "Alejandro Becerra Méndez",
    role: "Tecnólogo en Sistemas y Electrónica",
    photo: alejandroPhoto,
    experience: "+3 años de trayectoria",
    location: "Países Bajos, Europa",
    bio: "Especializado en Python e Inteligencia Artificial, enfocado en desarrollo de software, automatización de procesos, análisis y procesamiento de datos, machine learning, desarrollo de soluciones basadas en IA e integración de sistemas electrónicos y tecnológicos.",
    specialties: [
      "Especialista en Python",
      "Sistemas de gestión a medida",
      "Integraciones y automatizaciones",
      "Inteligencia artificial y automatización de procesos",
    ],
  },
];

export function About() {
  return (
    <section id="sobre-nosotros" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="space-y-20">
        {team.map((member, i) => (
          <div
            key={member.name}
            className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-16"
          >
            <Reveal className="min-w-0">
              <div className="relative w-full max-w-xs animate-float-slow">
                {/* glow difuso detrás de la foto: funde el borde con el fondo */}
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-full bg-accent/15 blur-3xl"
                />
                <div
                  className="relative aspect-[4/5] w-full"
                  style={{
                    maskImage:
                      "radial-gradient(120% 120% at 50% 40%, black 62%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(120% 120% at 50% 40%, black 62%, transparent 100%)",
                  }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                  />
                  {/* degradado inferior: la placa de texto "nace" de la propia foto, sin caja */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-4 px-4 text-center">
                  <p className="font-display text-sm font-semibold">{member.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140} className="min-w-0">
              {i === 0 && (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                    sobre nosotros
                  </p>
                  <h2 className="text-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
                    Detrás de cada proyecto hay un equipo.
                  </h2>
                </>
              )}
              <p className={i === 0 ? "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground" : "max-w-xl text-base leading-relaxed text-muted-foreground"}>
                {member.bio}
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Experiencia
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{member.experience}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Ubicación
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{member.location}</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2">
                {member.specialties.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}