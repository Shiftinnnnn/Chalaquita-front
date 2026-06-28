import { Bell, Menu, UserRound } from 'lucide-react'

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
          onClick={onMenuClick}
          aria-label="Abrir navegación"
          title="Abrir navegación"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-950">Chalaquita Express</p>
          <p className="text-xs text-slate-500">Gestiona pedidos de USA a Perú desde un solo lugar.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
          aria-label="Notificaciones"
          title="Notificaciones"
        >
          <Bell className="size-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
            <UserRound className="size-4" aria-hidden="true" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-950">Operaciones</p>
            <p className="text-xs text-slate-500">Admin mock</p>
          </div>
        </div>
      </div>
    </header>
  )
}

