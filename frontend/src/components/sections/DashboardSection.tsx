'use client';

import Card from '@/components/ui/Card';
import { Activity, BarChart3, DollarSign, ShoppingCart, Sparkles, Users } from 'lucide-react';

const metrics = [
  {
    icon: DollarSign,
    label: 'Revenue',
    value: '$56.4K',
    detail: '+18.2% vs last week',
  },
  {
    icon: Users,
    label: 'Customers',
    value: '3.1K',
    detail: '+9.7% growth',
  },
  {
    icon: ShoppingCart,
    label: 'Orders',
    value: '1.14K',
    detail: '+6.4% conversion',
  },
  {
    icon: Sparkles,
    label: 'Upsell',
    value: '28%',
    detail: '+2.9 points',
  },
];

const activity = [
  {
    title: 'New subscription plan launched',
    time: '2h ago',
  },
  {
    title: 'UI component library updated',
    time: '5h ago',
  },
  {
    title: '7 new trial signups',
    time: '1d ago',
  },
];

export default function DashboardSection() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Dashboard layout</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Build responsive panels, analytics cards, and data grids.
        </h2>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
          A dashboard section designed for high-level metrics, trends, and quick actions in a modern grid layout.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      {metric.label}
                    </p>
                    <p className="text-3xl font-semibold text-slate-950 dark:text-white">{metric.value}</p>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                    <Icon size={20} />
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{metric.detail}</p>
              </Card>
            );
          })}
        </div>

        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Weekly summary</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Performance overview</h3>
            </div>
            <BarChart3 className="text-sky-500" size={28} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Conversion rate</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">12.8%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Active subscriptions</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">1,240</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Revenue breakdown</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                +22% this week
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 w-1/3 rounded-full bg-sky-500" />
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 w-1/2 rounded-full bg-sky-400" />
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 w-2/3 rounded-full bg-slate-900 dark:bg-slate-200" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Trend panel</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Live product performance</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Updated 3m ago
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">New visitors</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">8,740</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Revenue goal</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">$98.2K</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Conversion</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">7.4%</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest revenue</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">$21.7K</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Completed orders</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">842</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Returning users</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">1.8K</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Activity feed</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Recent updates</h3>
            </div>
            <Activity className="text-slate-600 dark:text-slate-300" size={24} />
          </div>
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-950">
                <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
