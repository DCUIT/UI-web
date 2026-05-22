'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Puzzle, Accessibility, ThumbsUp, ListChecks,
  ChevronDown, Code2, CheckCircle2, XCircle, MinusCircle,
  Lightbulb, Ban, FlaskConical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComponentRegistryItem } from '@/lib/registry';

interface Props {
  component: ComponentRegistryItem;
  onApplyCode?: (code: string) => void;
}

type Tab = 'anatomy' | 'accessibility' | 'best-practices' | 'recipes';

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: 'anatomy', label: 'Anatomy', icon: Puzzle },
  { id: 'accessibility', label: 'A11y', icon: Accessibility },
  { id: 'best-practices', label: 'Best Practices', icon: ThumbsUp },
  { id: 'recipes', label: 'Recipes', icon: FlaskConical },
];

export default function ComponentEncyclopedia({ component, onApplyCode }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('anatomy');

  return (
    <section className="space-y-3" aria-label="Component Encyclopedia">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-emerald-600" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Encyclopedia</h2>
      </div>

      <div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                activeTab === tab.id
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              )}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.12 }}
          className="space-y-2"
        >
          {activeTab === 'anatomy' && <AnatomyTab parts={component.anatomy} />}
          {activeTab === 'accessibility' && <A11yTab items={component.accessibility} />}
          {activeTab === 'best-practices' && <BestPracticesTab items={component.bestPractices} />}
          {activeTab === 'recipes' && <RecipesTab items={component.recipes} onApply={onApplyCode} />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function AnatomyTab({ parts }: { parts: ComponentRegistryItem['anatomy'] }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
      {parts.map((part, i) => (
        <div key={i} className="flex items-start gap-3 px-3 py-2">
          <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <div className="min-w-0">
            <code className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 break-all">{part.selector}</code>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{part.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function A11yTab({ items }: { items: ComponentRegistryItem['accessibility'] }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 px-3 py-2">
          {item.status === 'pass' ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
          ) : item.status === 'fail' ? (
            <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
          ) : (
            <MinusCircle className="w-4 h-4 mt-0.5 shrink-0 text-slate-300 dark:text-slate-600" />
          )}
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{item.criteria}</p>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-wider",
              item.status === 'pass' ? "text-emerald-500" :
              item.status === 'fail' ? "text-red-500" : "text-slate-400"
            )}>
              {item.status === 'pass' ? 'Pass' : item.status === 'fail' ? 'Fail' : 'N/A'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BestPracticesTab({ items }: { items: ComponentRegistryItem['bestPractices'] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
            <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{item.do}</p>
          </div>
          {item.dont && (
            <div className="flex items-start gap-2">
              <Ban className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
              <p className="text-[11px] text-red-500 dark:text-red-400">{item.dont}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RecipesTab({ items, onApply }: { items: ComponentRegistryItem['recipes']; onApply?: (code: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
      {items.map((recipe, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex-1">{recipe.title}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 space-y-2">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{recipe.description}</p>
                    {recipe.code && (
                      <div className="relative group/code">
                        <div className="rounded-lg bg-slate-950 p-2.5">
                          <code className="text-[10px] font-mono text-emerald-400 leading-relaxed block whitespace-pre-wrap">{recipe.code}</code>
                        </div>
                        {onApply && (
                          <button
                            onClick={() => onApply(recipe.code || '')}
                            className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded"
                          >
                            Apply to App.tsx
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
