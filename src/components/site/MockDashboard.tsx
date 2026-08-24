import { BarChart3, LayoutGrid, Settings, Users, Wallet, Activity } from "lucide-react";

const bars = [38, 62, 45, 78, 56, 92, 70, 84, 61, 96, 74, 88];

const rows = [
  { id: "#4821", client: "Cliente Alpha", plan: "Pro", estado: "Activo", monto: "$ 1.240" },
  { id: "#4822", client: "Cliente Beta", plan: "Starter", estado: "Prueba", monto: "$ 320" },
  { id: "#4823", client: "Cliente Gamma", plan: "Business", estado: "Activo", monto: "$ 3.980" },
  { id: "#4824", client: "Cliente Delta", plan: "Pro", estado: "Pendiente", monto: "$ 1.240" },
];

/** Interfaz de software simulada — puramente visual. */
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
