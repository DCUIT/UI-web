'use client';

import { useMemo, useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Code2, Eye, Copy, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Toast from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import { componentsData } from '@/data/components';
import type { Component as UIComponent } from '@/types/component';
import { cn } from '@/lib/utils';

const CuratedCollections = lazy(() => import('@/components/templates/CuratedCollections'));
const Modal = lazy(() => import('@/components/ui/Modal'));
const Dropdown = lazy(() => import('@/components/ui/Dropdown'));
const Tabs = lazy(() => import('@/components/ui/Tabs'));
const Accordion = lazy(() => import('@/components/ui/Accordion'));
const Pagination = lazy(() => import('@/components/ui/Pagination'));
const Textarea = lazy(() => import('@/components/ui/Textarea'));
const Select = lazy(() => import('@/components/ui/Select'));
const Checkbox = lazy(() => import('@/components/ui/Checkbox'));
const Radio = lazy(() => import('@/components/ui/Radio'));
const Switch = lazy(() => import('@/components/ui/Switch'));
const Avatar = lazy(() => import('@/components/ui/Avatar'));
const Tooltip = lazy(() => import('@/components/ui/Tooltip'));
const Breadcrumb = lazy(() => import('@/components/ui/Breadcrumb'));
const Skeleton = lazy(() => import('@/components/ui/Skeleton'));
const Spinner = lazy(() => import('@/components/ui/Spinner'));
const DataTable = lazy(() => import('@/components/ui/DataTable'));

function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <Suspense fallback={<LoadingBox />}>
      <div className="space-y-4">
        <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Dialog preview">
          <p className="text-sm text-slate-700 dark:text-slate-300">This modal demonstrates a centered overlay with dark mode support.</p>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Close window</Button>
        </Modal>
      </div>
    </Suspense>
  );
}

function DropdownExample() {
  const [selected, setSelected] = useState('Actions');
  return (
    <Suspense fallback={<LoadingBox />}>
      <div className="space-y-4">
        <Dropdown label={selected} items={[{ label: 'Edit', onSelect: () => setSelected('Edit') }, { label: 'Delete', onSelect: () => setSelected('Delete') }]} />
        <p className="text-sm text-slate-500 dark:text-slate-400">Selected: {selected}</p>
      </div>
    </Suspense>
  );
}

function TabsExample() {
  return (
    <Suspense fallback={<LoadingBox />}>
      <Tabs items={[{ value: 'details', label: 'Details', content: <p className="text-sm text-slate-600 dark:text-slate-300">Product details content.</p> }, { value: 'reviews', label: 'Reviews', content: <p className="text-sm text-slate-600 dark:text-slate-300">Customer reviews content.</p> }]} />
    </Suspense>
  );
}

function AccordionExample() {
  return (
    <Suspense fallback={<LoadingBox />}>
      <Accordion items={[{ title: 'Why use this?', content: <p className="text-sm text-slate-600 dark:text-slate-300">Built for speed, accessibility, and flexible layouts.</p> }, { title: 'What is included?', content: <p className="text-sm text-slate-600 dark:text-slate-300">Buttons, forms, navigation and feedback patterns.</p> }]} />
    </Suspense>
  );
}

function PaginationExample() {
  const [page, setPage] = useState(1);
  return <Suspense fallback={<LoadingBox />}><Pagination currentPage={page} totalPages={5} onChange={setPage} /></Suspense>;
}

const LoadingBox = () => <div className="h-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />;

