import { ArrowLeft, MapPin, PackageCheck } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { Timeline } from '../../shared/components/Timeline'
import { useAppData } from '../../shared/data/useAppData'
import { getStatusLabel, maskCustomerName } from '../../shared/utils/formatters'

export function TrackingDetailPage() {
  const { code } = useParams()
  const { packages, trackingEvents } = useAppData()
  const packageCode = code?.toUpperCase() ?? ''
  const packageItem = packages.find((item) => item.packageCode === packageCode)
  const events = trackingEvents.filter((event) => event.packageCode === packageCode)

  if (!packageItem) {
    return (
      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/tracking" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a buscar
        </Link>
        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <PackageCheck className="mx-auto size-12 text-slate-300" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-semibold tracking-normal text-slate-950">Tracking no encontrado</h1>
          <p className="mt-2 text-sm text-slate-500">
            Revisa el código ingresado o solicita el link público al equipo de Chalaquita Express.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/tracking" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Consultar otro código
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">Código de paquete</p>
            <h1 className="mt-2 break-words text-3xl font-semibold tracking-normal text-slate-950">
              {packageItem.packageCode}
            </h1>
            <div className="mt-4">
              <StatusBadge status={packageItem.status} />
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Cliente</dt>
                <dd className="mt-1 text-slate-950">{maskCustomerName(packageItem.customerName)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Descripción</dt>
                <dd className="mt-1 text-slate-950">{packageItem.description}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Ubicación actual</dt>
                <dd className="mt-1 flex items-center gap-2 text-slate-950">
                  <MapPin className="size-4 text-cyan-700" aria-hidden="true" />
                  {packageItem.currentLocation}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
            <p className="text-sm font-semibold text-cyan-950">Estado actual: {getStatusLabel(packageItem.status)}</p>
            <p className="mt-2 text-sm leading-6 text-cyan-900">
              Este seguimiento se actualiza conforme el equipo de Chalaquita Express registra nuevos avances.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold tracking-normal text-slate-950">Timeline de avances</h2>
          <div className="mt-5">
            <Timeline events={events} />
          </div>
        </div>
      </section>
    </main>
  )
}
