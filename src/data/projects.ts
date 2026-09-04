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
    id: "panel-operativo",
    title: "Panel operativo interno",
    description:
      "Demo placeholder: sistema de gestión con inventario, órdenes, permisos y reportes en tiempo real.",
    category: "Sistemas",
    technologies: ["React", "Python", "PostgreSQL"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
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
    id: "tienda-online",
    title: "Tienda online headless",
    description:
      "Demo placeholder: catálogo, carrito persistente, checkout y panel de pedidos para el comercio.",
    category: "E-commerce",
    technologies: ["React", "Vite", "Stripe", "Tailwind"],
    demoUrl: null,
    projectUrl: null,
    repoUrl: null,
    placeholder: true,
    hue: 30,
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