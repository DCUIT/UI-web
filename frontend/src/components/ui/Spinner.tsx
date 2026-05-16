type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      {...props}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin dark:border-slate-700 dark:border-t-white ${className ?? ''}`}
    />
  );
}
