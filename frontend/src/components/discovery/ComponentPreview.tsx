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
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  // Chuẩn hóa dữ liệu files
  const displayFiles: FileInfo[] = files || (code ? [{ name: 'index.tsx', code, language: 'typescript' }] : []);
  const activeFile = displayFiles[activeFileIndex];

  const copyToClipboard = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPreviewWidth = () => {
    switch (responsiveMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="group relative my-8 flex flex-col space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">{name}</h3>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Responsive Toggles */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button onClick={() => setResponsiveMode('desktop')} className={cn("p-1.5 rounded-md transition-all", responsiveMode === 'desktop' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Monitor size={14} /></button>
            <button onClick={() => setResponsiveMode('tablet')} className={cn("p-1.5 rounded-md transition-all", responsiveMode === 'tablet' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Tablet size={14} /></button>
            <button onClick={() => setResponsiveMode('mobile')} className={cn("p-1.5 rounded-md transition-all", responsiveMode === 'mobile' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Smartphone size={14} /></button>
          </div>

          {/* Preview Theme Switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button onClick={() => setPreviewTheme('light')} className={cn("p-1.5 rounded-md transition-all", previewTheme === 'light' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Sun size={14} /></button>
            <button onClick={() => setPreviewTheme('dark')} className={cn("p-1.5 rounded-md transition-all", previewTheme === 'dark' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Moon size={14} /></button>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button onClick={() => setActiveTab('preview')} className={cn("flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all rounded-md", activeTab === 'preview' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><Eye size={14} /> Preview</button>
            <button onClick={() => setActiveTab('code')} className={cn("flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all rounded-md", activeTab === 'code' ? "bg-white shadow-sm text-indigo-600 dark:bg-slate-800" : "text-slate-500")}><CodeIcon size={14} /> Code</button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex h-full min-h-[400px] w-full items-center justify-center p-8 transition-all duration-300 mx-auto",
                getPreviewWidth(),
                previewTheme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50/50'
              )}
            >
              <div className="w-full h-full flex items-center justify-center">{children}</div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col bg-slate-950"
            >
              {/* File Tabs */}
              {displayFiles.length > 1 && (
                <div className="flex items-center gap-1 border-b border-white/10 px-4 py-2">
                  {displayFiles.map((file, idx) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveFileIndex(idx)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                        activeFileIndex === idx 
                          ? "bg-white/10 text-white" 
                          : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <FileCode size={12} />
                      {file.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Code Content */}
              <div className={cn(
                "relative overflow-hidden transition-all duration-500",
                !isExpanded ? "max-h-[400px]" : "max-h-none"
              )}>
                <button
                  onClick={copyToClipboard}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 backdrop-blur hover:text-white transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                
                <pre className="p-6 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto">
                  <code>{activeFile?.code}</code>
                </pre>

                {!isExpanded && (activeFile?.code.split('\n').length > 15) && (
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Expand Toggle */}
              {(activeFile?.code.split('\n').length > 15) && (
                <div className="flex justify-center border-t border-white/10 py-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {isExpanded ? (
                      <>Collapse <ChevronUp size={14} /></>
                    ) : (
                      <>Expand <ChevronDown size={14} /></>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
