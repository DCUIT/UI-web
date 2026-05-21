"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from './SidebarContext'

export default function SidebarToggle() {
  const { collapsed, toggle } = useSidebar()

  return (
    <button
      onClick={toggle}
      className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
    </button>
  )
}
