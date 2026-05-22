"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Box, Layout, MessageSquare, Megaphone, Terminal, GraduationCap, Palette, Sparkles, Accessibility, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

const sidebarGroups = [
  {
    title: "UI Elements",
    icon: Box,
    items: [
      { href: '/components?category=UI', label: 'UI' },
      { href: '/components?category=Form', label: 'Form' },
      { href: '/components?category=Overlay', label: 'Overlay' },
    ]
  },
  {
    title: "Layout",
    icon: Layout,
    items: [
      { href: '/components?category=Cards', label: 'Cards' },
      { href: '/components?category=Navigation', label: 'Navigation' },
      { href: '/components?category=Table', label: 'Table' },
    ]
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    items: [
      { href: '/components?category=Feedback', label: 'Feedback' },
    ]
  },
  {
    title: "Marketing",
    icon: Megaphone,
    items: [
      { href: '/components?category=Dashboard', label: 'Dashboard' },
    ]
  },
  {
    title: "Learning Labs",
    icon: GraduationCap,
    items: [
      { href: '/playground/tailwind-lab', label: 'Tailwind Lab' },
      { href: '/playground/animation-studio', label: 'Animation Studio' },
      { href: '/playground/a11y-auditor', label: 'A11y Auditor' },
    ]
  },
  {
    title: "App UI",
    icon: Terminal,
    items: [
      { href: '/playground', label: 'Playground' },
      { href: '/patterns', label: 'Patterns' },
      { href: '/test', label: 'Test UI' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([sidebarGroups[0].title]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  return (
    <nav className="select-none" aria-label="Main Sidebar Navigation">
      <div className="flex flex-col gap-1">
        {sidebarGroups.map((group) => {
          const isOpen = openGroups.includes(group.title);
          const Icon = group.icon;

          return (
            <div key={group.title} className="flex flex-col">
              <button
                onClick={() => toggleGroup(group.title)}
                className={cn(
                  "flex items-center rounded-lg px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200 w-full",
                  collapsed && "justify-center"
                )}
                title={collapsed ? group.title : undefined}
              >
                <Icon size={14} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="ml-2 truncate">{group.title}</span>
                    <ChevronDown 
                      size={14} 
                      className={cn("ml-auto shrink-0 transition-transform duration-200", isOpen && "rotate-180")} 
                    />
                  </>
                )}
              </button>
              
              {!collapsed && (
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="mt-1 flex flex-col gap-0.5 border-l border-slate-100 ml-3.5 pl-3.5 dark:border-slate-800">
                      {group.items.map((item) => {
                        const isActive = pathname === item.href.split('?')[0];
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
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
