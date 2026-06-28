import type { ReactNode } from 'react'

export type DataTableColumn<T> = {
  header: string
  cell: (item: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowKey: (item: T) => string
  emptyText?: string
}

export function DataTable<T>({ data, columns, getRowKey, emptyText = 'No hay datos para mostrar.' }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-navy/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-navy/10 text-left text-sm">
          <thead className="bg-brand-surface">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-normal text-brand-muted ${
                    column.className ?? ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/10">
            {data.map((item) => (
              <tr key={getRowKey(item)} className="hover:bg-brand-surface">
                {columns.map((column) => (
                  <td key={column.header} className={`px-4 py-3 text-brand-text ${column.className ?? ''}`}>
                    {column.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!data.length ? <div className="p-6 text-center text-sm text-brand-muted">{emptyText}</div> : null}
    </div>
  )
}

