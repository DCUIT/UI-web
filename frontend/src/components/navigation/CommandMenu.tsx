"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Layout, 
  FileText, 
  Monitor,
  Moon,
  Sun,
  Laptop
} from "lucide-react"
import { componentsData } from "@/data/components"

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

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
    window.addEventListener("toggle-command-menu", handleToggle)
    
    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener("toggle-command-menu", handleToggle)
    }
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 p-4 pt-[15vh] backdrop-blur-sm">
      <Command 
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false)
        }}
      >
        <div className="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
          <Search className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
          <Command.Input 
            placeholder="Type a command or search..." 
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100"
          />
        </div>
        
        <Command.List className="max-h-[450px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-slate-500">No results found.</Command.Empty>
          
          <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-slate-500">
            <Item 
              icon={Layout} 
              label="All Components" 
              shortcut="G C" 
              onSelect={() => runCommand(() => router.push("/components"))} 
            />
            <Item 
              icon={Monitor} 
              label="Dashboard View" 
              onSelect={() => runCommand(() => router.push("/components?category=Dashboard"))} 
            />
          </Command.Group>

          <Command.Separator className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

          <Command.Group heading="Components" className="px-2 py-1.5 text-xs font-medium text-slate-500">
            {componentsData.map((comp) => (
              <Item 
                key={comp.id} 
                icon={FileText} 
                label={comp.name} 
                onSelect={() => runCommand(() => router.push(`/components?id=${comp.id}`))} 
              />
            ))}
          </Command.Group>

          <Command.Separator className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

          <Command.Group heading="System Commands" className="px-2 py-1.5 text-xs font-medium text-slate-500">
            <Item icon={Sun} label="Set Light Mode" onSelect={() => runCommand(() => setTheme("light"))} />
            <Item icon={Moon} label="Set Dark Mode" onSelect={() => runCommand(() => setTheme("dark"))} />
            <Item icon={Laptop} label="Set System Mode" onSelect={() => runCommand(() => setTheme("system"))} />
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}

function Item({ icon: Icon, label, shortcut, onSelect }: { icon: any, label: string, shortcut?: string, onSelect?: () => void }) {
  return (
    <Command.Item 
      onSelect={onSelect}
      className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:text-slate-300 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-100"
    >
      <Icon className="mr-3 h-4 w-4" />
      <span>{label}</span>
      {shortcut && (
        <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-sans text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  )
}