"use client"

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Explore
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-40 top-full mt-2 w-[56rem] max-w-screen-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Products</h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li className="hover:underline cursor-pointer">Components</li>
                <li className="hover:underline cursor-pointer">Templates</li>
                <li className="hover:underline cursor-pointer">Integrations</li>
                <li className="hover:underline cursor-pointer">Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li className="hover:underline cursor-pointer">Docs</li>
                <li className="hover:underline cursor-pointer">Blog</li>
                <li className="hover:underline cursor-pointer">Guides</li>
                <li className="hover:underline cursor-pointer">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Community</h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li className="hover:underline cursor-pointer">Discord</li>
                <li className="hover:underline cursor-pointer">GitHub</li>
                <li className="hover:underline cursor-pointer">Showcase</li>
                <li className="hover:underline cursor-pointer">Events</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            Tip: Press <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Ctrl/Cmd + K</kbd> to open the command menu.
          </div>
        </div>
      )}
    </div>
  );
}
