import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type DropdownItem = {
  label: string;
  onSelect: () => void;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  className?: string;
};

export default function Dropdown({ label, items, className }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-flex text-sm ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open ? (
        <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onSelect();
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
