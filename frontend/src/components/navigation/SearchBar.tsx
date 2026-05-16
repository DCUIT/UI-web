"use client"

import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center w-full max-w-md">
      <div className="flex items-center w-full border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1 bg-white dark:bg-slate-900">
        <Search className="text-slate-400" />
        <input
          aria-label="Search"
          placeholder="Search components, templates..."
          className="ml-2 w-full bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200"
        />
      </div>
    </div>
  );
}
