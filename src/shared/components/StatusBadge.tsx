import type { OrderStatus, PackageStatus, QuotationStatus } from '../types'
import { getStatusLabel } from '../utils/formatters'

type Status = QuotationStatus | OrderStatus | PackageStatus | string

const statusClasses: Record<string, string> = {
  PENDING: 'bg-brand-red/10 text-brand-red ring-brand-red/20',
  APPROVED: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  REJECTED: 'bg-brand-red/10 text-brand-red ring-brand-red/20',
  CONVERTED_TO_ORDER: 'bg-brand-red/15 text-brand-red ring-brand-red/20',
  CREATED: 'bg-brand-panel text-brand-text ring-brand-navy/15',
  CONFIRMED: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  PURCHASED_IN_USA: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  RECEIVED_IN_USA_WAREHOUSE: 'bg-brand-red/15 text-brand-red ring-brand-red/20',
  IN_TRANSIT_TO_PERU: 'bg-brand-red/10 text-brand-red ring-brand-red/20',
  ARRIVED_IN_PERU: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  READY_FOR_DELIVERY: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  DELIVERED: 'bg-brand-navy/10 text-brand-navy ring-brand-navy/15',
  CANCELLED: 'bg-brand-line text-brand-text ring-brand-navy/20',
  REGISTERED: 'bg-brand-panel text-brand-text ring-brand-navy/15',
  RECEIVED_IN_USA: 'bg-brand-red/15 text-brand-red ring-brand-red/20',
  IN_TRANSIT: 'bg-brand-red/10 text-brand-red ring-brand-red/20',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusClasses[status] ?? 'bg-brand-panel text-brand-text ring-brand-navy/15'
      }`}
    >
      {getStatusLabel(status)}
    </span>
  )
}

