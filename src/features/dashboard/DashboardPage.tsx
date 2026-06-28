import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ClipboardList, PackageCheck, PackageOpen, Send, Truck, UsersRound } from 'lucide-react'
import { DataTable, type DataTableColumn } from '../../shared/components/DataTable'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatCard } from '../../shared/components/StatCard'
import { StatusBadge } from '../../shared/components/StatusBadge'
import { useAppData } from '../../shared/data/useAppData'
import type { Order, Package } from '../../shared/types'
import { formatDate, formatUsd, packageStatusLabels } from '../../shared/utils/formatters'

export function DashboardPage() {
  const { customers, orders, packages, quotations } = useAppData()

  const pendingQuotations = quotations.filter((quotation) => quotation.status === 'PENDING').length
  const activeOrders = orders.filter((order) => !['DELIVERED', 'CANCELLED'].includes(order.status)).length
  const packagesInTransit = packages.filter((packageItem) => packageItem.status === 'IN_TRANSIT').length
  const deliveredPackages = packages.filter((packageItem) => packageItem.status === 'DELIVERED').length

  const packageStatusData = Object.entries(packageStatusLabels).map(([status, label]) => ({
    status: label,
    total: packages.filter((packageItem) => packageItem.status === status).length,
  }))

  const orderColumns: DataTableColumn<Order>[] = [
    { header: 'Código', cell: (order) => <span className="font-semibold text-slate-950">{order.orderCode}</span> },
    { header: 'Cliente', cell: (order) => order.customerName },
    { header: 'Producto', cell: (order) => order.productName },
    { header: 'Monto', cell: (order) => formatUsd(order.totalUsd) },
    { header: 'Estado', cell: (order) => <StatusBadge status={order.status} /> },
  ]

  const packageColumns: DataTableColumn<Package>[] = [
    {
      header: 'Paquete',
      cell: (packageItem) => <span className="font-semibold text-slate-950">{packageItem.packageCode}</span>,
    },
    { header: 'Cliente', cell: (packageItem) => packageItem.customerName },
    { header: 'Ubicación', cell: (packageItem) => packageItem.currentLocation },
    { header: 'Estado', cell: (packageItem) => <StatusBadge status={packageItem.status} /> },
  ]

  return (
    <>
      <PageTitle
        eyebrow="Panel operativo"
        title="Dashboard interno"
        description="Control general de cotizaciones, pedidos y paquetes para la operación USA a Perú."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Cotizaciones pendientes"
          value={pendingQuotations}
          description="Requieren revisión comercial."
          icon={<ClipboardList className="size-5" aria-hidden="true" />}
        />
        <StatCard
          title="Pedidos activos"
          value={activeOrders}
          description="En proceso de compra o entrega."
          icon={<PackageOpen className="size-5" aria-hidden="true" />}
        />
        <StatCard
          title="Paquetes en tránsito"
          value={packagesInTransit}
          description="Camino a Perú."
          icon={<Send className="size-5" aria-hidden="true" />}
        />
        <StatCard
          title="Paquetes entregados"
          value={deliveredPackages}
          description="Cerrados satisfactoriamente."
          icon={<PackageCheck className="size-5" aria-hidden="true" />}
        />
        <StatCard
          title="Clientes registrados"
          value={customers.length}
          description="Base mock del negocio."
          icon={<UsersRound className="size-5" aria-hidden="true" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-normal text-slate-950">Paquetes por estado</h2>
              <p className="mt-1 text-sm text-slate-500">Distribución actual de la operación.</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
              <Truck className="size-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packageStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} interval={0} height={60} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#0891b2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <p className="text-sm font-semibold text-cyan-200">Operación de hoy</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">Prioridades del equipo</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm font-semibold">Cotizaciones por cerrar</p>
              <p className="mt-1 text-3xl font-semibold text-cyan-200">{pendingQuotations}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm font-semibold">Último paquete creado</p>
              <p className="mt-1 text-sm text-slate-300">{packages[0]?.packageCode ?? 'Sin paquetes'}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm font-semibold">Fecha operativa</p>
              <p className="mt-1 text-sm text-slate-300">{formatDate(new Date().toISOString())}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-normal text-slate-950">Últimos pedidos</h2>
          <DataTable data={orders.slice(0, 5)} columns={orderColumns} getRowKey={(order) => order.id} />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-normal text-slate-950">Últimos paquetes</h2>
          <DataTable data={packages.slice(0, 5)} columns={packageColumns} getRowKey={(packageItem) => packageItem.id} />
        </div>
      </section>
    </>
  )
}
