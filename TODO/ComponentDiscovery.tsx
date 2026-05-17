"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, LayoutGrid, Box } from "lucide-react"
import { componentsData } from "@/data/components"

export default function ComponentDiscovery() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(componentsData.map(c => c.category))]
  
  const filteredComponents = componentsData.filter(c => 
    (selectedCategory === "All" || c.category === selectedCategory) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10 py-8">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Discover Components
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Browse through our collection of high-quality, accessible UI components built with Tailwind CSS.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredComponents.map((component, i) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Box size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-indigo-600">
              {component.name}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {component.category} Component • React/Tailwind
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}