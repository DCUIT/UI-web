import { Activity, Clock3, UserCheck } from 'lucide-react';
import Card from '@/components/ui/Card';

const metrics = [
  { label: 'Revenue', value: '$42.3K', icon: Activity },
  { label: 'Customers', value: '1.2K', icon: UserCheck },
  { label: 'Average session', value: '4m 23s', icon: Clock3 },
];

export default function DashboardCard() {
  return (
    <Card className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Overview</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Weekly dashboard</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800/80 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className="mt-1 text-xl font-bold text-slate-950 dark:text-white">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
