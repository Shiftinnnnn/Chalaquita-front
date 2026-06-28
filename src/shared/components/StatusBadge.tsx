import type { OrderStatus, PackageStatus, QuotationStatus } from '../types'
import { getStatusLabel } from '../utils/formatters'

type Status = QuotationStatus | OrderStatus | PackageStatus | string

const statusClasses: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800 ring-amber-200',
  APPROVED: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  REJECTED: 'bg-rose-100 text-rose-800 ring-rose-200',
  CONVERTED_TO_ORDER: 'bg-cyan-100 text-cyan-800 ring-cyan-200',
  CREATED: 'bg-slate-100 text-slate-700 ring-slate-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 ring-blue-200',
  PURCHASED_IN_USA: 'bg-indigo-100 text-indigo-800 ring-indigo-200',
  RECEIVED_IN_USA_WAREHOUSE: 'bg-cyan-100 text-cyan-800 ring-cyan-200',
  IN_TRANSIT_TO_PERU: 'bg-orange-100 text-orange-800 ring-orange-200',
  ARRIVED_IN_PERU: 'bg-sky-100 text-sky-800 ring-sky-200',
  READY_FOR_DELIVERY: 'bg-lime-100 text-lime-800 ring-lime-200',
  DELIVERED: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  CANCELLED: 'bg-slate-200 text-slate-700 ring-slate-300',
  REGISTERED: 'bg-slate-100 text-slate-700 ring-slate-200',
  RECEIVED_IN_USA: 'bg-cyan-100 text-cyan-800 ring-cyan-200',
  IN_TRANSIT: 'bg-orange-100 text-orange-800 ring-orange-200',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusClasses[status] ?? 'bg-slate-100 text-slate-700 ring-slate-200'
      }`}
    >
      {getStatusLabel(status)}
    </span>
  )
}

