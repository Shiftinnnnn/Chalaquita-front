import { CheckCircle2, MapPin } from 'lucide-react'
import type { TrackingEvent } from '../types'
import { formatDateTime } from '../utils/formatters'
import { StatusBadge } from './StatusBadge'

export function Timeline({ events }: { events: TrackingEvent[] }) {
  const sortedEvents = [...events].sort((first, second) => Date.parse(first.createdAt) - Date.parse(second.createdAt))

  if (!sortedEvents.length) {
    return (
      <div className="rounded-lg border border-dashed border-brand-navy/20 bg-white p-6 text-sm text-brand-muted">
        Aún no hay eventos registrados para este paquete.
      </div>
    )
  }

  return (
    <ol className="relative space-y-6 border-s border-brand-navy/10 ps-6">
      {sortedEvents.map((event, index) => {
        const isLatest = index === sortedEvents.length - 1
        return (
          <li key={event.id} className="relative">
            <span
              className={`absolute -start-[34px] flex size-6 items-center justify-center rounded-full ring-4 ring-white ${
                isLatest ? 'bg-brand-red text-white' : 'bg-brand-panel text-brand-muted'
              }`}
            >
              <CheckCircle2 className="size-4" aria-hidden="true" />
            </span>
            <div className="rounded-lg border border-brand-navy/10 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{event.title}</p>
                  <p className="mt-1 text-xs text-brand-muted">{formatDateTime(event.createdAt)}</p>
                </div>
                <StatusBadge status={event.status} />
              </div>
              <p className="mt-3 text-sm text-brand-soft-text">{event.description}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-muted">
                <MapPin className="size-3.5" aria-hidden="true" />
                {event.location}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

