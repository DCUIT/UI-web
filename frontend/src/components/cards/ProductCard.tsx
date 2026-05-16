import { ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function ProductCard() {
  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>New</Badge>
          <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Modern workspace chair</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Comfortable and stylish office seating designed for long work sessions.</p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-4 text-slate-900 dark:bg-slate-800 dark:text-white">
          <ShoppingBag size={24} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Ergonomic</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Adjustable height</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Premium mesh</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Price</p>
          <p className="text-2xl font-semibold text-slate-950 dark:text-white">$249</p>
        </div>
        <Button variant="primary">Buy now</Button>
      </div>
    </Card>
  );
}
