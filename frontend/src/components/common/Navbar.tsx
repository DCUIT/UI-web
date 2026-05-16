'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          UI Platform
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            "use client"

            import Link from "next/link";
            import { usePathname } from "next/navigation";
            import React from "react";
            import { ThemeToggle } from "../ui/ThemeToggle";
            import { Menu as MenuIcon, Command } from "lucide-react";
            import MegaMenu from "../navigation/MegaMenu";
            import SearchBar from "../navigation/SearchBar";
            import CommandMenu from "../navigation/CommandMenu";

            export default function Navbar({ onMobileMenu }: { onMobileMenu?: () => void }) {
              const path = usePathname();

              function openCommandMenu() {
                // dispatch a window event the CommandMenu listens for
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
                          <Link href="/" className={`px-3 py-2 rounded ${path === "/" ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                            Home
                          </Link>
                          <Link href="/components" className={`px-3 py-2 rounded ${path === "/components" ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                            Components
                          </Link>
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

