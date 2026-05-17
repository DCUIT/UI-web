"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Filter, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Star, 
  ShoppingCart,
  Search
} from "lucide-react"

const categories = ["Electronics", "Clothing", "Home & Garden", "Books", "Sports"]
const brands = ["MasterBrand", "ApexUI", "Nova", "Elite"]

const products = [
  { id: 1, name: "Premium Wireless Headphones", price: 299, rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
  { id: 2, name: "Minimalist Mechanical Keyboard", price: 159, rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" },
  { id: 3, name: "Ergonomic Office Chair", price: 450, rating: 4.7, category: "Home & Garden", image: "https://images.unsplash.com/photo-1505797149-43b007664a47?w=500&q=80" },
  { id: 4, name: "Leather Travel Backpack", price: 120, rating: 4.6, category: "Clothing", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80" },
  { id: 5, name: "Smart Fitness Watch", price: 199, rating: 4.5, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
  { id: 6, name: "Organic Cotton Hoodie", price: 85, rating: 4.8, category: "Clothing", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
]

export default function EcommerceTemplate() {
  const [view, setView] = useState<"grid" | "list">("grid")
  
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 space-y-6 shrink-0">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Price Range</h3>
          <input type="range" className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Rating</h3>
          {[4, 3, 2].map(star => (
            <label key={star} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2 cursor-pointer">
              <input type="radio" name="rating" className="text-indigo-600 focus:ring-indigo-500" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < star ? "currentColor" : "none"} />
                ))}
              </div>
              <span>& up</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Showing {products.length} products</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <button 
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-slate-100 dark:bg-slate-800 text-indigo-600" : "text-slate-500"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-slate-100 dark:bg-slate-800 text-indigo-600" : "text-slate-500"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all ${view === "list" ? "flex gap-6" : ""}`}
              >
                <div className={`relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 ${view === "list" ? "w-48 h-48 shrink-0" : "w-full"}`}>
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={16} className="text-slate-900 dark:text-white" />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {product.rating}
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${product.price}</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg text-sm font-medium hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors">
                      <ShoppingCart size={16} /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}