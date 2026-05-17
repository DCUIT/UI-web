"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity 
} from "lucide-react"

const stats = [
  { name: "Total Revenue", value: "$45,231.89", diff: "+20.1%", trend: "up", icon: DollarSign },
  { name: "Subscriptions", value: "+2350", diff: "+180.1%", trend: "up", icon: Users },
  { name: "Sales", value: "+12,234", diff: "+19%", trend: "up", icon: ShoppingCart },
  { name: "Active Now", value: "+573", diff: "+201 since last hour", trend: "up", icon: Activity },
]

const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
]

export default function DashboardTemplate() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400">Welcome back to your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
              <stat.icon className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</h3>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              <span className="text-emerald-500 font-medium">{stat.diff}</span> from last month
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <h3 className="font-semibold text-slate-950 dark:text-white">Overview</h3>
          <div className="mt-4 h-[300px] w-full rounded-lg bg-slate-50 dark:bg-slate-900/50 flex items-end justify-around p-4 gap-2">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 55, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="w-full rounded-t-sm bg-indigo-500 dark:bg-indigo-600 opacity-80"
              />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Table */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-950 dark:text-white">Recent Sales</h3>
            <p className="text-sm text-slate-500">You made 265 sales this month.</p>
          </div>
          <div className="mt-6 space-y-6">
            {recentSales.map((sale) => (
              <div key={sale.email} className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-medium text-slate-600 dark:text-slate-300">
                  {sale.name.charAt(0)}
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-950 dark:text-white">{sale.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{sale.email}</p>
                </div>
                <div className="ml-auto font-medium text-slate-950 dark:text-white">
                  {sale.amount}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}