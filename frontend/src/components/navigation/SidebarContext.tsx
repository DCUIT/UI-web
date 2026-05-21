"use client"

import { createContext, useContext, useState, useCallback } from 'react'

interface SidebarContextType {
  collapsed: boolean
  toggle: () => void
  expand: () => void
  collapse: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = useCallback(() => setCollapsed(prev => !prev), [])
  const expand = useCallback(() => setCollapsed(false), [])
  const collapse = useCallback(() => setCollapsed(true), [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggle, expand, collapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
