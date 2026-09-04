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
  Package,
  ClipboardList,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

/** Mockup 1: SaaS — Cloud Esther, sistema de gestión para clínicas odontológicas. */
export function MockDashboard() {
  const agenda = [
    { hora: "09:00", paciente: "Sofía Martínez", tratamiento: "Control ortodoncia" },
    { hora: "09:30", paciente: "Diego Fernández", tratamiento: "Extracción" },
    { hora: "10:15", paciente: "Martina Ruiz", tratamiento: "Limpieza dental" },
    { hora: "11:00", paciente: "Carlos Gómez", tratamiento: "Endodoncia" },
  ];

  const pacientes = [
    { id: "#2210", nombre: "Sofía Martínez", estado: "En trat.", monto: "$ 45.000" },
    { id: "#2211", nombre: "Diego Fernández", estado: "Alta", monto: "$ 18.500" },
    { id: "#2212", nombre: "Martina Ruiz", estado: "Al día", monto: "$ 6.200" },
    { id: "#2213", nombre: "Carlos Gómez", estado: "Pend.", monto: "$ 32.000" },
  ];

  return (
    <div className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] overflow-hidden bg-background text-foreground">
      <aside className="hidden w-40 flex-col gap-1 border-r border-border bg-surface p-3 sm:flex">
        <p className="truncate px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
              "flex min-w-0 items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors " +
              (active ? "bg-surface-2 text-foreground" : "text-muted-foreground")
            }
          >
            <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </aside>

      <div className="min-w-0 overflow-hidden p-3 sm:p-5">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 pb-3">
          <div className="min-w-0">
            <h4 className="truncate font-display text-sm font-semibold sm:text-base">
              Turnos de hoy
            </h4>
            <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
              Agenda en tiempo real
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-1 text-[9px] text-muted-foreground sm:text-[10px]">
            <span className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent" /> en línea
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-3 gap-1.5 sm:gap-2.5">
          {[
            { label: "Turnos hoy", value: "18" },
            { label: "Pacientes", value: "342" },
            { label: "Facturación", value: "$1,24M" },
          ].map((k) => (
            <div key={k.label} className="min-w-0 rounded-lg border border-border bg-surface p-2 sm:p-3">
              <p className="truncate text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                {k.label}
              </p>
              <p className="truncate font-display text-sm font-semibold sm:text-lg">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 min-w-0 rounded-lg border border-border bg-surface p-2.5 sm:mt-3 sm:p-3">
          <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">Agenda</p>
          <div className="mt-1.5 divide-y divide-border/60 sm:mt-2">
            {agenda.map((a) => (
              <div key={a.hora} className="flex min-w-0 items-center gap-2 py-1.5 text-[10px] sm:gap-3 sm:py-2 sm:text-[11px]">
                <span className="shrink-0 font-mono text-accent">{a.hora}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{a.paciente}</span>
                <span className="hidden shrink-0 truncate text-muted-foreground md:block md:max-w-[8rem]">
                  {a.tratamiento}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 min-w-0 overflow-hidden rounded-lg border border-border bg-surface sm:mt-3">
          <table className="w-full table-fixed text-left text-[10px] sm:text-[11px]">
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[38%]" />
              <col className="w-[22%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">ID</th>
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">Paciente</th>
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">Estado</th>
                <th className="truncate px-2 py-1.5 text-right font-normal sm:px-3 sm:py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0">
                  <td className="truncate px-2 py-1.5 font-mono text-muted-foreground sm:px-3 sm:py-2">
                    {p.id}
                  </td>
                  <td className="truncate px-2 py-1.5 sm:px-3 sm:py-2">{p.nombre}</td>
                  <td className="truncate px-2 py-1.5 sm:px-3 sm:py-2">
                    <span className="inline-block truncate rounded-full border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                      {p.estado}
                    </span>
                  </td>
                  <td className="truncate px-2 py-1.5 text-right font-mono sm:px-3 sm:py-2">
                    {p.monto}
                  </td>
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
    <div className="min-w-0 overflow-hidden bg-background text-foreground">
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full bg-accent" />
          <span className="truncate font-mono text-xs font-semibold tracking-wide">marca.co</span>
        </div>
        <div className="hidden gap-4 md:flex">
          {["Inicio", "Servicios", "Nosotros", "Contacto"].map((l) => (
            <span
              key={l}
              className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {l}
            </span>
          ))}
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-md border border-accent/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
          Contacto
        </span>
      </div>

      <div className="grid min-w-0 gap-6 p-6 sm:grid-cols-2 sm:items-center sm:p-8">
        <div className="min-w-0">
          <span className="inline-block whitespace-nowrap rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
            Sitio institucional
          </span>
          <h4 className="mt-4 font-display text-lg font-bold leading-snug sm:text-xl">
            Creamos experiencias web que convierten visitas en clientes.
          </h4>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Diseño a medida, carga ultra rápida y contenido pensado para que tus
            clientes te encuentren y te elijan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="whitespace-nowrap rounded-lg bg-accent px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-background">
              Empezar
            </span>
            <span className="whitespace-nowrap rounded-lg border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Ver más
            </span>
          </div>
        </div>
        <div className="flex aspect-video min-w-0 items-center justify-center rounded-xl border border-border bg-surface">
          <Camera className="size-8 text-muted-foreground/50" strokeWidth={1.25} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-6 pb-6 sm:gap-3 sm:px-8">
        {[
          { label: "Diseño a medida" },
          { label: "SEO optimizado" },
          { label: "Carga rápida" },
        ].map((f) => (
          <div key={f.label} className="min-w-0 rounded-lg border border-border bg-surface p-2.5 sm:p-3">
            <div className="size-6 rounded-md bg-accent/20" />
            <p className="mt-2 truncate text-[10px] font-medium leading-snug sm:text-[11px]">
              {f.label}
            </p>
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
    <div className="min-w-0 overflow-hidden bg-background text-foreground">
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border px-3 py-3 sm:gap-3 sm:px-5">
        <span className="shrink-0 truncate font-mono text-xs font-semibold tracking-wide">
          tienda.co
        </span>
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="flex w-full min-w-0 max-w-xs items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
              Buscar productos…
            </span>
          </div>
        </div>
        <div className="relative shrink-0">
          <ShoppingCart className="size-4 text-muted-foreground" />
          <span className="absolute -right-1.5 -top-1.5 grid size-3.5 place-items-center rounded-full bg-accent text-[8px] font-bold text-background">
            3
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-3 sm:p-5">
        {productos.map(({ nombre, icon: Icon, precio }) => (
          <div key={nombre} className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex aspect-square items-center justify-center bg-surface-2">
              <Icon className="size-6 text-muted-foreground/60 sm:size-7" strokeWidth={1.25} />
            </div>
            <div className="min-w-0 p-2 sm:p-2.5">
              <p className="truncate text-[10px] font-medium sm:text-[11px]">{nombre}</p>
              <div className="mt-1.5 flex min-w-0 items-center justify-between gap-1">
                <span className="truncate font-mono text-[10px] font-semibold text-accent sm:text-[11px]">
                  {precio}
                </span>
                <span className="shrink-0 rounded-md border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
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

/** Mockup 4: Sistemas (genérico) — pantalla de login/acceso con texto real. */
export function MockSystemLogin() {
  return (
    <div className="grid min-h-[380px] min-w-0 place-items-center overflow-hidden bg-background p-6 text-foreground sm:p-8">
      <div className="w-full max-w-xs min-w-0 rounded-xl border border-border bg-surface p-5 sm:p-6">
        <div className="mx-auto grid size-10 place-items-center rounded-lg border border-accent/40 bg-background">
          <Lock className="size-4 text-accent" />
        </div>
        <p className="mt-4 text-center font-display text-sm font-semibold">Iniciar sesión</p>
        <p className="text-center text-[11px] text-muted-foreground">Accedé a tu panel</p>

        <div className="mt-5 space-y-3">
          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
            <Mail className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-[11px] text-muted-foreground">usuario@empresa.com</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
            <KeyRound className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-[11px] tracking-widest text-muted-foreground">
              ••••••••
            </span>
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

/** Mockup 4b: Sistemas — Panel operativo interno (inventario, órdenes, permisos, reportes). */
export function MockOperationalPanel() {
  const ordenes = [
    { id: "#OP-118", cliente: "Depósito Norte", estado: "En camino" },
    { id: "#OP-119", cliente: "Sucursal Centro", estado: "Preparando" },
    { id: "#OP-120", cliente: "Depósito Sur", estado: "Entregado" },
    { id: "#OP-121", cliente: "Sucursal Oeste", estado: "Pendiente" },
  ];

  const inventario = [
    { producto: "Bobina de acero", sku: "BA-204", stock: "12", estado: "Bajo" },
    { producto: "Tornillos M6", sku: "TM-006", stock: "980", estado: "OK" },
    { producto: "Panel eléctrico", sku: "PE-330", stock: "4", estado: "Crítico" },
    { producto: "Cable 2x1.5", sku: "CB-215", stock: "540", estado: "OK" },
  ];

  return (
    <div className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] overflow-hidden bg-background text-foreground">
      <aside className="hidden w-40 flex-col gap-1 border-r border-border bg-surface p-3 sm:flex">
        <p className="truncate px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Panel operativo
        </p>
        {[
          { icon: Package, label: "Inventario", active: true },
          { icon: ClipboardList, label: "Órdenes" },
          { icon: ShieldCheck, label: "Permisos" },
          { icon: BarChart3, label: "Reportes" },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={
              "flex min-w-0 items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors " +
              (active ? "bg-surface-2 text-foreground" : "text-muted-foreground")
            }
          >
            <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </aside>

      <div className="min-w-0 overflow-hidden p-3 sm:p-5">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 pb-3">
          <div className="min-w-0">
            <h4 className="truncate font-display text-sm font-semibold sm:text-base">
              Inventario y órdenes
            </h4>
            <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
              Control en tiempo real
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-1 text-[9px] text-muted-foreground sm:text-[10px]">
            <span className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent" /> en línea
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-3 gap-1.5 sm:gap-2.5">
          {[
            { label: "Órdenes hoy", value: "32" },
            { label: "Stock bajo", value: "7" },
            { label: "Usuarios act.", value: "12" },
          ].map((k) => (
            <div key={k.label} className="min-w-0 rounded-lg border border-border bg-surface p-2 sm:p-3">
              <p className="truncate text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                {k.label}
              </p>
              <p className="truncate font-display text-sm font-semibold sm:text-lg">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 min-w-0 rounded-lg border border-border bg-surface p-2.5 sm:mt-3 sm:p-3">
          <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
            Órdenes recientes
          </p>
          <div className="mt-1.5 divide-y divide-border/60 sm:mt-2">
            {ordenes.map((o) => (
              <div
                key={o.id}
                className="flex min-w-0 items-center gap-2 py-1.5 text-[10px] sm:gap-3 sm:py-2 sm:text-[11px]"
              >
                <span className="shrink-0 font-mono text-accent">{o.id}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{o.cliente}</span>
                <span className="shrink-0 truncate rounded-full border border-border px-2 py-0.5 text-[9px] text-muted-foreground">
                  {o.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 min-w-0 overflow-hidden rounded-lg border border-border bg-surface sm:mt-3">
          <table className="w-full table-fixed text-left text-[10px] sm:text-[11px]">
            <colgroup>
              <col className="w-[36%]" />
              <col className="w-[22%]" />
              <col className="w-[20%]" />
              <col className="w-[22%]" />
            </colgroup>
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">Producto</th>
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">SKU</th>
                <th className="truncate px-2 py-1.5 text-right font-normal sm:px-3 sm:py-2">Stock</th>
                <th className="truncate px-2 py-1.5 font-normal sm:px-3 sm:py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((i) => (
                <tr key={i.sku} className="border-b border-border/60 last:border-0">
                  <td className="truncate px-2 py-1.5 sm:px-3 sm:py-2">{i.producto}</td>
                  <td className="truncate px-2 py-1.5 font-mono text-muted-foreground sm:px-3 sm:py-2">
                    {i.sku}
                  </td>
                  <td className="truncate px-2 py-1.5 text-right font-mono sm:px-3 sm:py-2">
                    {i.stock}
                  </td>
                  <td className="truncate px-2 py-1.5 sm:px-3 sm:py-2">
                    <span className="inline-block truncate rounded-full border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                      {i.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Mockup 5: Dashboards — analítica pura, sin sidebar, foco en gráficos. */
export function MockAnalytics() {
  const line = [20, 35, 28, 50, 42, 65, 58, 80, 70, 90];

  return (
    <div className="min-w-0 overflow-hidden bg-background p-4 text-foreground sm:p-6">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <h4 className="truncate font-display text-sm font-semibold sm:text-base">
            Analítica en vivo
          </h4>
          <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
            Últimos 30 días
          </p>
        </div>
        <PieChart className="size-4 shrink-0 text-muted-foreground" />
      </div>

      <div className="mt-3 grid min-w-0 grid-cols-3 gap-2 sm:mt-4 sm:gap-2.5">
        {[
          { label: "Visitas", value: "48.2K" },
          { label: "Conversión", value: "3,8%" },
          { label: "T. prom.", value: "4m 12s" },
        ].map((k) => (
          <div key={k.label} className="min-w-0 rounded-lg border border-border bg-surface p-2 sm:p-3">
            <p className="truncate text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">
              {k.label}
            </p>
            <p className="truncate font-display text-sm font-semibold sm:text-lg">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-2.5 min-w-0 rounded-lg border border-border bg-surface p-2.5 sm:mt-3 sm:p-3">
        <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">Tendencia</p>
        <div className="mt-2 flex h-12 items-end gap-1 sm:mt-3 sm:h-14">
          {line.map((v, i) => (
            <div key={i} style={{ height: `${v}%` }} className="flex-1 rounded-sm bg-accent/50" />
          ))}
        </div>
      </div>

      <div className="mt-2.5 min-w-0 rounded-lg border border-border bg-surface p-2.5 sm:mt-3 sm:p-3">
        <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">Ingresos</p>
        <div className="mt-2 flex h-14 items-end gap-1 sm:mt-3 sm:h-16 sm:gap-1.5">
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