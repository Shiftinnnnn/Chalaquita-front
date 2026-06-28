import type { ReactNode } from 'react'

type StatCardProps = {
  title: string
  value: string | number
  description: string
  icon: ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">{value}</p>
        </div>
        <div className="rounded-lg bg-cyan-50 p-3 text-cyan-700">{icon}</div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </div>
  )
}

