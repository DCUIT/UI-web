"use client"

import React, { useState } from "react"
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react"

interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  title?: string
}

export default function Table<T>({ data, columns, title }: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const filteredData = sortedData.filter(item => 
    Object.values(item as object).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {title && <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search data..."
              aria-label="Search data"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:w-64"
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                {columns.map((col) => (
                  <th 
                    key={String(col.key)} 
                    className={`px-6 py-4 ${col.sortable ? 'cursor-pointer hover:text-indigo-600' : ''} transition-colors`}
                    onClick={() => col.sortable && requestSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : <ChevronDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                        {col.render ? col.render(item[col.key], item) : String(item[col.key])}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} className="text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={24} className="opacity-40" />
                      <p className="text-sm font-medium">No results found</p>
                      <p className="text-xs">Try adjusting your search query</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}