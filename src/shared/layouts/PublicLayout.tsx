import { PackageCheck, ShieldCheck } from 'lucide-react'
import { Link, Outlet } from 'react-router'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-cyan-300">
              CE
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-950">Chalaquita Express</span>
              <span className="block text-xs text-slate-500">Compras en USA, entregas en Perú.</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <PackageCheck className="size-4" aria-hidden="true" />
              Tracking
            </Link>
            <Link
              to="/admin/login"
              className="hidden items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:inline-flex"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Chalaquita Express. Primera versión: panel operativo interno + tracking público.</p>
          <p>Maqueta frontend con datos mock.</p>
        </div>
      </footer>
    </div>
  )
}

