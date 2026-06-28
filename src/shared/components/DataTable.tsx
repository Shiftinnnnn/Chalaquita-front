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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-normal text-slate-500 ${
                    column.className ?? ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={getRowKey(item)} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.header} className={`px-4 py-3 text-slate-700 ${column.className ?? ''}`}>
                    {column.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!data.length ? <div className="p-6 text-center text-sm text-slate-500">{emptyText}</div> : null}
    </div>
  )
}

