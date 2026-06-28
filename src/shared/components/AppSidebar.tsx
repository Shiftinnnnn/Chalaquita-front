import {
  BarChart3,
  Boxes,
  Calculator,
  Home,
  LayoutDashboard,
  PackageSearch,
  Route,
  UsersRound,
  X,
} from 'lucide-react'
import { Link, NavLink } from 'react-router'

type AppSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', href: '/admin/customers', icon: UsersRound },
  { label: 'Cotizaciones', href: '/admin/quotations', icon: Calculator },
  { label: 'Pedidos', href: '/admin/orders', icon: Boxes },
  { label: 'Paquetes', href: '/admin/packages', icon: PackageSearch },
  { label: 'Tracking', href: '/admin/tracking', icon: Route },
]

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-slate-950 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex size-10 items-center justify-center rounded-lg bg-cyan-500 text-sm font-bold text-slate-950">
              CE
            </span>
            <span>
              <span className="block text-sm font-semibold">Chalaquita Express</span>
              <span className="block text-xs text-cyan-200">Panel operativo</span>
            </span>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onClose}
            aria-label="Cerrar navegación"
            title="Cerrar navegación"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Home className="size-4" aria-hidden="true" />
            Página pública
          </Link>
          <div className="mt-4 rounded-lg bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200">
              <BarChart3 className="size-4" aria-hidden="true" />
              Primera versión
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">Panel interno + tracking público para clientes.</p>
          </div>
        </div>
      </aside>
    </>
  )
}

