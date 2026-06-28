import { Plus, Search, UserPlus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { DataTable, type DataTableColumn } from '../../shared/components/DataTable'
import { PageTitle } from '../../shared/components/PageTitle'
import { useAppData } from '../../shared/data/useAppData'
import type { Customer } from '../../shared/types'
import { formatDate } from '../../shared/utils/formatters'

const emptyCustomerForm = {
  name: '',
  email: '',
  phone: '',
  documentNumber: '',
}

export function CustomersPage() {
  const { customers, addCustomer } = useAppData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(emptyCustomerForm)

  const filteredCustomers = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()
    if (!normalizedTerm) return customers
    return customers.filter((customer) =>
      [customer.name, customer.email, customer.phone, customer.documentNumber].some((value) =>
        value.toLowerCase().includes(normalizedTerm),
      ),
    )
  }, [customers, searchTerm])

  const columns: DataTableColumn<Customer>[] = [
    { header: 'Cliente', cell: (customer) => <span className="font-semibold text-slate-950">{customer.name}</span> },
    { header: 'Correo', cell: (customer) => customer.email },
    { header: 'Teléfono', cell: (customer) => customer.phone },
    { header: 'DNI/RUC', cell: (customer) => customer.documentNumber },
    { header: 'Pedidos', cell: (customer) => customer.totalOrders },
    { header: 'Registro', cell: (customer) => formatDate(customer.createdAt) },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addCustomer(form)
    setForm(emptyCustomerForm)
    setIsModalOpen(false)
  }

  return (
    <>
      <PageTitle
        eyebrow="Clientes"
        title="Gestión de clientes"
        description="Base operativa de clientes para cotizaciones, pedidos y tracking."
        action={
          <button type="button" className="primary-button" onClick={() => setIsModalOpen(true)}>
            <Plus className="size-4" aria-hidden="true" />
            Registrar cliente
          </button>
        }
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block max-w-xl">
          <span className="field-label">Buscar cliente</span>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="field-input pl-9"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Nombre, correo, teléfono o documento"
            />
          </div>
        </label>
      </section>

      <DataTable
        data={filteredCustomers}
        columns={columns}
        getRowKey={(customer) => customer.id}
        emptyText="No se encontraron clientes."
      />

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-700">Nuevo cliente</p>
                <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-950">Registrar cliente</h2>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar modal"
                title="Cerrar"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="field-label">Nombre completo</span>
                <input
                  className="field-input mt-2"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="field-label">Correo</span>
                <input
                  className="field-input mt-2"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </label>
              <label className="block">
                <span className="field-label">Teléfono</span>
                <input
                  className="field-input mt-2"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  required
                />
              </label>
              <label className="block">
                <span className="field-label">DNI/RUC</span>
                <input
                  className="field-input mt-2"
                  value={form.documentNumber}
                  onChange={(event) => setForm((current) => ({ ...current, documentNumber: event.target.value }))}
                  required
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="secondary-button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="primary-button">
                <UserPlus className="size-4" aria-hidden="true" />
                Guardar cliente
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
