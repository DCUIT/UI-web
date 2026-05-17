import Link from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
};

const variantStyles = {
  primary: 'bg-slate-950 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200',
  secondary: 'border border-slate-300 bg-white text-slate-950 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
};

export default function Button({
  variant = 'primary',
  href,
  className,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${variantStyles[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...(props as any)}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} aria-label={ariaLabel} {...props} />;
}
