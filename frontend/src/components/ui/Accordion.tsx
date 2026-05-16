import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="mb-3 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              <span>{item.title}</span>
              <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen ? <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
