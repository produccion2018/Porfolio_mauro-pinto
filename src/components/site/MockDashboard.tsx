import {
  BarChart3,
  LayoutGrid,
  Settings,
  Users,
  Wallet,
  Activity,
  Search,
  ShoppingCart,
  Lock,
  User,
  KeyRound,
  PieChart,
} from "lucide-react";

const bars = [38, 62, 45, 78, 56, 92, 70, 84, 61, 96, 74, 88];

const rows = [
  { id: "#4821", client: "Cliente Alpha", plan: "Pro", estado: "Activo", monto: "$ 1.240" },
  { id: "#4822", client: "Cliente Beta", plan: "Starter", estado: "Prueba", monto: "$ 320" },
  { id: "#4823", client: "Cliente Gamma", plan: "Business", estado: "Activo", monto: "$ 3.980" },
  { id: "#4824", client: "Cliente Delta", plan: "Pro", estado: "Pendiente", monto: "$ 1.240" },
];

/** Mockup 1: SaaS — panel interno con sidebar, KPIs, gráfico y tabla. */
export function MockDashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] bg-background text-foreground">
      <aside className="hidden w-44 flex-col gap-1 border-r border-border bg-surface p-3 sm:flex">
        <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Producto
        </p>
        {[
          { icon: LayoutGrid, label: "Resumen", active: true },
          { icon: Users, label: "Clientes" },
          { icon: Wallet, label: "Facturación" },
          { icon: BarChart3, label: "Reportes" },
          { icon: Settings, label: "Ajustes" },
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
            <h4 className="truncate font-display text-base font-semibold">Panel general</h4>
            <p className="truncate text-[11px] text-muted-foreground">
              Datos de demostración en vivo
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" /> en línea
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {[
            { label: "MRR", value: "$ 24.860", delta: "+12,4%" },
            { label: "Usuarios activos", value: "1.842", delta: "+3,1%" },
            { label: "Retención", value: "94,2%", delta: "+0,8%" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg border border-border bg-surface p-3">
              <p className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-1 font-display text-lg font-semibold">{k.value}</p>
              <p className="text-[10px] text-accent">{k.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-border bg-surface p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">Ingresos por mes</p>
            <Activity className="size-3.5 text-muted-foreground" />
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {bars.map((b, i) => (
              <div
                key={i}
                style={{ height: `${b}%`, animationDelay: `${i * 120}ms` }}
                className="flex-1 animate-float-slow rounded-sm bg-gradient-to-t from-surface-2 to-accent/70"
              />
            ))}
          </div>
        </div>

        {!compact && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-[11px]">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-3 py-2 font-normal">ID</th>
                  <th className="px-3 py-2 font-normal">Cliente</th>
                  <th className="hidden px-3 py-2 font-normal sm:table-cell">Plan</th>
                  <th className="px-3 py-2 font-normal">Estado</th>
                  <th className="px-3 py-2 text-right font-normal">Monto</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-2 font-mono text-muted-foreground">{r.id}</td>
                    <td className="max-w-[10rem] truncate px-3 py-2">{r.client}</td>
                    <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">
                      {r.plan}
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                        {r.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{r.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/** Mockup 2: Web — sitio institucional con navbar, hero y features. */
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
          <div className="h-2.5 w-24 rounded-full bg-accent/60" />
          <div className="mt-4 h-5 w-full rounded bg-surface-2" />
          <div className="mt-2 h-5 w-4/5 rounded bg-surface-2" />
          <div className="mt-2 h-5 w-3/5 rounded bg-surface-2" />
          <div className="mt-5 h-3 w-full rounded-full bg-border" />
          <div className="mt-2 h-3 w-5/6 rounded-full bg-border" />
          <div className="mt-6 flex gap-3">
            <span className="rounded-lg bg-accent px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-background">
              Empezar
            </span>
            <span className="rounded-lg border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Ver más
            </span>
          </div>
        </div>
        <div className="aspect-video rounded-xl border border-border bg-surface" />
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 pb-6 sm:px-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-surface p-3">
            <div className="size-6 rounded-md bg-accent/30" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-surface-2" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mockup 3: E-commerce — catálogo con buscador, carrito y grilla de productos. */
export function MockEcommerce() {
  return (
    <div className="bg-background text-foreground">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="shrink-0 font-mono text-xs font-semibold tracking-wide">tienda.co</span>
        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <div className="h-2 w-full rounded-full bg-surface-2" />
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
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="aspect-square bg-surface-2" />
            <div className="p-2.5">
              <div className="h-2 w-4/5 rounded-full bg-surface-2" />
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-accent">
                  $ {19 + i * 8}.900
                </span>
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

/** Mockup 4: Sistemas — pantalla de login/acceso. */
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
            <User className="size-3.5 text-muted-foreground" />
            <div className="h-2 w-2/3 rounded-full bg-surface-2" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
            <KeyRound className="size-3.5 text-muted-foreground" />
            <div className="h-2 w-1/2 rounded-full bg-surface-2" />
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
        <p className="text-[11px] text-muted-foreground">Tendencia</p>
        <div className="mt-3 flex h-14 items-end gap-1">
          {line.map((v, i) => (
            <div
              key={i}
              style={{ height: `${v}%` }}
              className="flex-1 rounded-sm bg-accent/50"
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex h-16 items-end gap-1.5 rounded-lg border border-border bg-surface p-3">
        {[45, 60, 35, 80, 55, 90, 65].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-gradient-to-t from-surface-2 to-accent/70"
          />
        ))}
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