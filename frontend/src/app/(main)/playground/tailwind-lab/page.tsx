'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Type, PaintBucket,
  ArrowLeftRight, Info, RotateCcw, Code2, Square
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Tooltip from '@/components/ui/Tooltip';

type CategoryId = 'layout' | 'spacing' | 'sizing' | 'typography' | 'background' | 'border';

interface ClassOption {
  value: string;
  label: string;
  explanation: string;
}

interface ControlGroup {
  id: string;
  label: string;
  icon: typeof Layout;
  options: ClassOption[];
  defaultValue: string;
}

const controlGroups: Record<CategoryId, ControlGroup[]> = {
  layout: [
    {
      id: 'display', label: 'Display', icon: Layout,
      options: [
        { value: 'block', label: 'Block', explanation: 'Element is displayed as a block-level element, taking full width available.' },
        { value: 'flex', label: 'Flex', explanation: 'Enables flexbox — children align along the main axis with flexible sizing.' },
        { value: 'grid', label: 'Grid', explanation: 'Enables CSS Grid — children align in a 2D grid layout.' },
        { value: 'hidden', label: 'Hidden', explanation: 'Element is removed from the layout entirely (display: none).' },
      ],
      defaultValue: 'flex'
    },
    {
      id: 'flexDirection', label: 'Flex Direction', icon: ArrowLeftRight,
      options: [
        { value: 'flex-row', label: 'Row', explanation: 'Children are laid out left to right (default flex direction).' },
        { value: 'flex-col', label: 'Column', explanation: 'Children are laid out top to bottom.' },
        { value: 'flex-row-reverse', label: 'Row Reverse', explanation: 'Children are laid out right to left.' },
        { value: 'flex-col-reverse', label: 'Col Reverse', explanation: 'Children are laid out bottom to top.' },
      ],
      defaultValue: 'flex-row'
    },
    {
      id: 'alignItems', label: 'Align Items', icon: Layout,
      options: [
        { value: 'items-start', label: 'Start', explanation: 'Children align to the top/left of the cross axis.' },
        { value: 'items-center', label: 'Center', explanation: 'Children are centered along the cross axis.' },
        { value: 'items-end', label: 'End', explanation: 'Children align to the bottom/right of the cross axis.' },
        { value: 'items-stretch', label: 'Stretch', explanation: 'Children stretch to fill the container along the cross axis.' },
      ],
      defaultValue: 'items-center'
    },
    {
      id: 'justifyContent', label: 'Justify Content', icon: Layout,
      options: [
        { value: 'justify-start', label: 'Start', explanation: 'Children pack toward the start of the main axis.' },
        { value: 'justify-center', label: 'Center', explanation: 'Children are centered along the main axis.' },
        { value: 'justify-end', label: 'End', explanation: 'Children pack toward the end of the main axis.' },
        { value: 'justify-between', label: 'Between', explanation: 'First and last children flush to edges; equal space between.' },
        { value: 'justify-around', label: 'Around', explanation: 'Equal space around each child (edges get half spacing).' },
      ],
      defaultValue: 'justify-center'
    },
  ],
  spacing: [
    {
      id: 'gap', label: 'Gap', icon: Square,
      options: [
        { value: 'gap-0', label: '0', explanation: 'No gap (0px) between children.' },
        { value: 'gap-1', label: '4px', explanation: '4px (0.25rem) gap between children.' },
        { value: 'gap-2', label: '8px', explanation: '8px (0.5rem) gap between children.' },
        { value: 'gap-4', label: '16px', explanation: '16px (1rem) gap between children.' },
        { value: 'gap-8', label: '32px', explanation: '32px (2rem) gap between children.' },
        { value: 'gap-16', label: '64px', explanation: '64px (4rem) gap between children.' },
      ],
      defaultValue: 'gap-4'
    },
    {
      id: 'padding', label: 'Padding', icon: Square,
      options: [
        { value: 'p-0', label: '0', explanation: 'No padding (0px) on all sides.' },
        { value: 'p-2', label: '8px', explanation: '8px (0.5rem) padding on all sides.' },
        { value: 'p-4', label: '16px', explanation: '16px (1rem) padding on all sides.' },
        { value: 'p-8', label: '32px', explanation: '32px (2rem) padding on all sides.' },
        { value: 'p-16', label: '64px', explanation: '64px (4rem) padding on all sides.' },
      ],
      defaultValue: 'p-4'
    },
  ],
  sizing: [
    {
      id: 'width', label: 'Width', icon: Square,
      options: [
        { value: 'w-auto', label: 'Auto', explanation: 'Width is determined by content.' },
        { value: 'w-1/2', label: '50%', explanation: 'Width is 50% of the parent container.' },
        { value: 'w-64', label: '256px', explanation: 'Fixed width of 256px (16rem).' },
        { value: 'w-full', label: 'Full', explanation: 'Width is 100% of the parent container.' },
      ],
      defaultValue: 'w-full'
    },
    {
      id: 'height', label: 'Height', icon: Square,
      options: [
        { value: 'h-auto', label: 'Auto', explanation: 'Height is determined by content.' },
        { value: 'h-32', label: '128px', explanation: 'Fixed height of 128px (8rem).' },
        { value: 'h-64', label: '256px', explanation: 'Fixed height of 256px (16rem).' },
        { value: 'h-full', label: 'Full', explanation: 'Height is 100% of the parent container.' },
      ],
      defaultValue: 'h-auto'
    },
  ],
  typography: [
    {
      id: 'textSize', label: 'Text Size', icon: Type,
      options: [
        { value: 'text-xs', label: 'XS', explanation: 'Extra small text (12px). Great for labels and captions.' },
        { value: 'text-sm', label: 'SM', explanation: 'Small text (14px). Standard for body copy in compact UIs.' },
        { value: 'text-base', label: 'Base', explanation: 'Base text (16px). Default paragraph size.' },
        { value: 'text-lg', label: 'LG', explanation: 'Large text (18px). Good for subheadings.' },
        { value: 'text-2xl', label: '2XL', explanation: 'Extra extra large text (24px). Suitable for section headings.' },
      ],
      defaultValue: 'text-base'
    },
    {
      id: 'fontWeight', label: 'Font Weight', icon: Type,
      options: [
        { value: 'font-normal', label: 'Normal', explanation: 'Normal weight (400). Standard body text weight.' },
        { value: 'font-medium', label: 'Medium', explanation: 'Medium weight (500). Slightly bolder emphasis.' },
        { value: 'font-semibold', label: 'Semibold', explanation: 'Semibold (600). Strong emphasis without being heavy.' },
        { value: 'font-bold', label: 'Bold', explanation: 'Bold weight (700). Clear heading weight.' },
      ],
      defaultValue: 'font-semibold'
    },
    {
      id: 'textAlign', label: 'Text Align', icon: Layout,
      options: [
        { value: 'text-left', label: 'Left', explanation: 'Text aligns to the left edge (default for LTR).' },
        { value: 'text-center', label: 'Center', explanation: 'Text is centered horizontally.' },
        { value: 'text-right', label: 'Right', explanation: 'Text aligns to the right edge.' },
      ],
      defaultValue: 'text-left'
    },
  ],
  background: [
    {
      id: 'bgColor', label: 'Background', icon: PaintBucket,
      options: [
        { value: 'bg-white', label: 'White', explanation: 'White background. Clean, default card style.' },
        { value: 'bg-slate-100', label: 'Slate 100', explanation: 'Light slate gray. Subtle background variation.' },
        { value: 'bg-slate-900', label: 'Slate 900', explanation: 'Dark slate. Used for dark mode containers.' },
        { value: 'bg-indigo-500', label: 'Indigo 500', explanation: 'Indigo accent. Primary brand color.' },
        { value: 'bg-emerald-500', label: 'Emerald 500', explanation: 'Emerald green. Success/positive state.' },
      ],
      defaultValue: 'bg-white'
    },
    {
      id: 'rounded', label: 'Rounded', icon: PaintBucket,
      options: [
        { value: 'rounded-none', label: 'None', explanation: 'Sharp corners (border-radius: 0px).' },
        { value: 'rounded-md', label: 'MD', explanation: 'Medium rounded corners (6px). Standard card radius.' },
        { value: 'rounded-xl', label: 'XL', explanation: 'Extra large rounded corners (12px). Modern, friendly.' },
        { value: 'rounded-2xl', label: '2XL', explanation: 'Extra extra large rounded corners (16px). Soft UI style.' },
        { value: 'rounded-full', label: 'Full', explanation: 'Fully rounded (9999px). Pill or circle shapes.' },
      ],
      defaultValue: 'rounded-xl'
    },
  ],
  border: [
    {
      id: 'border', label: 'Border', icon: Square,
      options: [
        { value: 'border-0', label: 'None', explanation: 'No border.' },
        { value: 'border', label: '1px', explanation: '1px solid border on all sides.' },
        { value: 'border-2', label: '2px', explanation: '2px solid border on all sides.' },
        { value: 'border-4', label: '4px', explanation: '4px solid border on all sides.' },
      ],
      defaultValue: 'border'
    },
    {
      id: 'borderColor', label: 'Border Color', icon: Square,
      options: [
        { value: 'border-slate-200', label: 'Slate 200', explanation: 'Light gray border. Default divider color.' },
        { value: 'border-indigo-500', label: 'Indigo 500', explanation: 'Indigo border. Matches brand accent.' },
        { value: 'border-red-500', label: 'Red 500', explanation: 'Red border. Error or destructive state.' },
      ],
      defaultValue: 'border-slate-200'
    },
  ],
};

