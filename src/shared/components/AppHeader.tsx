import { Bell, Menu, UserRound } from 'lucide-react'

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-brand-navy/10 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-brand-navy/10 p-2 text-brand-soft-text hover:bg-brand-surface lg:hidden"
          onClick={onMenuClick}
          aria-label="Abrir navegación"
          title="Abrir navegación"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <div>
          <p className="text-sm font-semibold text-brand-navy">Chalaquita Express</p>
          <p className="text-xs text-brand-muted">Gestiona pedidos de USA a Perú desde un solo lugar.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-brand-navy/10 p-2 text-brand-soft-text hover:bg-brand-surface"
          aria-label="Notificaciones"
          title="Notificaciones"
        >
          <Bell className="size-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-brand-navy/10 px-2.5 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
            <UserRound className="size-4" aria-hidden="true" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-brand-navy">Operaciones</p>
            <p className="text-xs text-brand-muted">Admin mock</p>
          </div>
        </div>
      </div>
    </header>
  )
}

