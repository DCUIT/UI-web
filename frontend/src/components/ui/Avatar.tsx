import { cn } from '@/lib/utils';

type AvatarProps = {
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
};

export default function Avatar({ src, alt, className, fallback }: AvatarProps) {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={cn('h-12 w-12 rounded-full object-cover', className)}
    />
  ) : (
    <div className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100', className)}>
      {fallback ?? alt.slice(0, 2).toUpperCase()}
    </div>
  );
}
