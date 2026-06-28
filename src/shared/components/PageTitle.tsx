import type { ReactNode } from 'react'

type PageTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-normal text-cyan-700">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-semibold tracking-normal text-slate-950">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
