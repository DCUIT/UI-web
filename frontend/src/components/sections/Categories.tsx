'use client';

import Card from '@/components/ui/Card';

const categories = [
  { key: 'All', label: 'All' },
  { key: 'UI', label: 'UI' },
  { key: 'Form', label: 'Form' },
  { key: 'Layout', label: 'Layout' },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

export default function Categories({
  value,
}: {
  value: CategoryKey;
}) {
  const title = categories.find((c) => c.key === value)?.label ?? 'All';

  return (
    <section id="categories" className="mx-auto max-w-7xl px-1">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Categories</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Filter components by category.
        </h2>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
          Current: <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const active = cat.key === value;
          return (
            <Card
              key={cat.key}
              className={
                active
                  ? 'border-sky-500/60 bg-sky-50 shadow-none dark:border-sky-400/60 dark:bg-slate-900'
                  : 'bg-white/70 dark:bg-slate-950/60'
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Category</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{cat.label}</h3>
                </div>
                <span
                  aria-hidden
                  className={
                    active
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-300'
                  }
                >
                  ✓
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