function renderPreview(component: UIComponent) {
  switch (component.id) {
    case 1: return <div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Primary button example</p><div className="flex flex-wrap gap-3"><Button variant="primary">Primary</Button><Button variant="secondary">Secondary</Button></div></div>;
    case 2: return <div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Form input preview</p><input className="w-full rounded-lg border p-2 dark:bg-slate-800" placeholder="Enter your email" /></div>;
    case 3: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Textarea input example</p><Textarea placeholder="Leave a message" /></div></Suspense>;
    case 4: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Select field preview</p><Select><option>Choose an option</option><option>Option One</option><option>Option Two</option></Select></div></Suspense>;
    case 5: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><Checkbox label="Accept terms and conditions" /></div></Suspense>;
    case 6: return <Suspense fallback={<LoadingBox />}><div className="flex flex-wrap gap-6"><Radio name="plan" label="Monthly" /><Radio name="plan" label="Annual" /></div></Suspense>;
    case 7: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><Switch label="Enable notifications" /></div></Suspense>;
    case 8: return <div className="flex flex-wrap gap-3"><Badge>New</Badge><Badge variant="success">Active</Badge><Badge variant="warning">Beta</Badge></div>;
    case 9: return <Suspense fallback={<LoadingBox />}><div className="flex items-center gap-4"><Avatar alt="Alex Doe" fallback="AD" /><div><p className="font-semibold text-slate-950 dark:text-white">Alex Doe</p><p className="text-sm text-slate-500 dark:text-slate-400">Product designer</p></div></div></Suspense>;
    case 10: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tooltip on hover</p><Tooltip label="More information">Hover me</Tooltip></div></Suspense>;
    case 11: return <ModalExample />;
    case 12: return <DropdownExample />;
    case 13: return <TabsExample />;
    case 14: return <AccordionExample />;
    case 15: return <Suspense fallback={<LoadingBox />}><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Library', href: '/library' }, { label: 'Current' }]} /></Suspense>;
    case 16: return <PaginationExample />;
    case 17: return <Suspense fallback={<LoadingBox />}><div className="space-y-3"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-3/4" /></div></Suspense>;
    case 18: return <Suspense fallback={<LoadingBox />}><div className="flex items-center gap-4"><Spinner /><span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span></div></Suspense>;
    case 19: return <Suspense fallback={<LoadingBox />}><div className="space-y-4"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Simple data table</p><DataTable columns={[{ key: 'id', label: 'ID', sortable: true }, { key: 'name', label: 'Name', sortable: true }, { key: 'email', label: 'Email' }]} data={[{ id: 1, name: 'Alice', email: 'alice@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' }]} /></div></Suspense>;
    case 20: return <CardPreview type="ProductCard" />;
    case 21: return <CardPreview type="UserCard" />;
    case 22: return <CardPreview type="PricingCard" />;
    case 23: return <CardPreview type="BlogCard" />;
    case 24: return <CardPreview type="DashboardCard" />;
    case 25: return <CardPreview type="AnalyticsCard" />;
    default: return null;
  }
}

function CardPreview({ type }: { type: string }) {
  const [Card, setCard] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    import('@/components/cards').then(m => setCard(() => m[type as keyof typeof m] as React.ComponentType));
  }, [type]);
  return Card ? <Suspense fallback={<LoadingBox />}><Card /></Suspense> : <LoadingBox />;
}

interface ExtendedUIComponent extends UIComponent {
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

const componentGroups = [
  { title: 'UI Elements', icon: 'box', categories: ['UI', 'Form', 'Overlay'] },
  { title: 'Layout', icon: 'layout', categories: ['Cards', 'Navigation', 'Table'] },
  { title: 'Feedback', icon: 'message', categories: ['Feedback'] },
  { title: 'Dashboard', icon: 'terminal', categories: ['Dashboard'] },
];

function ComponentsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'All';
  const selectedId = Number(searchParams.get('id')) || 1;
  const viewMode = searchParams.get('view') || 'individual';

  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([componentGroups[0].title]);
  const [sidebarSearch, setSidebarSearch] = useState('');

  const selectedComponent = (componentsData.find((item) => item.id === selectedId) ?? componentsData[0]) as ExtendedUIComponent;

  const copyCode = async () => {
    await navigator.clipboard.writeText(selectedComponent.source);
    setCopied(true);
    setToastMessage('Code copied to clipboard');
    window.setTimeout(() => { setCopied(false); setToastMessage(''); }, 2200);
  };

