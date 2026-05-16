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
          <p className="text-lg font-semibold text-slate-950 dark:text-white">Mina Lee</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Head of Product</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Team</p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">Design</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Projects</p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">18 active</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Mail size={16} />
          <span>mina.lee@ui-platform.com</span>
        </div>
        <Button variant="secondary">Message</Button>
      </div>
    </Card>
  );
}
