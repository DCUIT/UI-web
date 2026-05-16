"use client"

import { Bell, Sparkles } from "lucide-react";

const notifications = [
  { id: 1, label: "New UI Kit released", href: "/components" },
  { id: 2, label: "Beta mega menu is live", href: "/components" },
];

export default function Topbar() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-none sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          <Sparkles size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Welcome back!</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Explore navigation tools and quick actions from the topbar.</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {notifications.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {item.label}
          </a>
        ))}
        <button className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
          <Bell className="mr-2" size={16} /> Updates
        </button>
      </div>
    </div>
  );
}
