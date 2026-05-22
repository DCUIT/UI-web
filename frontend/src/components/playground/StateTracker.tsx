'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, X, Trash2, Eye, EyeOff,
  ChevronDown, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StateEntry {
  key: string;
  value: string;
  timestamp: number;
}

interface StateTrackerProps {
  states: Record<string, any>;
  className?: string;
}

export default function StateTracker({ states, className }: StateTrackerProps) {
  const [history, setHistory] = useState<StateEntry[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const prevRef = useRef<Record<string, any>>({});
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;

    const changes: StateEntry[] = [];
    const prev = prevRef.current;

    for (const key of Object.keys(states)) {
      const current = JSON.stringify(states[key]);
      const previous = JSON.stringify(prev[key]);

      if (previous !== undefined && current !== previous) {
        changes.push({ key, value: current, timestamp: Date.now() });
      }
      prev[key] = states[key];
    }

    if (changes.length > 0) {
      setHistory(h => [...changes.reverse(), ...h].slice(0, 100));
    }
  }, [states, paused]);

  useEffect(() => {
    if (listRef.current && !paused) {
      listRef.current.scrollTop = 0;
    }
  }, [history, paused]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    prevRef.current = {};
  }, []);

  return (
    <div className={cn("rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Activity className="w-3.5 h-3.5 text-indigo-500" />
          State Tracker
          <span className="text-[9px] text-slate-400 font-normal">({history.length})</span>
          <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPaused(!paused)}
            className={cn("p-1 rounded transition-colors", paused ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800')}
            title={paused ? 'Resume tracking' : 'Pause tracking'}
          >
            {paused ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>
          <button onClick={clearHistory} className="p-1 rounded text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Clear history">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="overflow-hidden"
          >
            <div ref={listRef} className="max-h-48 overflow-y-auto p-2 space-y-0.5">
              {history.length === 0 ? (
                <p className="text-[10px] text-slate-400 text-center py-3 italic">
                  {paused ? 'Tracking paused' : 'Interact with controls to see state changes...'}
                </p>
              ) : (
                history.map((entry, i) => (
                  <div key={`${entry.key}-${entry.timestamp}-${i}`} className="flex items-start gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-[10px] font-mono">
                    <span className="text-indigo-500 font-bold shrink-0">{entry.key}</span>
                    <span className="text-slate-300 dark:text-slate-600 shrink-0">→</span>
                    <span className="text-emerald-600 dark:text-emerald-400 break-all min-w-0">{entry.value.length > 60 ? entry.value.substring(0, 60) + '...' : entry.value}</span>
                    <span className="text-slate-300 dark:text-slate-600 shrink-0 ml-auto flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
