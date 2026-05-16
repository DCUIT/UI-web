import Link from 'next/link';

const navItems = [
  { href: '/components', label: 'Components' },
  { href: '/components?category=UI', label: 'UI' },
  { href: '/components?category=Form', label: 'Forms' },
  { href: '/components?category=Navigation', label: 'Navigation' },
  { href: '/templates', label: 'Templates' },
];

export default function Sidebar() {
  return (
    <nav className="sticky top-20 w-full">      
      <div className="space-y-3">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Browse</div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Quick links</p>
        <div className="mt-3 flex flex-col gap-2 px-2">
          <Link href="/components" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300">All components</Link>
          <Link href="/components?category=UI" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300">UI</Link>
        </div>
      </div>
    </nav>
  );
}
