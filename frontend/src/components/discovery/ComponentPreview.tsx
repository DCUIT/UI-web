'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Eye, Code as CodeIcon } from 'lucide-react';

type ComponentPreviewProps = {
  name: string;
  children?: React.ReactNode;
  code: string;
};

export default function ComponentPreview({ name, children, code }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const prettyCode = useMemo(() => code ?? '', [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prettyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="group relative my-8 flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{name}</h3>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Eye size={14} /> Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <CodeIcon size={14} /> Code
          </button>
        </div>
      </div>

      <div className="relative min-h-[350px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-full min-h-[350px] items-center justify-center p-8"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative h-full min-h-[350px] bg-slate-950 p-6 font-mono text-sm text-slate-300"
            >
              <button
                type="button"
                onClick={copyToClipboard}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
              <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
                <code>{prettyCode}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