type ControlValues = Record<string, string>;

function getDefaultValues(): ControlValues {
  const values: ControlValues = {};
  for (const _cat of Object.keys(controlGroups)) {
    const cat = _cat as CategoryId;
    for (const group of controlGroups[cat]) {
      values[group.id] = group.defaultValue;
    }
  }
  return values;
}

function getGroupedValues(values: ControlValues): string {
  const classes: string[] = [];
  for (const _cat of Object.keys(controlGroups)) {
    const cat = _cat as CategoryId;
    for (const group of controlGroups[cat]) {
      const val = values[group.id];
      if (val && val !== group.defaultValue) {
        classes.push(val);
      }
    }
  }
  return classes.join(' ');
}

interface Explanation {
  groupId: string;
  option: ClassOption;
}

export default function TailwindLabPage() {
  const [values, setValues] = useState<ControlValues>(getDefaultValues);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('layout');
  const [lastChange, setLastChange] = useState<Explanation | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (groupId: string, option: ClassOption) => {
    setValues(prev => ({ ...prev, [groupId]: option.value }));
    setLastChange({ groupId, option });
  };

  const resetAll = () => {
    setValues(getDefaultValues());
    setLastChange(null);
  };

  const changedClasses = useMemo(() => {
    const list: { group: ControlGroup; value: string; option: ClassOption }[] = [];
    for (const _cat of Object.keys(controlGroups)) {
      const cat = _cat as CategoryId;
      for (const group of controlGroups[cat]) {
        const val = values[group.id];
        const option = group.options.find(o => o.value === val);
        if (option && val !== group.defaultValue) {
          list.push({ group, value: val, option });
        }
      }
    }
    return list;
  }, [values]);

  const previewClasses = useMemo(() => {
    const all: string[] = [];
    for (const _cat of Object.keys(controlGroups)) {
      const cat = _cat as CategoryId;
      for (const group of controlGroups[cat]) {
        all.push(values[group.id]);
      }
    }
    return all.join(' ');
  }, [values]);

  const sampleItemClasses = cn(
    'h-12 rounded-lg bg-indigo-500 text-white font-bold flex items-center justify-center text-sm transition-all duration-300',
    values.display === 'flex' || values.display === 'grid' ? 'min-w-[80px]' : 'w-full'
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Category Groups */}
      <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Layout className="w-3.5 h-3.5" /> Categories
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {(Object.keys(controlGroups) as CategoryId[]).map(cat => {
            const Icon = cat === 'layout' ? Layout : cat === 'spacing' ? Square : cat === 'sizing' ? Layout : cat === 'typography' ? Type : cat === 'background' ? PaintBucket : Square;
            const groupCount = controlGroups[cat].length;
            const activeCount = controlGroups[cat].filter(g => values[g.id] !== g.defaultValue).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left transition-all flex items-center gap-2",
                  activeCategory === cat
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold capitalize">{cat}</p>
                  <p className="text-[10px] text-slate-400">{activeCount}/{groupCount} active</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Preview */}
        <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
          <div className={cn(
            'transition-all duration-300',
            values.display === 'hidden' && 'opacity-20 scale-95'
          )}>
            <div ref={previewRef} className={cn(previewClasses, 'transition-all duration-300 min-h-[200px]')}>
              <div className={sampleItemClasses}>1</div>
              <div className={cn(sampleItemClasses, 'bg-emerald-500')}>2</div>
              <div className={cn(sampleItemClasses, 'bg-amber-500')}>3</div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 capitalize">{activeCategory}</h3>
            {lastChange && (
              <motion.div
                key={lastChange.option.value}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full px-2.5 py-0.5"
              >
                <Info className="w-3 h-3" />
                <span>.{lastChange.option.value}</span>
                <span className="text-slate-300 dark:text-slate-600">&mdash;</span>
                <span>{lastChange.option.explanation}</span>
              </motion.div>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-1">
            {controlGroups[activeCategory].map(group => (
              <div key={group.id} className="shrink-0 space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{group.label}</p>
                <div className="flex gap-1">
                  {group.options.map(opt => {
                    const isActive = values[group.id] === opt.value;
                    return (
                      <Tooltip key={opt.value} label={opt.explanation}>
                        <button
                          onClick={() => handleChange(group.id, opt)}
                          className={cn(
                            "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border",
                            isActive
                              ? "bg-indigo-500 text-white border-indigo-500 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                          )}
                        >
                          {opt.label}
                        </button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Changed classes summary */}
          {changedClasses.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <Code2 className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Active Classes</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {changedClasses.map(({ group, option }) => (
                  <span key={group.id} className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/20 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {option.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
