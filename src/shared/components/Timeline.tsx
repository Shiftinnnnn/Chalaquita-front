import { CheckCircle2, MapPin } from 'lucide-react'
import type { TrackingEvent } from '../types'
import { formatDateTime } from '../utils/formatters'
import { StatusBadge } from './StatusBadge'

export function Timeline({ events }: { events: TrackingEvent[] }) {
  const sortedEvents = [...events].sort((first, second) => Date.parse(first.createdAt) - Date.parse(second.createdAt))

  if (!sortedEvents.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
        Aún no hay eventos registrados para este paquete.
      </div>
    )
  }

  return (
    <ol className="relative space-y-6 border-s border-slate-200 ps-6">
      {sortedEvents.map((event, index) => {
        const isLatest = index === sortedEvents.length - 1
        return (
          <li key={event.id} className="relative">
            <span
              className={`absolute -start-[34px] flex size-6 items-center justify-center rounded-full ring-4 ring-white ${
                isLatest ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <CheckCircle2 className="size-4" aria-hidden="true" />
            </span>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDateTime(event.createdAt)}</p>
                </div>
                <StatusBadge status={event.status} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{event.description}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
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

