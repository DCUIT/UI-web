'use client';

import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Reusable components',
    description: 'Build consistent UIs with reusable buttons, cards, forms, and layout pieces.',
  },
  {
    title: 'Dark mode support',
    description: 'Switch themes instantly with next-themes and system-friendly styling.',
  },
  {
    title: 'Component preview system',
    description: 'Browse components, inspect source, and copy code snippets from a dedicated page.',
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Platform features</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Everything you need to build beautiful interface previews.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

