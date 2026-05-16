import Card from '@/components/ui/Card';

const templates = [
  {
    title: 'Portfolio',
    subtitle: 'A showcase-ready landing page for designers and freelancers.',
    accent: 'Personal branding',
  },
  {
    title: 'Dashboard',
    subtitle: 'Admin and analytics layout for modern web apps.',
    accent: 'Data-first UI',
  },
];

export default function Templates() {
  return (
    <section id="templates" className="mx-auto max-w-7xl">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Templates</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Ready-to-use template layouts for your next project.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.title} className="space-y-5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{template.accent}</p>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{template.title}</h3>
            <p className="text-slate-600 dark:text-slate-300">{template.subtitle}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
