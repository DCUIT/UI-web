import Card from '@/components/ui/Card';

const plans = [
  {
    title: 'Starter',
    price: 'Free',
    description: 'A lightweight setup for exploration and prototypes.',
    features: ['Basic components', 'Responsive layout', 'Dark mode'],
  },
  {
    title: 'Growth',
    price: '$29',
    description: 'Perfect for teams building reusable interface systems.',
    features: ['Component previews', 'Code copy', 'Search + filters'],
  },
  {
    title: 'Scale',
    price: '$79',
    description: 'A polished starter for product UI systems and dashboards.',
    features: ['Advanced templates', 'Animation support', 'Design consistency'],
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Pricing plans</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Choose the right plan for your UI workflow.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.title} className="space-y-6 p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{plan.title}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{plan.price}</p>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{plan.description}</p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

