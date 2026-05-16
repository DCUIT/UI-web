type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export default function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-3 text-sm font-medium ${className ?? ''}`}>
      <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition dark:bg-slate-700">
        <input
          type="checkbox"
          {...props}
          className="peer sr-only"
        />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5 peer-checked:bg-sky-500" />
      </span>
      {label}
    </label>
  );
}