  const handleSelectComponent = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id.toString());
    router.replace(`/components?${params.toString()}`, { scroll: false });
  };

  const handleSelectCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', cat);
    params.delete('id');
    router.replace(`/components?${params.toString()}`, { scroll: false });
  };

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  useEffect(() => {
    if (selectedComponent) {
      document.title = `${selectedComponent.name} Component - Master UI Platform`;
    }
  }, [selectedComponent]);

  const results = useMemo(() => {
    return componentsData.filter((component) => {
      const matchesCategory = category === 'All' || component.category === category;
      const matchesQuery = component.name.toLowerCase().includes(query.toLowerCase()) || component.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const filteredGroups = useMemo(() => {
    if (!sidebarSearch) return componentGroups;
    return componentGroups.map(group => ({
      ...group,
      categories: group.categories.filter(cat => cat.toLowerCase().includes(sidebarSearch.toLowerCase()))
    })).filter(group => group.categories.length > 0);
  }, [sidebarSearch]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    componentsData.forEach(c => cats.add(c.category));
    return Array.from(cats);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* LEFT SIDEBAR - Component Browser */}
      <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search components..."
              aria-label="Search components"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Category Groups */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <div className="flex flex-col gap-1">
            {filteredGroups.map((group) => {
              const isOpen = openGroups.includes(group.title);
              return (
                <div key={group.title} className="flex flex-col">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="flex items-center rounded-lg px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 w-full"
                  >
                    <span className="ml-1 truncate">{group.title}</span>
                    <ChevronDown size={14} className={cn("ml-auto shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 flex flex-col gap-0.5 border-l border-slate-100 dark:border-slate-800 ml-3.5 pl-3.5">
                          {group.categories.map((cat) => {
                            const isActive = category === cat;
                            const count = componentsData.filter(c => c.category === cat).length;
                            return (
                              <button
                                key={cat}
                                onClick={() => handleSelectCategory(cat)}
                                className={cn(
                                  "rounded-md px-2 py-1 text-sm font-medium transition-all text-left w-full flex items-center justify-between",
                                  isActive
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                                )}
                              >
                                <span>{cat}</span>
                                <span className={cn("text-[10px]", isActive ? "text-indigo-500/60" : "text-slate-400")}>{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* All Components */}
            <button
              onClick={() => handleSelectCategory('All')}
              className={cn(
                "rounded-lg px-2 py-1.5 text-sm font-medium transition-all text-left w-full mt-2",
                category === 'All'
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              )}
            >
              All Components ({componentsData.length})
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT - Preview Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {viewMode === 'individual' ? (
          <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
            {/* Component Header */}
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{selectedComponent.name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  {selectedComponent.difficulty && <Badge variant={selectedComponent.difficulty === 'Hard' ? 'warning' : 'success'}>{selectedComponent.difficulty}</Badge>}
                  {selectedComponent.tags?.map((tag) => <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">{tag}</span>)}
                </div>
                <p className="text-xs text-slate-500 mt-1">{selectedComponent.description}</p>
              </div>
              <Button type="button" variant="primary" onClick={copyCode} className="h-9 text-xs shrink-0 gap-2">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>

            {/* Preview + Code Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Preview Panel */}
              <div className="rounded-xl border bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </p>
                </div>
                <div className="p-5 flex min-h-[200px] items-center justify-center rounded-b-xl border border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50 m-5 mt-0">
                  {renderPreview(selectedComponent)}
                </div>
              </div>

              {/* Code Panel */}
              <div className="rounded-xl border bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col">
                <div className="flex gap-1 px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                  <button onClick={() => setActiveTab('preview')} className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5", activeTab === 'preview' ? "bg-slate-100 dark:bg-slate-800 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}>
                    <Eye className="w-3 h-3" /> Visual
                  </button>
                  <button onClick={() => setActiveTab('code')} className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5", activeTab === 'code' ? "bg-slate-100 dark:bg-slate-800 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}>
                    <Code2 className="w-3 h-3" /> Source
                  </button>
                </div>
                <div className="flex-1 p-5">
                  {activeTab === 'preview' ? (
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-4 text-sm">{renderPreview(selectedComponent)}</div>
                  ) : (
                    <pre className="max-h-[250px] overflow-auto rounded-lg bg-slate-950 p-4 text-[11px] font-mono leading-5 text-slate-200">
                      <code>{selectedComponent.source}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Related Components Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {category === 'All' ? 'All Components' : `${category} Components`} ({results.length})
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {results.map((item) => {
                  const isSelected = item.id === selectedComponent.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectComponent(item.id)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        isSelected
                          ? "border-indigo-500 bg-indigo-50/20 shadow-sm dark:bg-indigo-950/20"
                          : "border-slate-200 bg-white/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
                      )}
                    >
                      <p className="font-medium text-xs text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.category}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <Suspense fallback={<div className="grid gap-6 md:grid-cols-2"><div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" /></div>}>
              <CuratedCollections />
            </Suspense>
          </motion.div>
        )}

        <Toast message={toastMessage} />
      </main>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12 text-sm text-slate-500">Loading Library...</div>}>
      <ComponentsPageContent />
    </Suspense>
  );
}
