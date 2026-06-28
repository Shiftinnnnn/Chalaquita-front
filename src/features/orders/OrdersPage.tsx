import { Eye, PackagePlus, Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { DataTable, type DataTableColumn } from '../../shared/components/DataTable'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { useAppData } from '../../shared/data/useAppData'
import type { Order } from '../../shared/types'
import { formatDate, formatUsd } from '../../shared/utils/formatters'

const emptyOrderForm = {
  customerName: 'Juan Pérez',
  productName: '',
  totalUsd: '0',
}

export function OrdersPage() {
  const { customers, orders, packages, addOrder } = useAppData()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(emptyOrderForm)

  const relatedPackages = useMemo(
    () => packages.filter((packageItem) => packageItem.orderCode === selectedOrder?.orderCode),
    [packages, selectedOrder],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addOrder({
      customerName: form.customerName,
      productName: form.productName,
      totalUsd: Number(form.totalUsd),
    })
    setForm(emptyOrderForm)
    setIsFormOpen(false)
  }

  const columns: DataTableColumn<Order>[] = [
    { header: 'Código', cell: (order) => <span className="font-semibold text-brand-navy">{order.orderCode}</span> },
    { header: 'Cliente', cell: (order) => order.customerName },
    { header: 'Producto', cell: (order) => order.productName },
    { header: 'Monto', cell: (order) => formatUsd(order.totalUsd) },
    { header: 'Estado', cell: (order) => <StatusBadge status={order.status} /> },
    { header: 'Fecha', cell: (order) => formatDate(order.createdAt) },
    {
      header: 'Detalle',
      cell: (order) => (
        <button type="button" className="secondary-button px-3 py-1.5 text-xs" onClick={() => setSelectedOrder(order)}>
          <Eye className="size-3.5" aria-hidden="true" />
          Ver detalle
        </button>
      ),
    },
  ]

  return (
    <>
      <PageTitle
        eyebrow="Pedidos"
        title="Gestión de pedidos"
        description="Seguimiento operativo desde la confirmación de compra hasta la entrega al cliente."
        action={
          <button type="button" className="primary-button" onClick={() => setIsFormOpen(true)}>
            <Plus className="size-4" aria-hidden="true" />
            Crear pedido
          </button>
        }
      />

      {isFormOpen ? (
        <section className="rounded-lg border border-brand-navy/10 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="field-label">Cliente</span>
              <select
                className="field-input mt-2"
                value={form.customerName}
                onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Producto</span>
              <input
                className="field-input mt-2"
                value={form.productName}
                onChange={(event) => setForm((current) => ({ ...current, productName: event.target.value }))}
                required
              />
            </label>
            <label className="block">
              <span className="field-label">Monto USD</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                value={form.totalUsd}
                onChange={(event) => setForm((current) => ({ ...current, totalUsd: event.target.value }))}
              />
            </label>
            <div className="flex gap-3 md:col-span-3">
              <button type="submit" className="primary-button">
                <PackagePlus className="size-4" aria-hidden="true" />
                Guardar pedido
              </button>
              <button type="button" className="secondary-button" onClick={() => setIsFormOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <DataTable data={orders} columns={columns} getRowKey={(order) => order.id} />

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/50 p-4">
          <section className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-red">{selectedOrder.orderCode}</p>
                <h2 className="mt-1 text-xl font-semibold tracking-normal text-brand-navy">Detalle de pedido</h2>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-brand-muted hover:bg-brand-panel"
                onClick={() => setSelectedOrder(null)}
                aria-label="Cerrar detalle"
                title="Cerrar"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-brand-navy/10 p-4">
                <p className="field-label">Cliente</p>
                <p className="mt-2 font-semibold text-brand-navy">{selectedOrder.customerName}</p>
              </div>
              <div className="rounded-lg border border-brand-navy/10 p-4">
                <p className="field-label">Estado actual</p>
                <div className="mt-2">
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>
              <div className="rounded-lg border border-brand-navy/10 p-4">
                <p className="field-label">Producto</p>
                <p className="mt-2 font-semibold text-brand-navy">{selectedOrder.productName}</p>
              </div>
              <div className="rounded-lg border border-brand-navy/10 p-4">
                <p className="field-label">Resumen</p>
                <p className="mt-2 text-sm text-brand-soft-text">
                  Total {formatUsd(selectedOrder.totalUsd)} registrado el {formatDate(selectedOrder.createdAt)}.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-normal text-brand-muted">Paquetes asociados</h3>
              <div className="mt-3 space-y-3">
                {relatedPackages.length ? (
                  relatedPackages.map((packageItem) => (
                    <div
                      key={packageItem.id}
                      className="flex flex-col gap-3 rounded-lg border border-brand-navy/10 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-brand-navy">{packageItem.packageCode}</p>
                        <p className="mt-1 text-sm text-brand-muted">{packageItem.description}</p>
                      </div>
                      <StatusBadge status={packageItem.status} />
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg border border-dashed border-brand-navy/20 p-4 text-sm text-brand-muted">
                    Este pedido aún no tiene paquetes registrados.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
