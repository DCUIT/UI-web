"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Box, Layout, MessageSquare, Megaphone, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const sidebarGroups = [
  {
    title: "UI Elements",
    icon: Box,
    items: [
      { href: '/components?category=Buttons', label: 'Buttons' },
      { href: '/components?category=Inputs', label: 'Inputs' },
      { href: '/components?category=Cards', label: 'Cards' },
      { href: '/components?category=Dialogs', label: 'Dialogs' },
    ]
  },
  {
    title: "Layout",
    icon: Layout,
    items: [
      { href: '/components?category=Navbar', label: 'Navbar' },
      { href: '/components?category=Sidebar', label: 'Sidebar' },
      { href: '/components?category=Bento Grid', label: 'Bento Grid' },
    ]
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    items: [
      { href: '/components?category=Toast', label: 'Toast' },
      { href: '/components?category=Alert', label: 'Alert' },
      { href: '/components?category=Skeleton', label: 'Skeleton' },
    ]
  },
  {
    title: "Marketing",
    icon: Megaphone,
    items: [
      { href: '/components?category=Hero', label: 'Hero' },
      { href: '/components?category=Pricing', label: 'Pricing' },
      { href: '/components?category=FAQ', label: 'FAQ' },
    ]
  },
  {
    title: "App UI",
    icon: Terminal,
    items: [
      { href: '/templates?type=Dashboard', label: 'Dashboard' },
      { href: '/templates?type=Ecommerce', label: 'Ecommerce' },
      { href: '/templates?type=Auth', label: 'Authentication' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(sidebarGroups.map(g => g.title));

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  return (
    <nav className="sticky top-20 w-full select-none" aria-label="Main Sidebar Navigation">
      <div className="flex flex-col gap-1 pr-2">
        {sidebarGroups.map((group) => {
          const isOpen = openGroups.includes(group.title);
          const Icon = group.icon;

          return (
            <div key={group.title} className="flex flex-col">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} />
                  <span>{group.title}</span>
                </div>
                <ChevronDown 
                  size={14} 
                  className={cn("transition-transform duration-200", !isOpen && "-rotate-90")} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 flex flex-col gap-0.5 border-l border-slate-100 ml-3.5 pl-3.5 dark:border-slate-800">
                      {group.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "rounded-md px-2 py-1 text-sm font-medium transition-all",
                              isActive
                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
