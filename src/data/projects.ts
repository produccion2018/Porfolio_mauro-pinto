import demoAgenda from "@/assets/demo-agenda.webp";
import demoCloudEsther from "@/assets/demo-cloud-esther.webp";
import demoDataflow from "@/assets/demo-dataflow.webp";
import demoFlujo from "@/assets/demo-flujo.webp";
import demoPostres from "@/assets/demo-postres.webp";
import demoSmartmarket from "@/assets/demo-smartmarket.webp";

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
    image: demoCloudEsther,
    title: "Cloud Esther — Sistema para clínicas odontológicas",
    description:
      "Sistema de gestión para consultorios: historia clínica, turnos, presupuestos y facturación por paciente, con panel de acciones rápidas para el equipo.",
    category: "SaaS",
    technologies: ["React", "TanStack Router", "Radix UI", "Node.js"],
    demoUrl: "https://cloud-esther-demo.vercel.app",
    projectUrl: "https://cloud-esther-demo.vercel.app",
    repoUrl: null,
    placeholder: false,
    hue: 195,
  },
  {
    id: "agenda-personal",
    image: demoAgenda,
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
    id: "dataflow",
    image: demoDataflow,
    title: "DataFlow — Panel Ejecutivo",
    description:
      "Dashboard ejecutivo con métricas en tiempo real: ingresos, usuarios activos, órdenes y tasa de conversión, con gráficos de ventas y distribución por categoría.",
    category: "Dashboards",
    technologies: ["React", "Recharts", "Tailwind"],
    demoUrl: "https://dashboard-six-sigma-77.vercel.app/",
    projectUrl: "https://dashboard-six-sigma-77.vercel.app/",
    repoUrl: null,
    placeholder: false,
    hue: 170,
  },
  {
    id: "postres-mireya",
    image: demoPostres,
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
    id: "smartmarket",
    image: demoSmartmarket,
    title: "SmartMarket — Sistema de punto de venta",
    description:
      "POS para comercios: caja con escaneo de códigos de barra, control de inventario y stock por categoría, descuentos y múltiples formas de pago.",
    category: "Sistemas",
    technologies: ["React", "TanStack Router", "Tailwind"],
    demoUrl: "https://smart-market-chi-one.vercel.app/",
    projectUrl: "https://smart-market-chi-one.vercel.app/",
    repoUrl: null,
    placeholder: false,
    hue: 145,
  },
  {
    id: "flujo-tablero",
    image: demoFlujo,
    title: "Flujo — Tablero de proyectos",
    description:
      "Tablero Kanban para equipos: arrastrar y soltar tareas, prioridades, fechas límite, filtros por persona, métricas en tiempo real y modo claro/oscuro.",
    category: "Sistemas",
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind"],
    demoUrl: "https://flujo-tablero-de-proyectos.vercel.app",
    projectUrl: "https://flujo-tablero-de-proyectos.vercel.app",
    repoUrl: null,
    placeholder: false,
    hue: 320,
  },
];