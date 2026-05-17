import { Clock3 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function BlogCard() {
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="success">Article</Badge>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">5 min read</span>
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Design systems for modern products</h3>
        <p className="mt-2 leading-6 text-slate-600 dark:text-slate-400">How to create reusable cards, lists, and pages that scale across teams and brands.</p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <Avatar alt="Jules" fallback="JB" />
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">Jules Bennett</p>
            <p className="text-slate-500 dark:text-slate-400">Product writer</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Clock3 size={14} />
          <span>Mar 18, 2026</span>
        </div>
      </div>
    </Card>
  );
}
