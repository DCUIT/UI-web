import { Mail, Users } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function UserCard() {
  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar alt="Mina Lee" fallback="ML" />
        <div>
          <p className="font-bold text-slate-950 dark:text-white">Mina Lee</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Head of Product</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Team</p>
          <p className="mt-2 font-semibold text-slate-900 dark:text-white">Design</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Projects</p>
          <p className="mt-2 font-semibold text-slate-900 dark:text-white">18 active</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Mail size={16} />
          <span>mina.lee@ui-platform.com</span>
        </div>
        <Button variant="secondary">Message</Button>
      </div>
    </Card>
  );
}
