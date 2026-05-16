import { Activity, Clock3, UserCheck } from 'lucide-react';
import Card from '@/components/ui/Card';

const metrics = [
  { label: 'Revenue', value: '$42.3K', icon: Activity },
  { label: 'Customers', value: '1.2K', icon: UserCheck },
  { label: 'Average session', value: '4m 23s', icon: Clock3 },
];

export default function DashboardCard() {
  return (
    <Card className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Overview</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Weekly dashboard</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-950">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-xl font-semibold">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
