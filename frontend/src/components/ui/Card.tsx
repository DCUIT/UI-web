import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 dark:border-slate-800/80 dark:bg-slate-900',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

