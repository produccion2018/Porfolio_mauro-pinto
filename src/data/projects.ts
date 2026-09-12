export type ProjectCategory = "SaaS" | "Web" | "E-commerce" | "Dashboards" | "Sistemas";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image?: string;
  /** URL embebible del demo. Si es null, el modal muestra el preview estático. */
  demoUrl: string | null;
  projectUrl: string | null;
  repoUrl: string | null;
  /** Marcá en false cuando el proyecto ya sea real. */
  placeholder: boolean;
  /** Acento visual del preview generado (0-360). */
  hue: number;
};

export const projectCategories = [
  "Todos",
  "SaaS",
  "Web",
  "E-commerce",
  "Dashboards",
  "Sistemas",
] as const;

export type FilterCategory = (typeof projectCategories)[number];

/**
 * Fuente única de verdad del portfolio.
 * Para agregar un proyecto real: duplicá un objeto, cambiá los campos
 * y reemplazá `demoUrl` / `projectUrl` / `repoUrl` por tus URLs.
 * `image` acepta una ruta importada desde src/assets o una URL absoluta.
 */
export const projects: Project[] = [
  {
    id: "cloud-esther",
    title: "Cloud Esther — Sistema para clínicas odontológicas",
    description:
      "Sistema de gestión para consultorios: historia clínica, turnos, presupuestos y facturación por paciente, con panel de acciones rápidas para el equipo.",
    category: "SaaS",
    technologies: ["React", "TanStack Router", "Radix UI", "Node.js"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
    hue: 195,
  },
  {
    id: "agenda-personal",
    title: "Agenda Personal",
    description:
      "App para organizar tu vida diaria: tareas, hábitos, calendario, recordatorios y notas rápidas en un solo panel, con modo oscuro/claro y color de sidebar personalizable.",
    category: "Sistemas",
    technologies: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://agenda-demo-hazel.vercel.app",
    projectUrl: "https://agenda-demo-hazel.vercel.app",
    repoUrl: null,
    placeholder: false,
    hue: 260,
  },
  {
    id: "analytics-board",
    title: "Dashboard de métricas",
    description:
      "Demo placeholder: visualización de KPIs, cohortes y series temporales con filtros dinámicos.",
    category: "Dashboards",
    technologies: ["React", "Recharts", "Tailwind"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
    hue: 150,
  },
  {
    id: "postres-mireya",
    title: "Postres Mireya",
    description:
      "Sitio de repostería artesanal por encargo: menú, galería de productos, carrito de compra y pedidos en línea.",
    category: "E-commerce",
    technologies: ["React", "TanStack Router", "Tailwind"],
    demoUrl: "https://postre-mireya.vercel.app/",
    projectUrl: "https://postre-mireya.vercel.app/",
    repoUrl: null,
    placeholder: false,
    hue: 330,
  },
  {
    id: "sitio-corporativo",
    title: "Sitio corporativo de alto impacto",
    description:
      "Demo placeholder: landing institucional con animaciones, blog y formularios conectados.",
    category: "Web",
    technologies: ["React", "Tailwind", "Vite"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
    hue: 210,
  },
  {
    id: "automatizacion-flows",
    title: "Motor de automatizaciones",
    description:
      "Demo placeholder: flujos automáticos entre herramientas, disparadores y registro de ejecuciones.",
    category: "Sistemas",
    technologies: ["Node.js", "Python", "Webhooks"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
    hue: 320,
  },
];