'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Toast from '@/components/ui/Toast';
import { componentsData } from '@/data/components';
import type { Component as UIComponent } from '@/types/component';

const categories = ['All', 'UI', 'Form', 'Layout'];

function renderPreview(component: UIComponent) {
  switch (component.id) {
    case 1:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Primary button example</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Form input preview</p>
          <Input placeholder="Enter your email" />
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Card layout sample</p>
          <Card className="bg-slate-100 dark:bg-slate-950">
            <p className="text-slate-700 dark:text-slate-200">This is a sample card preview showing the component style.</p>
          </Card>
        </div>
      );
    default:
      return null;
  }
}

export default function ComponentsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const selectedComponent = componentsData.find((item) => item.id === selectedId) ?? componentsData[0];

  const results = useMemo(() => {
    return componentsData.filter((component) => {
      const matchesCategory = category === 'All' || component.category === category;
      const matchesQuery = component.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(selectedComponent.source);
    setToastMessage('Code copied to clipboard');
    window.setTimeout(() => setToastMessage(''), 2200);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Component library</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Browse reusable UI primitives and copy ready-to-use code.
        </h1>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
          Search through components, preview states, and inspect source right from the builder page.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-card shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950">
          <div className="space-y-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === option
                      ? 'bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {results.map((component) => (
              <button
                key={component.id}
                type="button"
                onClick={() => setSelectedId(component.id)}
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  selectedComponent.id === component.id
                    ? 'border-sky-500 bg-sky-50 text-slate-950 dark:border-sky-400 dark:bg-slate-900 dark:text-white'
                    : 'border-slate-200 bg-white text-slate-950 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{component.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{component.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <Card className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Selected component</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selectedComponent.name}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{selectedComponent.description}</p>
            </div>
            <Button type="button" variant="secondary" onClick={copyCode}>
              Copy source
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Preview</p>
              </div>
              {renderPreview(selectedComponent)}
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
              <div className="mb-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === 'preview'
                      ? 'bg-slate-950 text-white dark:bg-slate-200 dark:text-slate-950'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === 'code'
                      ? 'bg-slate-950 text-white dark:bg-slate-200 dark:text-slate-950'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  Code
                </button>
              </div>
              {activeTab === 'preview' ? (
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-slate-950 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-100">
                  {renderPreview(selectedComponent)}
                </div>
              ) : (
                <pre className="max-h-[380px] overflow-auto rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-sm text-slate-100 dark:border-slate-800/80 dark:bg-slate-900">
                  <code>{selectedComponent.source}</code>
                </pre>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Toast message={toastMessage} />
    </section>
  );
}
