"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import { Menu as MenuIcon, Command } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import dynamic from "next/dynamic";

const MegaMenu = dynamic(() => import("@/components/navigation/MegaMenu"), { ssr: false });
const SearchBar = dynamic(() => import("@/components/navigation/SearchBar"), { ssr: false });
const CommandMenu = dynamic(() => import("@/components/navigation/CommandMenu"), { ssr: false });

const navItems = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/test", label: "UI Test" },
];

export default function Navbar({ onMobileMenu }: { onMobileMenu?: () => void }) {
  const path = usePathname();

  function openCommandMenu() {
    window.dispatchEvent(new Event("toggle-command-menu"));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70">
      <CommandMenu />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              UI Platform
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${path === item.href ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
              <Suspense fallback={<div className="w-20 h-8 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />}>
                <MegaMenu />
              </Suspense>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Suspense fallback={<div className="w-32 h-8 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />}>
              <SearchBar />
            </Suspense>
            <button onClick={openCommandMenu} title="Command menu (Ctrl/Cmd+K)" className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 sm:inline-flex">
              <Command size={16} /> <span>Cmd</span>
            </button>
            <ThemeToggle />
            <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" onClick={onMobileMenu} aria-label="Open mobile menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
