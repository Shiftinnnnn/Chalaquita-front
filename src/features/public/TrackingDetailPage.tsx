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
        <Link to="/tracking" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a buscar
        </Link>
        <section className="mt-6 rounded-lg border border-brand-navy/10 bg-white p-8 text-center shadow-sm">
          <PackageCheck className="mx-auto size-12 text-white/70" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-semibold tracking-normal text-brand-navy">Tracking no encontrado</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Revisa el código ingresado o solicita el link público al equipo de Chalaquita Express.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/tracking" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Consultar otro código
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-brand-navy/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-normal text-brand-red">Código de paquete</p>
            <h1 className="mt-2 break-words text-3xl font-semibold tracking-normal text-brand-navy">
              {packageItem.packageCode}
            </h1>
            <div className="mt-4">
              <StatusBadge status={packageItem.status} />
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-brand-muted">Cliente</dt>
                <dd className="mt-1 text-brand-navy">{maskCustomerName(packageItem.customerName)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-muted">Descripción</dt>
                <dd className="mt-1 text-brand-navy">{packageItem.description}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-muted">Ubicación actual</dt>
                <dd className="mt-1 flex items-center gap-2 text-brand-navy">
                  <MapPin className="size-4 text-brand-red" aria-hidden="true" />
                  {packageItem.currentLocation}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-brand-red/15 bg-brand-red/10 p-5">
            <p className="text-sm font-semibold text-brand-navy">Estado actual: {getStatusLabel(packageItem.status)}</p>
            <p className="mt-2 text-sm leading-6 text-brand-text">
              Este seguimiento se actualiza conforme el equipo de Chalaquita Express registra nuevos avances.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-brand-navy/10 bg-brand-surface p-5">
          <h2 className="text-lg font-semibold tracking-normal text-brand-navy">Timeline de avances</h2>
          <div className="mt-5">
            <Timeline events={events} />
          </div>
        </div>
      </section>
    </main>
  )
}
