import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 px-8 py-16 text-white shadow-2xl shadow-slate-950/20 sm:px-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Ready to ship</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Launch your UI platform with confidence.
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Use the built-in preview system, copy code snippets instantly, and maintain a polished dark mode experience across every page.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl bg-slate-900 p-8 text-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Next step</p>
          <p className="text-lg font-semibold">Explore the component library or deploy to Vercel.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/components" variant="primary" className="w-full sm:w-auto">
              Open components
            </Button>
            <Button href="https://vercel.com" variant="secondary" className="w-full sm:w-auto">
              Deploy now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
