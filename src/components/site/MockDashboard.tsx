import {
  CalendarDays,
  Users,
  FileText,
  Wallet,
  Stethoscope,
  Search,
  ShoppingCart,
  Lock,
  Mail,
  KeyRound,
  PieChart,
  Shirt,
  Headphones,
  Watch,
  Camera,
} from "lucide-react";

/** Mockup 1: SaaS — Cloud Esther, sistema de gestión para clínicas odontológicas. */
export function MockDashboard() {
  const agenda = [
    { hora: "09:00", paciente: "Sofía Martínez", tratamiento: "Control de ortodoncia" },
    { hora: "09:30", paciente: "Diego Fernández", tratamiento: "Extracción" },
    { hora: "10:15", paciente: "Martina Ruiz", tratamiento: "Limpieza dental" },
    { hora: "11:00", paciente: "Carlos Gómez", tratamiento: "Endodoncia" },
  ];

  const pacientes = [
    { id: "#2210", nombre: "Sofía Martínez", tratamiento: "Ortodoncia", estado: "En tratamiento", monto: "$ 45.000" },
    { id: "#2211", nombre: "Diego Fernández", tratamiento: "Cirugía", estado: "Alta", monto: "$ 18.500" },
    { id: "#2212", nombre: "Martina Ruiz", tratamiento: "Limpieza", estado: "Al día", monto: "$ 6.200" },
    { id: "#2213", nombre: "Carlos Gómez", tratamiento: "Endodoncia", estado: "Pendiente", monto: "$ 32.000" },
  ];

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] bg-background text-foreground">
      <aside className="hidden w-48 flex-col gap-1 border-r border-border bg-surface p-3 sm:flex">
        <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Cloud Esther
        </p>
        {[
          { icon: CalendarDays, label: "Turnos", active: true },
          { icon: Users, label: "Pacientes" },
          { icon: Stethoscope, label: "Historia clínica" },
          { icon: FileText, label: "Presupuestos" },
          { icon: Wallet, label: "Facturación" },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={
              "flex items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors " +
              (active ? "bg-surface-2 text-foreground" : "text-muted-foreground")
            }
          >
            <Icon className="size-3.5" strokeWidth={1.75} />
            {label}
          </div>
        ))}
      </aside>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-4">
          <div className="min-w-0">
            <h4 className="truncate font-display text-base font-semibold">Turnos de hoy</h4>
            <p className="truncate text-[11px] text-muted-foreground">Agenda en tiempo real · 4 de septiembre</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" /> en línea
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Turnos hoy", value: "18" },
            { label: "Pacientes activos", value: "342" },
            { label: "Facturación del mes", value: "$ 1.240.500" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg border border-border bg-surface p-3">
              <p className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-1 font-display text-lg font-semibold">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-border bg-surface p-3">
          <p className="text-[11px] text-muted-foreground">Agenda</p>
          <div className="mt-2 divide-y divide-border/60">
            {agenda.map((a) => (
              <div key={a.hora} className="flex items-center gap-3 py-2 text-[11px]">
                <span className="w-12 shrink-0 font-mono text-accent">{a.hora}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{a.paciente}</span>
                <span className="hidden shrink-0 text-muted-foreground sm:block">{a.tratamiento}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-[11px]">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-3 py-2 font-normal">ID</th>
                <th className="px-3 py-2 font-normal">Paciente</th>
                <th className="hidden px-3 py-2 font-normal sm:table-cell">Tratamiento</th>
                <th className="px-3 py-2 font-normal">Estado</th>
                <th className="px-3 py-2 text-right font-normal">Monto</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0">
                  <td className="px-3 py-2 font-mono text-muted-foreground">{p.id}</td>
                  <td className="max-w-[9rem] truncate px-3 py-2">{p.nombre}</td>
                  <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">{p.tratamiento}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono">{p.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Mockup 2: Web — sitio institucional con navbar, hero y features, con texto real. */
export function MockWebsite() {
  return (
    <div className="bg-background text-foreground">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="font-mono text-xs font-semibold tracking-wide">marca.co</span>
        </div>
        <div className="hidden gap-4 sm:flex">
          {["Inicio", "Servicios", "Nosotros", "Contacto"].map((l) => (
            <span
              key={l}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {l}
            </span>
          ))}
        </div>
        <span className="rounded-md border border-accent/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
          Contacto
        </span>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 sm:items-center sm:p-8">
        <div>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
            Sitio institucional
          </span>
          <h4 className="mt-4 font-display text-xl font-bold leading-snug">
            Creamos experiencias web que convierten visitas en clientes.
          </h4>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Diseño a medida, carga ultra rápida y contenido pensado para que tus
            clientes te encuentren y te elijan.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="rounded-lg bg-accent px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-background">
              Empezar
            </span>
            <span className="rounded-lg border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Ver más
            </span>
          </div>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-surface">
          <Camera className="size-8 text-muted-foreground/50" strokeWidth={1.25} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 pb-6 sm:px-8">
        {[
          { label: "Diseño a medida" },
          { label: "SEO optimizado" },
          { label: "Carga ultra rápida" },
        ].map((f) => (
          <div key={f.label} className="rounded-lg border border-border bg-surface p-3">
            <div className="size-6 rounded-md bg-accent/20" />
            <p className="mt-2 text-[11px] font-medium leading-snug">{f.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mockup 3: E-commerce — catálogo con buscador, carrito y productos reales. */
export function MockEcommerce() {
  const productos = [
    { nombre: "Remera oversize", icon: Shirt, precio: "$ 19.900" },
    { nombre: "Auriculares BT", icon: Headphones, precio: "$ 27.900" },
    { nombre: "Reloj digital", icon: Watch, precio: "$ 35.900" },
    { nombre: "Cámara instantánea", icon: Camera, precio: "$ 43.900" },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="shrink-0 font-mono text-xs font-semibold tracking-wide">tienda.co</span>
        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-[11px] text-muted-foreground">Buscar productos…</span>
          </div>
        </div>
        <div className="relative shrink-0">
          <ShoppingCart className="size-4 text-muted-foreground" />
          <span className="absolute -right-1.5 -top-1.5 grid size-3.5 place-items-center rounded-full bg-accent text-[8px] font-bold text-background">
            3
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4 sm:p-6">
        {productos.map(({ nombre, icon: Icon, precio }) => (
          <div key={nombre} className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex aspect-square items-center justify-center bg-surface-2">
              <Icon className="size-7 text-muted-foreground/60" strokeWidth={1.25} />
            </div>
            <div className="p-2.5">
              <p className="truncate text-[11px] font-medium">{nombre}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-accent">{precio}</span>
                <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                  +
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mockup 4: Sistemas — pantalla de login/acceso con texto real. */
export function MockSystemLogin() {
  return (
    <div className="grid min-h-[380px] place-items-center bg-background p-8 text-foreground">
      <div className="w-full max-w-xs rounded-xl border border-border bg-surface p-6">
        <div className="mx-auto grid size-10 place-items-center rounded-lg border border-accent/40 bg-background">
          <Lock className="size-4 text-accent" />
        </div>
        <p className="mt-4 text-center font-display text-sm font-semibold">Iniciar sesión</p>
        <p className="text-center text-[11px] text-muted-foreground">Accedé a tu panel</p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
            <Mail className="size-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">usuario@empresa.com</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
            <KeyRound className="size-3.5 text-muted-foreground" />
            <span className="text-[11px] tracking-widest text-muted-foreground">••••••••</span>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-accent py-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-background">
          Ingresar
        </div>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  );
}

/** Mockup 5: Dashboards — analítica pura, sin sidebar, foco en gráficos. */
export function MockAnalytics() {
  const line = [20, 35, 28, 50, 42, 65, 58, 80, 70, 90];

  return (
    <div className="bg-background p-5 text-foreground sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-display text-base font-semibold">Analítica en vivo</h4>
          <p className="text-[11px] text-muted-foreground">Últimos 30 días</p>
        </div>
        <PieChart className="size-4 text-muted-foreground" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: "Visitas", value: "48.2K" },
          { label: "Conversión", value: "3,8%" },
          { label: "Tiempo prom.", value: "4m 12s" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="mt-1 font-display text-lg font-semibold">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-border bg-surface p-3">
        <p className="text-[11px] text-muted-foreground">Tendencia de visitas</p>
        <div className="mt-3 flex h-14 items-end gap-1">
          {line.map((v, i) => (
            <div key={i} style={{ height: `${v}%` }} className="flex-1 rounded-sm bg-accent/50" />
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-surface p-3">
        <p className="text-[11px] text-muted-foreground">Ingresos por canal</p>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[45, 60, 35, 80, 55, 90, 65].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-surface-2 to-accent/70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Marco de navegador para envolver interfaces simuladas. */
export function BrowserFrame({
  url = "demo.tuproducto.app",
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[var(--shadow-elevated)] ${className}`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface-2 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
        </div>
        <div className="truncate rounded-md border border-border bg-background px-3 py-1 text-center font-mono text-[10px] text-muted-foreground">
          {url}
        </div>
        <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">demo</span>
      </div>
      {children}
    </div>
  );
}