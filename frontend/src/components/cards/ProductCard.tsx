import { ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function ProductCard() {
  return (
    <Card className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Badge>New</Badge>
          <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 dark:text-white">Modern workspace chair</h3>
          <p className="mt-2 leading-6 text-slate-600 dark:text-slate-400">Comfortable and stylish office seating designed for long work sessions.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-4 text-slate-900 dark:bg-slate-800 dark:text-white">
          <ShoppingBag size={24} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">Ergonomic</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">Adjustable height</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">Premium mesh</span>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Price</p>
          <p className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">$249</p>
        </div>
        <Button variant="primary">Buy now</Button>
      </div>
    </Card>
  );
}
