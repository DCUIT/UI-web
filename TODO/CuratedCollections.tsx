'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const collections = [
  {
    id: 'landing-page-kit',
    title: 'Landing Page Kit',
    description: 'A complete set of sections to build high-converting marketing pages in minutes.',
    icon: Rocket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    components: ['Hero Section', 'Features Grid', 'Pricing Table', 'FAQ Section', 'Footer'],
    difficulty: 'Medium'
  },
  {
    id: 'dashboard-kit',
    title: 'SaaS Dashboard Kit',
    description: 'The foundation for your next admin panel or internal tool with data-rich views.',
    icon: LayoutTemplate,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    components: ['Sidebar Navigation', 'Global Navbar', 'Analytics Stats', 'Data Table', 'User Profile Card'],
    difficulty: 'Hard'
  },
  {
    id: 'auth-kit',
    title: 'Authentication Kit',
    description: 'Beautifully crafted forms for login, registration, and password recovery workflows.',
    icon: Rocket, // Or a Shield/Lock icon if available
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    components: ['Login Form', 'Registration Form', 'Forgot Password', 'Social Auth Buttons', 'OTP Input'],
    difficulty: 'Easy'
  }
];

export default function CuratedCollections() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div className={cn("rounded-2xl p-4", collection.bgColor)}>
              <collection.icon className={cn("h-8 w-8", collection.color)} />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
              collection.difficulty === 'Hard' 
                ? "border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-900/50 dark:text-amber-400 dark:bg-amber-900/20"
                : "border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-900/50 dark:text-emerald-400 dark:bg-emerald-900/20"
            )}>
              {collection.difficulty}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {collection.title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
              {collection.description}
            </p>
          </div>

          <div className="mt-8 flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Included Components</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {collection.components.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800" />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold dark:border-slate-900 dark:bg-slate-800">
                +5
              </div>
            </div>
            <Button variant="primary" className="rounded-full">
              Explore Kit <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}