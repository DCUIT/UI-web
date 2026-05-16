import { Clock3 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function BlogCard() {
  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="success">Article</Badge>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">5 min read</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Design systems for modern products</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">How to create reusable cards, lists, and pages that scale across teams and brands.</p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        <div className="flex items-center gap-3">
          <Avatar alt="Jules" fallback="JB" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Jules Bennett</p>
            <p>Product writer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          <span>Mar 18, 2026</span>
        </div>
      </div>
    </Card>
  );
}
