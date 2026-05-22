'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Code2, BookOpen, Search, ChevronDown,
  Copy, Check, Plus, Trash2, Edit3, X, Save, RotateCcw,
  AlertCircle, CheckCircle2, Layers, ArrowRight, Sparkles,
  FlaskConical, Terminal, RefreshCw, FileCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PATTERNS, type Pattern } from '@/lib/patterns-data';
import { RECIPES, type Recipe, type RecipeStep, type RecipeIngredient } from '@/lib/recipes-data';
import { useSnippets, type Snippet } from '@/components/patterns/SnippetStorage';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

type Tab = 'gallery' | 'snippets' | 'recipes';

export default function PatternsPage() {
  const [tab, setTab] = useState<Tab>('gallery');
  const [search, setSearch] = useState('');

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left sidebar - pattern list */}
      <aside className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" placeholder="Search..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs outline-none focus:border-indigo-500 dark:text-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {([
            { id: 'gallery' as Tab, label: 'Gallery', icon: LayoutGrid },
            { id: 'snippets' as Tab, label: 'Snippets', icon: Code2 },
            { id: 'recipes' as Tab, label: 'Recipes', icon: FlaskConical },
          ]).map(t => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button key={t.id} onClick={() => { setTab(t.id); setSearch(''); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                  isActive ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <AnimatePresence mode="wait">
          {tab === 'gallery' && <PatternGallery key="gallery" search={search} />}
          {tab === 'snippets' && <SnippetManager key="snippets" search={search} />}
          {tab === 'recipes' && <RecipeViewer key="recipes" search={search} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ─── Pattern Gallery ─────────────────────────── */

function PatternGallery({ search }: { search: string }) {
  const [selected, setSelected] = useState<Pattern>(PATTERNS[0]);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return PATTERNS;
    const q = search.toLowerCase();
    return PATTERNS.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.includes(q));
  }, [search]);

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (filtered.length === 0) {
    return (
      <EmptyState icon={LayoutGrid} message="No patterns match your search." />
    );
  }

  return (
    <div className="flex h-full">
      {/* Pattern list */}
      <div className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-2 space-y-1">
        {filtered.map(p => {
          const isSelected = selected.id === p.id;
          return (
            <button key={p.id} onClick={() => setSelected(p)}
              className={cn(
                "w-full text-left p-2.5 rounded-xl transition-all border",
                isSelected
                  ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800'
                  : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
              )}
            >
              <p className="text-xs font-bold text-slate-900 dark:text-white">{p.title}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{p.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={p.difficulty === 'Advanced' ? 'warning' : p.difficulty === 'Intermediate' ? 'success' : undefined}>
                  {p.difficulty}
                </Badge>
                <span className="text-[9px] font-medium uppercase text-slate-400">{p.category}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pattern detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selected.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{selected.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {selected.concepts.map(c => (
                <span key={c} className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {selected.css && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">CSS</h3>
              <pre className="rounded-xl bg-slate-950 p-4 text-xs font-mono leading-relaxed text-slate-200 overflow-x-auto">{selected.css}</pre>
            </div>
          )}

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Code</h3>
              <button onClick={() => copyCode(selected.tsx)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="rounded-xl bg-slate-950 p-4 text-xs font-mono leading-relaxed text-emerald-400 overflow-x-auto max-h-[500px]">
              <code>{selected.tsx}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Snippet Manager ──────────────────────────── */

function SnippetManager({ search }: { search: string }) {
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useSnippets();
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', code: '', language: 'tsx' as Snippet['language'], tags: '' });

  const filtered = useMemo(() => {
    if (!search) return snippets;
    const q = search.toLowerCase();
    return snippets.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.includes(q)));
  }, [snippets, search]);

  const startCreate = () => {
    setForm({ name: '', description: '', code: '', language: 'tsx', tags: '' });
    setIsCreating(true);
    setEditing(null);
  };

  const startEdit = (s: Snippet) => {
    setForm({ name: s.name, description: s.description, code: s.code, language: s.language, tags: s.tags.join(', ') });
    setEditing(s);
    setIsCreating(false);
  };

  const cancelForm = () => { setIsCreating(false); setEditing(null); };

  const saveForm = () => {
    if (!form.name.trim() || !form.code.trim()) return;
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (editing) {
      updateSnippet(editing.id, { name: form.name, description: form.description, code: form.code, language: form.language, tags });
    } else {
      addSnippet({ name: form.name, description: form.description, code: form.code, language: form.language, tags });
    }
    cancelForm();
  };

  if (isCreating || editing) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{editing ? 'Edit Snippet' : 'New Snippet'}</h2>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-1">Language</label>
              <select value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value as Snippet['language'] }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white">
                <option value="tsx">TSX</option>
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
                <option value="html">HTML</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="hook, utility, form"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Code</label>
            <textarea value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} rows={10}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 dark:text-white resize-y" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={cancelForm} className="h-9 text-xs">Cancel</Button>
            <Button variant="primary" onClick={saveForm} className="h-9 text-xs gap-1">
              <Save className="w-3.5 h-3.5" /> {editing ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500">{filtered.length} snippets</p>
        <Button variant="primary" onClick={startCreate} className="h-8 text-xs gap-1">
          <Plus className="w-3.5 h-3.5" /> New Snippet
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Code2} message="No snippets yet. Create your first one!" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(snippet => {
            const [copiedId, setCopiedId] = useState<string | null>(null);
            return (
              <SnippetCard key={snippet.id} snippet={snippet}
                onEdit={() => startEdit(snippet)}
                onDelete={() => deleteSnippet(snippet.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function SnippetCard({ snippet, onEdit, onDelete }: { snippet: Snippet; onEdit: () => void; onDelete: () => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col group">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{snippet.name}</p>
          {snippet.description && (
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{snippet.description}</p>
          )}
        </div>
        <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">{snippet.language}</span>
      </div>

      <pre className="flex-1 rounded-xl bg-slate-950 p-3 text-[10px] font-mono leading-relaxed text-emerald-400 overflow-x-auto max-h-32 mb-3">
        <code>{snippet.code.length > 200 ? snippet.code.substring(0, 200) + '...' : snippet.code}</code>
      </pre>

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {snippet.tags.map(t => (
            <span key={t} className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/20 text-[9px] font-medium text-indigo-600 dark:text-indigo-400">{t}</span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={copyCode} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={onEdit} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Edit3 className="w-3 h-3" /> Edit
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => { onDelete(); setConfirmDelete(false); }}
              className="px-2 py-1 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">Confirm</button>
            <button onClick={() => setConfirmDelete(false)}
              className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all ml-auto">
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Recipe Viewer ────────────────────────────── */

function RecipeViewer({ search }: { search: string }) {
  const [selected, setSelected] = useState<Recipe>(RECIPES[0]);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<number>>(new Set([0]));
  const [activeStep, setActiveStep] = useState<number>(0);

  const filtered = useMemo(() => {
    if (!search) return RECIPES;
    const q = search.toLowerCase();
    return RECIPES.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }, [search]);

  const toggleIngredient = (i: number) => {
    setExpandedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  if (filtered.length === 0) {
    return <EmptyState icon={FlaskConical} message="No recipes match your search." />;
  }

  return (
    <div className="flex h-full">
      {/* Recipe sidebar */}
      <div className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-2 space-y-1">
        {filtered.map(r => {
          const isSelected = selected.id === r.id;
          return (
            <button key={r.id} onClick={() => { setSelected(r); setActiveStep(0); setExpandedIngredients(new Set([0])); }}
              className={cn(
                "w-full text-left p-2.5 rounded-xl transition-all border",
                isSelected
                  ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800'
                  : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
              )}
            >
              <p className="text-xs font-bold text-slate-900 dark:text-white">{r.title}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{r.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={r.difficulty === 'Advanced' ? 'warning' : r.difficulty === 'Intermediate' ? 'success' : undefined}>
                  {r.difficulty}
                </Badge>
                <span className="text-[9px] text-slate-400">{r.ingredients.length} ingredients</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recipe detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selected.title}</h2>
            </div>
            <p className="text-sm text-slate-500">{selected.description}</p>
          </div>

          {/* Ingredients */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Ingredients
            </h3>
            <div className="space-y-2">
              {selected.ingredients.map((ing, i) => {
                const isOpen = expandedIngredients.has(i);
                return (
                  <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                    <button onClick={() => toggleIngredient(i)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                        isOpen ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      )}>{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{ing.name}</p>
                        <p className="text-xs text-slate-500">{ing.description}</p>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform shrink-0", isOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <pre className="rounded-xl bg-slate-950 p-3 text-[11px] font-mono leading-relaxed text-emerald-400 overflow-x-auto">
                              <code>{ing.code}</code>
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Steps */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5" /> Steps
            </h3>
            <div className="space-y-2">
              {selected.steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div key={i} className={cn(
                    "rounded-xl border p-4 transition-all",
                    isActive
                      ? 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  )}>
                    <button onClick={() => setActiveStep(isActive ? -1 : i)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                        isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      )}>{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-bold", isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-900 dark:text-white')}>{step.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform shrink-0", isActive && "rotate-180")} />
                    </button>
                    {isActive && step.code && (
                      <pre className="mt-3 rounded-xl bg-slate-950 p-3 text-[11px] font-mono leading-relaxed text-emerald-400 overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Final Code */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Final Assembly
            </h3>
            <pre className="rounded-xl bg-slate-950 p-4 text-xs font-mono leading-relaxed text-emerald-400 overflow-x-auto">
              <code>{selected.finalCode}</code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared ───────────────────────────────────── */

function EmptyState({ icon: Icon, message }: { icon: any; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
