type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return <div {...props} className={`animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800 ${className ?? ''}`} />;
}
