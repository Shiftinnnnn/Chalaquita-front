import { ArrowRight, PackageSearch, Search } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppData } from '../../shared/data/useAppData'

export function TrackingSearchPage() {
  const { packages } = useAppData()
  const navigate = useNavigate()
  const [code, setCode] = useState('PKG-2026-000001')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    if (normalizedCode) {
      navigate(`/tracking/${normalizedCode}`)
    }
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-sm font-semibold text-brand-red ring-1 ring-brand-red/15">
            <PackageSearch className="size-4" aria-hidden="true" />
            Tracking público
          </p>
          <h1 className="mt-5 text-3xl font-semibold tracking-normal text-brand-navy sm:text-4xl">
            Consulta el avance de tu paquete.
          </h1>
          <p className="mt-4 text-base leading-7 text-brand-soft-text">
            Ingresa el código compartido por el equipo de Chalaquita Express. No necesitas crear cuenta ni iniciar
            sesión.
          </p>
        </div>

        <section className="rounded-lg border border-brand-navy/10 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="field-label">Código de paquete</span>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-icon" />
                  <input
                    className="field-input pl-9 uppercase"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="PKG-2026-000001"
                  />
                </div>
                <button type="submit" className="primary-button">
                  Buscar
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </label>
          </form>
          <div className="mt-6 border-t border-brand-navy/10 pt-5">
            <p className="text-sm font-semibold text-brand-text">Códigos demo</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {packages.slice(0, 4).map((packageItem) => (
                <Link
                  key={packageItem.packageCode}
                  to={`/tracking/${packageItem.packageCode}`}
                  className="rounded-full bg-brand-panel px-3 py-1.5 text-xs font-semibold text-brand-text hover:bg-brand-red/15 hover:text-brand-red"
                >
                  {packageItem.packageCode}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
