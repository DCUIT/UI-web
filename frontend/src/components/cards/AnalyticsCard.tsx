import { BarChart3, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';

const stats = [
  { label: 'Conversion', value: '18.4%', change: '+2.1%' },
  { label: 'Sessions', value: '14.8K', change: '+4.7%' },
  { label: 'Revenue', value: '$16.2K', change: '+6.3%' },
];

export default function AnalyticsCard() {
  return (
    <Card className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Analytics</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Performance report</h3>
        </div>
        <BarChart3 className="flex-shrink-0 text-slate-700 dark:text-slate-300" size={24} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800/80 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{item.value}</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              <span>{item.change}</span>
              <TrendingUp size={14} className="flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
