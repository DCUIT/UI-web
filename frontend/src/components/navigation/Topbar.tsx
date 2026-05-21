"use client"

import { Bell, Sparkles } from "lucide-react";

const notifications = [
  { id: 1, label: "New UI Kit released", href: "/components" },
  { id: 2, label: "Beta mega menu is live", href: "/components" },
];

export default function Topbar() {
  return (
    <div className="flex h-full items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          <Sparkles size={16} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Welcome back!</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        {notifications.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {item.label}
          </a>
        ))}
        <button className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
          <Bell className="mr-1.5" size={14} /> Updates
        </button>
      </div>
    </div>
  );
}
