import { MapPin, Plus, Search, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { Timeline } from '../../shared/components/Timeline'
import { useAppData } from '../../shared/data/useAppData'
import type { PackageStatus } from '../../shared/types'
import { getTrackingUrl, packageStatusLabels } from '../../shared/utils/formatters'

const packageStatuses = Object.keys(packageStatusLabels) as PackageStatus[]

const emptyEventForm = {
  status: 'IN_TRANSIT' as PackageStatus,
  title: '',
  description: '',
  location: '',
}

export function TrackingManagementPage() {
  const { packages, trackingEvents, addTrackingEvent } = useAppData()
  const [searchTerm, setSearchTerm] = useState('PKG-2026-000001')
  const [selectedPackageCode, setSelectedPackageCode] = useState('PKG-2026-000001')
  const [form, setForm] = useState(emptyEventForm)

  const filteredPackages = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()
    if (!normalizedTerm) return packages
    return packages.filter((packageItem) => packageItem.packageCode.toLowerCase().includes(normalizedTerm))
  }, [packages, searchTerm])

  const selectedPackage =
    packages.find((packageItem) => packageItem.packageCode === selectedPackageCode) ?? filteredPackages[0]

  const selectedEvents = selectedPackage
    ? trackingEvents.filter((event) => event.packageCode === selectedPackage.packageCode)
    : []

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedPackage) return
    addTrackingEvent({
      packageCode: selectedPackage.packageCode,
      status: form.status,
      title: form.title,
      description: form.description,
      location: form.location,
    })
    setForm({ ...emptyEventForm, location: form.location })
  }

  return (
    <>
      <PageTitle
        eyebrow="Tracking"
        title="Gestión de tracking"
        description="Registra avances operativos y actualiza la línea de tiempo que verá el cliente en el tracking público."
      />

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <label className="block">
              <span className="field-label">Buscar paquete</span>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="field-input pl-9"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="PKG-2026-000001"
                />
              </div>
            </label>
          </div>

          <div className="space-y-2">
            {filteredPackages.map((packageItem) => (
              <button
                key={packageItem.id}
                type="button"
                className={`w-full rounded-lg border p-4 text-left shadow-sm transition ${
                  selectedPackage?.packageCode === packageItem.packageCode
                    ? 'border-cyan-300 bg-cyan-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                onClick={() => {
                  setSelectedPackageCode(packageItem.packageCode)
                  setSearchTerm(packageItem.packageCode)
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{packageItem.packageCode}</p>
                    <p className="mt-1 text-sm text-slate-500">{packageItem.customerName}</p>
                  </div>
                  <StatusBadge status={packageItem.status} />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {packageItem.currentLocation}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-5">
          {selectedPackage ? (
            <>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-cyan-700">{selectedPackage.packageCode}</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-950">
                      {selectedPackage.description}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Cliente: {selectedPackage.customerName} · Pedido: {selectedPackage.orderCode}
                    </p>
                    <p className="mt-2 break-all text-xs text-slate-500">{getTrackingUrl(selectedPackage.packageCode)}</p>
                  </div>
                  <StatusBadge status={selectedPackage.status} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Send className="size-5 text-cyan-700" aria-hidden="true" />
                  <h3 className="text-lg font-semibold tracking-normal text-slate-950">Registrar avance</h3>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="field-label">Estado</span>
                    <select
                      className="field-input mt-2"
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as PackageStatus }))
                      }
                    >
                      {packageStatuses.map((status) => (
                        <option key={status} value={status}>
                          {packageStatusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="field-label">Ubicación</span>
                    <input
                      className="field-input mt-2"
                      value={form.location}
                      onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                      placeholder="Almacén USA"
                      required
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="field-label">Título</span>
                    <input
                      className="field-input mt-2"
                      value={form.title}
                      onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                      placeholder="En tránsito a Perú"
                      required
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="field-label">Descripción</span>
                    <textarea
                      className="field-input mt-2 min-h-24 resize-y"
                      value={form.description}
                      onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                      placeholder="Describe el avance que verá el cliente."
                      required
                    />
                  </label>
                </div>
                <button type="submit" className="primary-button mt-5">
                  <Plus className="size-4" aria-hidden="true" />
                  Registrar avance
                </button>
              </form>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold tracking-normal text-slate-950">Timeline de eventos</h3>
                <div className="mt-5">
                  <Timeline events={selectedEvents} />
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              Selecciona un paquete para gestionar su tracking.
            </div>
          )}
        </section>
      </section>
    </>
  )
}
