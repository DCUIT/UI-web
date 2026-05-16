type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <a href={item.href} className="font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {item.label}
              </a>
            ) : (
              <span className="font-semibold text-slate-950 dark:text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
