type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-slate-700 ${className ?? ''}`}
    >
      {children}
    </select>
  );
}
