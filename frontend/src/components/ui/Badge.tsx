type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
};

const badgeStyles = {
  default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200',
};

export default function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[variant]} ${className ?? ''}`} {...props} />
  );
}
