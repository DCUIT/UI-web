'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white shadow-xl shadow-slate-950/20 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
            Build UI faster
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            UI Platform for modern React apps.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            A polished starter for Next.js with Dark Mode, responsive layout, component preview system, search, and animated UI patterns.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" href="/components">
              Explore components
            </Button>
            <Button variant="secondary" href="#templates">
              View templates
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

