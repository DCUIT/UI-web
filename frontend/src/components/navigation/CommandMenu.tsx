"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Layout, FileText, Monitor, Moon, Sun, Laptop, Clock, Trash2 } from "lucide-react"
import { Command } from "cmdk"
import { componentsData } from "@/data/components"

type MenuItem = {
  key: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  shortcut?: string
  group: string
  onSelect: () => void
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>
  const parts = text.split(new RegExp(`(${query})`, "gi"))
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-indigo-600 font-semibold dark:text-indigo-400">{part}</span>
        ) : (part)
      )}
    </span>
  )
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [recent, setRecent] = useState<string[]>([])

  const router = useRouter()
  const { setTheme } = useTheme()

  const items: MenuItem[] = useMemo(
    () => [
      {
        key: "all-components",
        icon: Layout,
        label: "All Components",
        shortcut: "G C",
        group: "Navigation",
        onSelect: () => router.push("/components"),
      },
      {
        key: "dashboard-view",
        icon: Monitor,
        label: "Dashboard View",
        group: "Navigation",
        onSelect: () => router.push("/components?category=Dashboard"),
      },
      ...componentsData.map((comp) => ({
        key: `component-${comp.id}`,
        icon: FileText,
        label: comp.name,
        group: "Components",
        onSelect: () => router.push(`/components?id=${comp.id}`),
      })),
      {
        key: "set-light",
        icon: Sun,
        label: "Set Light Mode",
        group: "System Commands",
        onSelect: () => setTheme("light"),
      },
      {
        key: "set-dark",
        icon: Moon,
        label: "Set Dark Mode",
        group: "System Commands",
        onSelect: () => setTheme("dark"),
      },
      {
        key: "set-system",
        icon: Laptop,
        label: "Set System Mode",
        group: "System Commands",
        onSelect: () => setTheme("system"),
      },
    ],
    [router, setTheme]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => i.label.toLowerCase().includes(q))
  }, [items, query])

  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>()
    for (const item of filtered) {
      const arr = map.get(item.group) ?? []
      arr.push(item)
      map.set(item.group, arr)
    }
    return Array.from(map.entries())
  }, [filtered])

  useEffect(() => {
    const saved = localStorage.getItem("ui-platform-recent-searches")
    if (saved) setRecent(JSON.parse(saved))
  }, [])

  const addToRecent = (term: string) => {
    if (!term.trim()) return
    const newRecent = [term, ...recent.filter(t => t !== term)].slice(0, 5)
    setRecent(newRecent)
    localStorage.setItem("ui-platform-recent-searches", JSON.stringify(newRecent))
  }

  const clearRecent = () => {
    setRecent([])
    localStorage.removeItem("ui-platform-recent-searches")
  }

  // Lắng nghe phím tắt Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    const handleToggle = () => setOpen((prev) => !prev)

    document.addEventListener("keydown", down)
    window.addEventListener("toggle-command-menu", handleToggle as EventListener)

    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener(
        "toggle-command-menu",
        handleToggle as EventListener
      )
    }
  }, [])

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const runCommand = (command: () => void) => {
    if (query.trim()) addToRecent(query)
    setOpen(false)
    setQuery("")
    command()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 p-4 pt-[15vh] backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Escape") setOpen(false)
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
              <Search className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100"
              />
            </div>

            <div className="max-h-[450px] overflow-y-auto p-2">
              {grouped.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500">
                  No results found.
                </div>
              ) : (
                grouped.map(([heading, list]) => (
                  <div key={heading} className="px-2 py-1.5">
                    <div className="pb-1.5 text-xs font-medium text-slate-500">
                      {heading}
                    </div>
                    <div className="space-y-1">
                      {list.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => runCommand(item.onSelect)}
                          className="w-full text-left relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          <span>{item.label}</span>
                          {item.shortcut && (
                            <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-sans text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
