type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export default function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-3 text-sm font-medium ${className ?? ''}`}>
      <input
        type="radio"
        {...props}
        className="h-5 w-5 rounded-full border border-slate-300 bg-white text-sky-600 transition focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-slate-700"
      />
      {label}
    </label>
  );
}
