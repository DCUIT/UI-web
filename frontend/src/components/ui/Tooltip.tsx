type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

export default function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full rounded-2xl border border-slate-200 bg-slate-950 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-200 dark:text-slate-950">
        {label}
      </div>
    </div>
  );
}
