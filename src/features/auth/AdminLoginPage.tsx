import { Lock, LogIn, Mail, PackageCheck } from 'lucide-react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { BrandLogo } from '../../shared/components/BrandLogo'

export function AdminLoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/admin/dashboard')
  }

  return (
    <main className="grid min-h-screen bg-brand-navy px-4 py-10 text-white lg:grid-cols-[1fr_0.95fr] lg:px-0 lg:py-0">
      <section className="admin-login-panel hidden items-center justify-center p-12 lg:flex">
        <div className="max-w-lg">
          <BrandLogo size="lg" />
          <h1 className="mt-8 text-4xl font-semibold tracking-normal">Panel operativo para el equipo.</h1>
          <p className="mt-5 text-base leading-7 text-white/70">
            Registra cotizaciones, controla paquetes y comparte tracking con tus clientes desde una primera versión
            enfocada en operación interna.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 text-brand-navy shadow-2xl">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo size="md" />
            <span>
              <span className="block text-sm font-semibold">Chalaquita Express</span>
              <span className="block text-xs text-brand-muted">Compras en USA, entregas en Perú.</span>
            </span>
          </Link>
          <div className="mt-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
              <PackageCheck className="size-3.5" aria-hidden="true" />
              Acceso interno mock
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-normal">Panel operativo</h1>
            <p className="mt-2 text-sm text-brand-muted">Acceso exclusivo para el equipo de Chalaquita Express.</p>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="field-label">Email</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-icon" />
                <input className="field-input pl-9" type="email" defaultValue="operaciones@chalaquita.pe" />
              </div>
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-icon" />
                <input className="field-input pl-9" type="password" defaultValue="demo123" />
              </div>
            </label>
          </div>

          <button type="submit" className="primary-button mt-6 w-full">
            Ingresar
            <LogIn className="size-4" aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  )
}
