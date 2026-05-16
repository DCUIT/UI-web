"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Menu as MenuIcon, Command } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MegaMenu from "@/components/navigation/MegaMenu";
import SearchBar from "@/components/navigation/SearchBar";
import CommandMenu from "@/components/navigation/CommandMenu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
];

export default function Navbar({ onMobileMenu }: { onMobileMenu?: () => void }) {
  const path = usePathname();

  function openCommandMenu() {
    window.dispatchEvent(new Event("toggle-command-menu"));
  }

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <CommandMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg">
              UI Platform
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded ${path === item.href ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  {item.label}
                </Link>
              ))}
              <MegaMenu />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar />
            <button onClick={openCommandMenu} title="Command menu (Ctrl/Cmd+K)" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Command size={16} /> <span className="text-sm">Cmd</span>
            </button>
            <ThemeToggle />
            <button className="md:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onMobileMenu} aria-label="Open mobile menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
