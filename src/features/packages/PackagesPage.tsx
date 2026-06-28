import { ClipboardCopy, PackagePlus, Plus, QrCode, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { DataTable, type DataTableColumn } from '../../shared/components/DataTable'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { useAppData } from '../../shared/data/useAppData'
import type { Package } from '../../shared/types'
import { formatDate, getTrackingUrl } from '../../shared/utils/formatters'

const emptyPackageForm = {
  orderCode: 'ORD-2026-000001',
  weight: '1',
  dimensions: '',
  description: '',
  currentLocation: 'Lima, Perú',
}

export function PackagesPage() {
  const { orders, packages, addPackage } = useAppData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [copyMessage, setCopyMessage] = useState('')
  const [form, setForm] = useState(emptyPackageForm)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const order = orders.find((item) => item.orderCode === form.orderCode)
    addPackage({
      orderCode: form.orderCode,
      customerName: order?.customerName ?? 'Cliente demo',
      weight: Number(form.weight),
      dimensions: form.dimensions,
      description: form.description,
      currentLocation: form.currentLocation,
    })
    setForm(emptyPackageForm)
    setIsFormOpen(false)
  }

  const handleCopy = async (packageCode: string) => {
    const trackingUrl = getTrackingUrl(packageCode)
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(trackingUrl)
      setCopyMessage(`Link copiado: ${packageCode}`)
    } else {
      setCopyMessage(`Link listo: ${trackingUrl}`)
    }
  }

  const columns: DataTableColumn<Package>[] = [
    {
      header: 'Paquete',
      cell: (packageItem) => <span className="font-semibold text-brand-navy">{packageItem.packageCode}</span>,
    },
    { header: 'Pedido', cell: (packageItem) => packageItem.orderCode },
    { header: 'Cliente', cell: (packageItem) => packageItem.customerName },
    { header: 'Peso', cell: (packageItem) => `${packageItem.weight} kg` },
    { header: 'Dimensiones', cell: (packageItem) => packageItem.dimensions },
    { header: 'Estado', cell: (packageItem) => <StatusBadge status={packageItem.status} /> },
    { header: 'Ubicación', cell: (packageItem) => packageItem.currentLocation },
    { header: 'Fecha', cell: (packageItem) => formatDate(packageItem.createdAt) },
    {
      header: 'Acciones',
      cell: (packageItem) => (
        <div className="flex min-w-56 flex-wrap gap-2">
          <button
            type="button"
            className="secondary-button px-3 py-1.5 text-xs"
            onClick={() => setSelectedPackage(packageItem)}
          >
            <QrCode className="size-3.5" aria-hidden="true" />
            Ver QR
          </button>
          <button
            type="button"
            className="secondary-button px-3 py-1.5 text-xs"
            onClick={() => void handleCopy(packageItem.packageCode)}
          >
            <ClipboardCopy className="size-3.5" aria-hidden="true" />
            Copiar link
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageTitle
        eyebrow="Paquetes"
        title="Control de paquetes"
        description="Registra paquetes, consulta su estado y comparte links públicos de tracking con QR mock."
        action={
          <button type="button" className="primary-button" onClick={() => setIsFormOpen(true)}>
            <Plus className="size-4" aria-hidden="true" />
            Registrar paquete
          </button>
        }
      />

      {copyMessage ? (
        <div className="rounded-lg border border-brand-navy/15 bg-brand-navy/10 p-3 text-sm font-medium text-brand-navy">
          {copyMessage}
        </div>
      ) : null}

      {isFormOpen ? (
        <section className="rounded-lg border border-brand-navy/10 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="field-label">Pedido</span>
              <select
                className="field-input mt-2"
                value={form.orderCode}
                onChange={(event) => setForm((current) => ({ ...current, orderCode: event.target.value }))}
              >
                {orders.map((order) => (
                  <option key={order.id} value={order.orderCode}>
                    {order.orderCode} - {order.customerName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Peso</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                step="0.1"
                value={form.weight}
                onChange={(event) => setForm((current) => ({ ...current, weight: event.target.value }))}
              />
            </label>
            <label className="block">
              <span className="field-label">Dimensiones</span>
              <input
                className="field-input mt-2"
                value={form.dimensions}
                onChange={(event) => setForm((current) => ({ ...current, dimensions: event.target.value }))}
                placeholder="30 x 20 x 12 cm"
                required
              />
            </label>
            <label className="block">
              <span className="field-label">Ubicación actual</span>
              <input
                className="field-input mt-2"
                value={form.currentLocation}
                onChange={(event) => setForm((current) => ({ ...current, currentLocation: event.target.value }))}
                required
              />
            </label>
            <label className="block md:col-span-2 lg:col-span-4">
              <span className="field-label">Descripción</span>
              <input
                className="field-input mt-2"
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder="Producto o descripción general"
                required
              />
            </label>
            <div className="flex gap-3 md:col-span-2 lg:col-span-4">
              <button type="submit" className="primary-button">
                <PackagePlus className="size-4" aria-hidden="true" />
                Guardar paquete
              </button>
              <button type="button" className="secondary-button" onClick={() => setIsFormOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <DataTable data={packages} columns={columns} getRowKey={(packageItem) => packageItem.id} />

      {selectedPackage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/50 p-4">
          <section className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
            <div className="flex items-start justify-between gap-4 text-left">
              <div>
                <p className="text-sm font-semibold text-brand-red">QR de tracking</p>
                <h2 className="mt-1 text-xl font-semibold tracking-normal text-brand-navy">
                  {selectedPackage.packageCode}
                </h2>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-brand-muted hover:bg-brand-panel"
                onClick={() => setSelectedPackage(null)}
                aria-label="Cerrar QR"
                title="Cerrar"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 inline-flex rounded-lg border border-brand-navy/10 bg-white p-4">
              <QRCodeSVG value={getTrackingUrl(selectedPackage.packageCode)} size={180} />
            </div>
            <p className="mt-4 break-all rounded-lg bg-brand-surface p-3 text-sm text-brand-soft-text">
              {getTrackingUrl(selectedPackage.packageCode)}
            </p>
            <button
              type="button"
              className="primary-button mt-4 w-full"
              onClick={() => void handleCopy(selectedPackage.packageCode)}
            >
              <ClipboardCopy className="size-4" aria-hidden="true" />
              Copiar link
            </button>
          </section>
        </div>
      ) : null}
    </>
  )
}
