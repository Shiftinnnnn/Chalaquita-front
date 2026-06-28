import type { ReactNode } from 'react'

type StatCardProps = {
  title: string
  value: string | number
  description: string
  icon: ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-brand-navy/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-muted">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-brand-navy">{value}</p>
        </div>
        <div className="rounded-lg bg-brand-red/10 p-3 text-brand-red">{icon}</div>
      </div>
      <p className="mt-3 text-sm text-brand-muted">{description}</p>
    </div>
  )
}

