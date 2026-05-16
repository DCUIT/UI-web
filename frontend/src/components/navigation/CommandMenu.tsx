"use client"

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      const cmd = e.ctrlKey || e.metaKey;
      if (cmd && isK) {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    }

    function onToggleEvent() {
      setOpen((s) => !s);
    }

    window.addEventListener("keydown", onKey as any);
    window.addEventListener("toggle-command-menu", onToggleEvent as any);
    return () => {
      window.removeEventListener("keydown", onKey as any);
      window.removeEventListener("toggle-command-menu", onToggleEvent as any);
    };
  }, []);

  const commands = [
    { id: "components", label: "Open Components" },
    { id: "templates", label: "Open Templates" },
    { id: "new-component", label: "Create new component" },
    { id: "search", label: "Search site" },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent outline-none px-2 py-2 text-sm"
            />
          </div>
          <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <X />
          </button>
        </div>
        <div className="p-3">
          <ul className="space-y-2">
            {filtered.map((c) => (
              <li
                key={c.id}
                className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                onClick={() => {
                  // simple client-side simulation
                  alert(`Command: ${c.label}`);
                  setOpen(false);
                }}
              >
                {c.label}
              </li>
            ))}
            {filtered.length === 0 && <li className="text-sm text-slate-500">No commands</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
