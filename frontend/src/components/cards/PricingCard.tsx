import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const features = ['Unlimited projects', 'Team permissions', 'Priority support', 'Analytics dashboard'];

export default function PricingCard() {
  return (
    <Card className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Pro plan</p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">$49</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">per month billed annually</p>
      </div>

      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <Check className="text-sky-500" size={16} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button variant="primary">Choose plan</Button>
    </Card>
  );
}
