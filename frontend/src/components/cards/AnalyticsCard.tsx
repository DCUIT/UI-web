import { BarChart3, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';

const stats = [
  { label: 'Conversion', value: '18.4%', change: '+2.1%' },
  { label: 'Sessions', value: '14.8K', change: '+4.7%' },
  { label: 'Revenue', value: '$16.2K', change: '+6.3%' },
];

export default function AnalyticsCard() {
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Analytics</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Performance report</h3>
        </div>
        <BarChart3 className="text-slate-700 dark:text-slate-200" size={28} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.change} <TrendingUp className="inline-block align-text-bottom" size={14} /></p>
          </div>
        ))}
      </div>
    </Card>
  );
}
