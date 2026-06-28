import { ArrowRight, CheckCircle2, CircleDollarSign, Plus, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { DataTable, type DataTableColumn } from '../../shared/components/DataTable'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { useAppData } from '../../shared/data/useAppData'
import type { Quotation, QuotationStatus } from '../../shared/types'
import { formatDate, formatUsd, quotationStatusLabels } from '../../shared/utils/formatters'

const quotationStatuses = Object.keys(quotationStatusLabels) as QuotationStatus[]

const emptyQuotationForm = {
  customerName: 'Juan Pérez',
  productName: '',
  productUrl: '',
  productPriceUsd: '0',
  estimatedWeight: '1',
  shippingCost: '0',
  serviceFee: '0',
  estimatedDays: '10',
}

export function QuotationsPage() {
  const { customers, quotations, addQuotation, updateQuotationStatus, convertQuotationToOrder } = useAppData()
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | 'ALL'>('ALL')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(emptyQuotationForm)

  const totalUsd = useMemo(
    () => Number(form.productPriceUsd) + Number(form.shippingCost) + Number(form.serviceFee),
    [form.productPriceUsd, form.serviceFee, form.shippingCost],
  )

  const filteredQuotations = useMemo(() => {
    if (statusFilter === 'ALL') return quotations
    return quotations.filter((quotation) => quotation.status === statusFilter)
  }, [quotations, statusFilter])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addQuotation({
      customerName: form.customerName,
      productName: form.productName,
      productUrl: form.productUrl,
      productPriceUsd: Number(form.productPriceUsd),
      estimatedWeight: Number(form.estimatedWeight),
      shippingCost: Number(form.shippingCost),
      serviceFee: Number(form.serviceFee),
      totalUsd,
      estimatedDays: Number(form.estimatedDays),
    })
    setForm(emptyQuotationForm)
    setIsFormOpen(false)
  }

  const columns: DataTableColumn<Quotation>[] = [
    { header: 'Cliente', cell: (quotation) => quotation.customerName },
    {
      header: 'Producto',
      cell: (quotation) => <span className="font-semibold text-brand-navy">{quotation.productName}</span>,
    },
    { header: 'Precio', cell: (quotation) => formatUsd(quotation.productPriceUsd) },
    { header: 'Peso', cell: (quotation) => `${quotation.estimatedWeight} kg` },
    { header: 'Total', cell: (quotation) => <span className="font-semibold">{formatUsd(quotation.totalUsd)}</span> },
    { header: 'Tiempo', cell: (quotation) => `${quotation.estimatedDays} días` },
    { header: 'Estado', cell: (quotation) => <StatusBadge status={quotation.status} /> },
    { header: 'Fecha', cell: (quotation) => formatDate(quotation.createdAt) },
    {
      header: 'Acciones',
      cell: (quotation) => (
        <div className="flex min-w-52 flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-brand-navy/10 px-2.5 py-1.5 text-xs font-semibold text-brand-navy hover:bg-brand-navy/15"
            onClick={() => updateQuotationStatus(quotation.id, 'APPROVED')}
          >
            Aprobar
          </button>
          <button
            type="button"
            className="rounded-lg bg-brand-red/10 px-2.5 py-1.5 text-xs font-semibold text-brand-red hover:bg-brand-red/15"
            onClick={() => updateQuotationStatus(quotation.id, 'REJECTED')}
          >
            Rechazar
          </button>
          <button
            type="button"
            className="rounded-lg bg-brand-red/10 px-2.5 py-1.5 text-xs font-semibold text-brand-red hover:bg-brand-red/15 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => convertQuotationToOrder(quotation)}
            disabled={quotation.status === 'CONVERTED_TO_ORDER'}
          >
            Convertir
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageTitle
        eyebrow="Cotizaciones"
        title="Calculadora de costos y tiempos"
        description="Evalúa productos, costos de envío, comisión y tiempo estimado antes de convertir una cotización en pedido."
        action={
          <button type="button" className="primary-button" onClick={() => setIsFormOpen((current) => !current)}>
            <Plus className="size-4" aria-hidden="true" />
            Nueva cotización
          </button>
        }
      />

      {isFormOpen ? (
        <section className="rounded-lg border border-brand-navy/10 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-4">
            <label className="block lg:col-span-2">
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
            <label className="block lg:col-span-2">
              <span className="field-label">Producto</span>
              <input
                className="field-input mt-2"
                value={form.productName}
                onChange={(event) => setForm((current) => ({ ...current, productName: event.target.value }))}
                required
              />
            </label>
            <label className="block lg:col-span-4">
              <span className="field-label">Link del producto</span>
              <input
                className="field-input mt-2"
                value={form.productUrl}
                onChange={(event) => setForm((current) => ({ ...current, productUrl: event.target.value }))}
                placeholder="https://store.example.com/producto"
                required
              />
            </label>
            <label className="block">
              <span className="field-label">Precio USD</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                value={form.productPriceUsd}
                onChange={(event) => setForm((current) => ({ ...current, productPriceUsd: event.target.value }))}
              />
            </label>
            <label className="block">
              <span className="field-label">Peso estimado</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                step="0.1"
                value={form.estimatedWeight}
                onChange={(event) => setForm((current) => ({ ...current, estimatedWeight: event.target.value }))}
              />
            </label>
            <label className="block">
              <span className="field-label">Costo de envío</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                value={form.shippingCost}
                onChange={(event) => setForm((current) => ({ ...current, shippingCost: event.target.value }))}
              />
            </label>
            <label className="block">
              <span className="field-label">Comisión</span>
              <input
                className="field-input mt-2"
                type="number"
                min="0"
                value={form.serviceFee}
                onChange={(event) => setForm((current) => ({ ...current, serviceFee: event.target.value }))}
              />
            </label>
            <label className="block">
              <span className="field-label">Tiempo estimado</span>
              <input
                className="field-input mt-2"
                type="number"
                min="1"
                value={form.estimatedDays}
                onChange={(event) => setForm((current) => ({ ...current, estimatedDays: event.target.value }))}
              />
            </label>
            <div className="rounded-lg bg-brand-navy p-4 text-white lg:col-span-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-white/75">
                <CircleDollarSign className="size-4" aria-hidden="true" />
                Total calculado
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-normal">{formatUsd(totalUsd)}</p>
            </div>
            <div className="flex items-end gap-3 lg:col-span-4">
              <button type="submit" className="primary-button">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Guardar cotización
              </button>
              <button type="button" className="secondary-button" onClick={() => setIsFormOpen(false)}>
                <XCircle className="size-4" aria-hidden="true" />
                Cancelar
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="flex flex-wrap gap-2 rounded-lg border border-brand-navy/10 bg-white p-4 shadow-sm">
        <button
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            statusFilter === 'ALL' ? 'bg-brand-navy text-white' : 'bg-brand-panel text-brand-text hover:bg-brand-line'
          }`}
          onClick={() => setStatusFilter('ALL')}
        >
          Todas
        </button>
        {quotationStatuses.map((status) => (
          <button
            key={status}
            type="button"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              statusFilter === status ? 'bg-brand-navy text-white' : 'bg-brand-panel text-brand-text hover:bg-brand-line'
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {quotationStatusLabels[status]}
          </button>
        ))}
      </section>

      <DataTable
        data={filteredQuotations}
        columns={columns}
        getRowKey={(quotation) => quotation.id}
        emptyText="No hay cotizaciones con este filtro."
      />

      <div className="rounded-lg border border-brand-red/15 bg-brand-red/10 p-4 text-sm text-brand-text">
        <p className="flex items-center gap-2 font-semibold">
          <ArrowRight className="size-4" aria-hidden="true" />
          Las acciones son simuladas en frontend para mostrar el flujo comercial de la primera versión.
        </p>
      </div>
    </>
  )
}
