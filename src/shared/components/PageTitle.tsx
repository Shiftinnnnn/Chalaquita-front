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
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-normal text-brand-red">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-semibold tracking-normal text-brand-navy">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-brand-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
