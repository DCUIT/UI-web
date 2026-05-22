'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Snippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: 'tsx' | 'css' | 'js' | 'html';
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'ui-platform-snippets';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: 'default-1',
    name: 'cn() Utility',
    description: 'Tailwind class merge helper (clsx + tailwind-merge)',
    code: `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}`,
    language: 'tsx',
    tags: ['utility', 'tailwind'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'default-2',
    name: 'useDebounce Hook',
    description: 'Debounce a value by a delay in milliseconds',
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    language: 'tsx',
    tags: ['hook', 'utility'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'default-3',
    name: 'Form Input Styles',
    description: 'Consistent input field classes with error state',
    code: `// Base input
className="w-full rounded-xl border px-3 py-2 text-sm outline-none transition bg-slate-50 dark:bg-slate-800 dark:text-white"

// Error state
className="w-full rounded-xl border border-red-500 px-3 py-2 text-sm outline-none ring-red-500/20"

// Focus state
className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"`,
    language: 'css',
    tags: ['form', 'tailwind', 'ui'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export function useSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSnippets(JSON.parse(raw));
      } else {
        setSnippets(DEFAULT_SNIPPETS);
      }
    } catch {
      setSnippets(DEFAULT_SNIPPETS);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    }
  }, [snippets, loaded]);

  const addSnippet = useCallback((snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newSnippet: Snippet = { ...snippet, id: generateId(), createdAt: now, updatedAt: now };
    setSnippets(prev => [newSnippet, ...prev]);
    return newSnippet;
  }, []);

  const updateSnippet = useCallback((id: string, updates: Partial<Omit<Snippet, 'id' | 'createdAt'>>) => {
    setSnippets(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s));
  }, []);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setSnippets(DEFAULT_SNIPPETS);
  }, []);

  return { snippets, addSnippet, updateSnippet, deleteSnippet, resetToDefaults, loaded };
}
