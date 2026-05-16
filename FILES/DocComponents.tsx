import { cn } from '@/lib/utils'

// ─── MDX Prose wrapper ────────────────────────────────────────────────────────
export function DocContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-prose">
      {children}
    </div>
  )
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export function DocBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 mb-8 font-mono text-xs text-[hsl(var(--text-muted))]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span className={i === items.length - 1 ? 'text-[hsl(var(--text-secondary))]' : ''}>
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  )
}

// ─── Doc header ───────────────────────────────────────────────────────────────
export function DocHeader({
  title,
  description,
  badge,
}: {
  title: string
  description?: string
  badge?: string
}) {
  return (
    <header className="mb-10 pb-8 border-b border-[hsl(var(--border))]">
      {badge && (
        <span className="inline-block font-mono text-[10px] text-[hsl(var(--neon-cyan))]
                         bg-[hsl(var(--neon-cyan)/0.08)] border border-[hsl(var(--neon-cyan)/0.2)]
                         px-2.5 py-1 rounded-full uppercase tracking-widest mb-4">
          {badge}
        </span>
      )}
      <h1 className="font-display text-3xl font-700 text-[hsl(var(--text-primary))] mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-[hsl(var(--text-secondary))] leading-relaxed text-base">
          {description}
        </p>
      )}
    </header>
  )
}

// ─── Empty placeholder ────────────────────────────────────────────────────────
export function DocTodo({ page }: { page: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-[hsl(var(--border))]
                      flex items-center justify-center text-xl">
        📝
      </div>
      <div>
        <p className="font-display text-base text-[hsl(var(--text-primary))] mb-1">
          Content coming soon
        </p>
        <p className="font-mono text-xs text-[hsl(var(--text-muted))]">
          TODO: {page}
        </p>
      </div>
    </div>
  )
}

// ─── Callout component (for use in MDX) ──────────────────────────────────────
export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'danger' | 'tip'
  children: React.ReactNode
}) {
  const styles = {
    info: 'border-[hsl(var(--neon-blue)/0.3)] bg-[hsl(var(--neon-blue)/0.05)] text-[hsl(var(--neon-blue))]',
    warning: 'border-amber-400/30 bg-amber-400/05 text-amber-400',
    danger: 'border-red-400/30 bg-red-400/05 text-red-400',
    tip: 'border-[hsl(var(--neon-cyan)/0.3)] bg-[hsl(var(--neon-cyan)/0.05)] text-[hsl(var(--neon-cyan))]',
  }

  const labels = {
    info: 'Info',
    warning: 'Warning',
    danger: 'Danger',
    tip: 'Tip',
  }

  return (
    <div className={cn('my-6 rounded-xl border p-4', styles[type])}>
      <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-70">
        {labels[type]}
      </div>
      <div className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
        {children}
      </div>
    </div>
  )
}
