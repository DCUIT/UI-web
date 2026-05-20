"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Layout, Search, Menu, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobileMenu } from "@/components/common/ShellClient"

export default function BottomNavbar() {
  const pathname = usePathname()
  const { setOpen } = useMobileMenu()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/components", label: "UI Kit", icon: Layout },
    { href: "/test", label: "Test", icon: Terminal },
  ]

  const openCommandMenu = () => {
    window.dispatchEvent(new Event("toggle-command-menu"))
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/60 bg-white/80 pb-safe backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80 md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 transition-colors",
                isActive 
                  ? "text-slate-950 dark:text-white" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <Icon size={20} className={cn(isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}

        <button
          onClick={openCommandMenu}
          className="flex flex-col items-center gap-1 px-3 py-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Search size={20} />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Menu size={20} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>
    </nav>
  )
}