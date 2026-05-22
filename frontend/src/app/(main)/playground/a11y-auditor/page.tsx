'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility, AlertTriangle, CheckCircle2, XCircle,
  Info, Code2, Eye, FileCode, ChevronDown, Copy, Check,
  AlertCircle, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import { generateEntryPoint } from '@/lib/props-parser';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';

interface AuditIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  line?: number;
  snippet?: string;
  fix?: string;
}

const DEFAULT_CODE = `function App() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2>Welcome</h2>
      <img src="/placeholder.jpg" />
      <button onClick={() => alert('Hi')}>Click me</button>
      <div className="mt-4">
        <input placeholder="Enter email" />
      </div>
      <div className="mt-6 p-4 bg-white rounded-xl">
        <p style={{ color: '#ccc' }}>Light text on white</p>
      </div>
    </div>
  );
}`;

const AUDIT_RULES = [
  {
    id: 'img-alt',
    rule: 'img-alt',
    check: (code: string): AuditIssue | null => {
      const regex = /<img[^>]+src=["'][^"']*["'](?![\s\S]*?alt=["'])/g;
      const match = regex.exec(code);
      if (match) {
        const before = code.substring(0, match.index);
        const line = (before.match(/\n/g) || []).length + 1;
        return {
          id: `img-alt-${match.index}`,
          type: 'error',
          rule: 'img-alt',
          message: 'Image is missing alt text. Screen readers cannot describe the image.',
          line,
          snippet: match[0].substring(0, 60) + '...',
          fix: 'Add alt attribute: <img alt="Description of image" ... />',
        };
      }
      return null;
    }
  },
  {
    id: 'button-text',
    rule: 'button-text',
    check: (code: string): AuditIssue | null => {
      const buttonRegex = /<button[^>]*>([\s]*|<\/button>)/g;
      const match = buttonRegex.exec(code);
      if (match) {
        const before = code.substring(0, match.index);
        const line = (before.match(/\n/g) || []).length + 1;
        return {
          id: `button-text-${match.index}`,
          type: 'warning',
          rule: 'button-text',
          message: 'Button has no text content or aria-label. It will be invisible to screen readers.',
          line,
          snippet: '<button ... />',
          fix: 'Add text content or aria-label="Button description" to the button.',
        };
      }
      return null;
    }
  },
  {
    id: 'input-label',
    rule: 'input-label',
    check: (code: string): AuditIssue | null => {
      const inputRegex = /<input[^>]*>/g;
      let match: RegExpExecArray | null;
      const issues: AuditIssue[] = [];
      while ((match = inputRegex.exec(code)) !== null) {
        const inputTag = match[0];
        if (!inputTag.includes('aria-label') && !inputTag.includes('aria-labelledby')) {
          const before = code.substring(0, match.index);
          const line = (before.match(/\n/g) || []).length + 1;
          issues.push({
            id: `input-label-${match.index}`,
            type: 'error',
            rule: 'input-label',
            message: 'Input field has no associated label. Screen readers will not announce it properly.',
            line,
            snippet: inputTag.substring(0, 50) + '...',
            fix: 'Wrap with <label> element or add aria-label="Field description".',
          });
        }
      }
      return issues[0] || null;
    }
  },
  {
    id: 'color-contrast',
    rule: 'color-contrast',
    check: (code: string): AuditIssue | null => {
      const styleRegex = /style=\{[\s\S]*?color:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
      let match: RegExpExecArray | null;
      while ((match = styleRegex.exec(code)) !== null) {
        const color = match[1].toLowerCase();
        const lowContrastColors = ['#ccc', '#ddd', '#eee', '#bbb', 'lightgray', 'lightgrey', '#c0c0c0', '#d0d0d0', '#e0e0e0'];
        if (lowContrastColors.includes(color) || /^#([a-f0-9])\1([a-f0-9])\2([a-f0-9])\3$/i.test(color)) {
          const before = code.substring(0, match.index);
          const line = (before.match(/\n/g) || []).length + 1;
          return {
            id: `contrast-${match.index}`,
            type: 'warning',
            rule: 'color-contrast',
            message: `Low contrast text (color: ${color}). May be hard to read for visually impaired users.`,
            line,
            snippet: `style={{ color: '${color}' }}`,
            fix: 'Use a darker color (e.g., #333 or #1e293b) on light backgrounds to meet WCAG AA contrast ratio.',
          };
        }
      }
      return null;
    }
  },
  {
    id: 'heading-order',
    rule: 'heading-order',
    check: (code: string): AuditIssue | null => {
      const h1Match = code.match(/<h1[^>]*>/g);
      const h2Match = code.match(/<h2[^>]*>/g);
      if (h2Match && !h1Match && h2Match.length > 0) {
        const before = code.substring(0, code.indexOf('<h2'));
        const line = (before.match(/\n/g) || []).length + 1;
        return {
          id: 'heading-order',
          type: 'warning',
          rule: 'heading-order',
          message: 'Page has an <h2> without a preceding <h1>. Headings should start at level 1.',
          line,
          snippet: '<h2>...</h2>',
          fix: 'Replace the first <h2> with <h1>, or add an <h1> before it.',
        };
      }
      return null;
    }
  },
  {
    id: 'lang-attr',
    rule: 'lang-attr',
    check: (code: string): AuditIssue | null => {
      if (code.includes('<html') && !code.includes('lang=')) {
        return {
          id: 'lang-attr',
          type: 'info',
          rule: 'lang-attr',
          message: 'No lang attribute found on <html>. Screen readers may use wrong pronunciation.',
          fix: 'Add lang="en" (or your language) to the <html> element.',
        };
      }
      return null;
    }
  },
];

function runAudit(code: string): AuditIssue[] {
  const issues: AuditIssue[] = [];
  for (const rule of AUDIT_RULES) {
    const result = rule.check(code);
    if (result) issues.push(result);
  }
  if (issues.length === 0) {
    issues.push({
      id: 'all-clear',
      type: 'info',
      rule: 'all-clear',
      message: 'No obvious accessibility issues detected. Consider testing with a real screen reader.',
    });
  }
  return issues;
}

export default function A11yAuditorPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [autoAudit, setAutoAudit] = useState(true);
  const [collapsedIssues, setCollapsedIssues] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const issues = useMemo(() => runAudit(code), [code]);
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  const entryPointCode = useMemo(() => {
    const controls = [
      { id: 'simulatedState', label: 'State', type: 'text' as const, value: 'normal' }
    ];
    return generateEntryPoint(controls);
  }, []);

  const sandpackFiles = useMemo(() => ({
    '/App.tsx': code,
    '/styles.css': '',
    '/index.tsx': {
      code: entryPointCode,
      hidden: true
    }
  }), [code, entryPointCode]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleIssue = (id: string) => {
    setCollapsedIssues(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SandpackProvider
      template="react-ts"
      theme={theme}
      files={sandpackFiles}
      customSetup={{
        dependencies: {
          'lucide-react': 'latest',
          'clsx': 'latest'
        }
      }}
    >
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">App.tsx</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAudit}
                  onChange={e => setAutoAudit(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Auto-audit
              </label>
              <button
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                className="rounded px-2 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
              <Button variant="secondary" onClick={copyCode} className="h-7 text-[10px] gap-1 px-2">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              path="auditor.tsx"
              value={code}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              onChange={(val) => { if (autoAudit) setCode(val || ''); }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Results + Preview Panel */}
        <div className="w-96 shrink-0 flex flex-col bg-white dark:bg-slate-900">
          {/* Audit Results */}
          <div className="flex-1 overflow-y-auto border-b border-slate-200 dark:border-slate-800">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" /> Audit Results
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  {errorCount > 0 && (
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-3 h-3" /> {errorCount}
                    </span>
                  )}
                  {warningCount > 0 && (
                    <span className="flex items-center gap-1 text-amber-500">
                      <AlertTriangle className="w-3 h-3" /> {warningCount}
                    </span>
                  )}
                  {errorCount === 0 && warningCount === 0 && (
                    <span className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 className="w-3 h-3" /> Clear
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                {issues.map((issue) => {
                  const isCollapsed = collapsedIssues.has(issue.id);
                  const isSelected = selectedIssue === issue.id;
                  return (
                    <div
                      key={issue.id}
                      className={cn(
                        "rounded-xl border transition-all",
                        isSelected && "ring-1 ring-indigo-500",
                        issue.type === 'error'
                          ? "border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20"
                          : issue.type === 'warning'
                            ? "border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20"
                            : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50"
                      )}
                    >
                      <button
                        onClick={() => toggleIssue(issue.id)}
                        className="flex items-start gap-2 w-full p-2.5 text-left"
                      >
                        {issue.type === 'error' ? (
                          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                        ) : issue.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                        ) : (
                          <Info className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-snug">{issue.message}</p>
                          {issue.line && (
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5">Line {issue.line}</p>
                          )}
                        </div>
                        <ChevronDown className={cn("w-3 h-3 mt-1 shrink-0 text-slate-400 transition-transform", !isCollapsed && "rotate-180")} />
                      </button>

                      <AnimatePresence>
                        {isCollapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="overflow-hidden"
                          >
                            <div className="px-2.5 pb-2.5 space-y-1.5">
                              {issue.snippet && (
                                <pre className="rounded-lg bg-slate-950 px-2 py-1 text-[9px] font-mono text-slate-300 overflow-x-auto">{issue.snippet}</pre>
                              )}
                              {issue.fix && (
                                <div className="flex items-start gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" />
                                  <span>{issue.fix}</span>
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
            </div>
          </div>

          {/* Sandpack Preview */}
          <div className="h-64 shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Preview</span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </SandpackProvider>
  );
}
