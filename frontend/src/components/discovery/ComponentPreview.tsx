'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Eye, Code as CodeIcon, ZoomIn, ZoomOut, RotateCcw, Terminal } from 'lucide-react';

type ComponentPreviewProps = {
  name: string;
  children?: React.ReactNode;
  code: string;
};

export default function ComponentPreview({ name, children, code }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(100);

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

  const openInStackBlitz = () => {
    const project = {
      title: `Master UI - ${name}`,
      description: `Interactive preview of ${name} component`,
      template: 'node' as const,
      files: {
        'index.html': `<!DOCTYPE html><html lang="en"><body><div id="root"></div></body></html>`,
        'package.json': JSON.stringify({
          name: `master-ui-${name.toLowerCase().replace(/\s+/g, '-')}`,
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            'lucide-react': 'latest',
            'framer-motion': 'latest',
            'clsx': 'latest',
            'tailwind-merge': 'latest',
            'tailwindcss': 'latest',
            'postcss': 'latest',
            'autoprefixer': 'latest'
          }
        }, null, 2),
        'App.tsx': prettyCode,
        'index.tsx': `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './style.css';\n\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);`,
        'style.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
        'tailwind.config.js': `module.exports = { content: ["./**/*.{ts,tsx}"], theme: { extend: {} }, plugins: [] };`,
      }
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://stackblitz.com/run?file=App.tsx';
    form.target = '_blank';

    Object.entries(project.files).forEach(([path, content]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = `project[files][${path}]`;
      input.value = content;
      form.appendChild(input);
    });

    const configFields = ['title', 'description', 'template'];
    configFields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = `project[${field}]`;
      input.value = project[field as keyof typeof project] as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="group relative my-8 flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{name}</h3>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={openInStackBlitz}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:bg-white hover:text-indigo-600 hover:shadow-sm dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            title="Open in StackBlitz"
          >
            <Terminal size={14} />
            <span className="hidden sm:inline">Playground</span>
          </button>
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Zoom Controls - Only visible in Preview tab */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-1 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1.5 text-slate-500 hover:text-indigo-600 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[10px] font-bold tabular-nums text-slate-400 w-8 text-center">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-1.5 text-slate-500 hover:text-indigo-600 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <button
                type="button"
                onClick={() => setZoom(100)}
                className="ml-1 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          )}
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
              <motion.div 
                style={{ scale: zoom / 100 }} 
                className="origin-center transition-transform duration-200"
              >
                {children}
              </motion.div>
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
