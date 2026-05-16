import { useState } from 'react';

type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  activeValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function Tabs({ items, activeValue, onValueChange, className }: TabsProps) {
  const [current, setCurrent] = useState(activeValue ?? items[0]?.value);
  const value = activeValue ?? current;

  function handleChange(selected: string) {
    if (onValueChange) {
      onValueChange(selected);
    }
    setCurrent(selected);
  }

  return (
    <div className={className}>
      <div className="mb-4 inline-flex overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleChange(item.value)}
            className={`px-4 py-3 text-sm font-semibold transition ${value === item.value ? 'bg-slate-950 text-white dark:bg-slate-200 dark:text-slate-950' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        {items.find((item) => item.value === value)?.content}
      </div>
    </div>
  );
}
