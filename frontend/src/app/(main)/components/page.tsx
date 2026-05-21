'use client';

import { useMemo, useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search as SearchIcon, ChevronRight } from 'lucide-react';
import Input from '@/components/ui/Input';
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


const categories = ['All', 'UI', 'Form', 'Overlay', 'Navigation', 'Feedback', 'Layout', 'Cards', 'Dashboard'];

function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <Suspense fallback={<LoadingBox />}>
      <div className="space-y-4">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Dialog preview">
          <p className="text-sm text-slate-700 dark:text-slate-300">This modal demonstrates a centered overlay with dark mode support.</p>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Close window
          </Button>
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
        <Dropdown
          label={selected}
          items={[
            { label: 'Edit', onSelect: () => setSelected('Edit') },
            { label: 'Delete', onSelect: () => setSelected('Delete') },
          ]}
        />
        <p className="text-sm text-slate-500 dark:text-slate-400">Selected: {selected}</p>
      </div>
    </Suspense>
  );
}

function TabsExample() {
  return (
    <Suspense fallback={<LoadingBox />}>
      <Tabs
        items={[
          {
            value: 'details',
            label: 'Details',
            content: <p className="text-sm text-slate-600 dark:text-slate-300">Product details content.</p>,
          },
          {
            value: 'reviews',
            label: 'Reviews',
            content: <p className="text-sm text-slate-600 dark:text-slate-300">Customer reviews content.</p>,
          },
        ]}
      />
    </Suspense>
  );
}

function AccordionExample() {
  return (
    <Suspense fallback={<LoadingBox />}>
      <Accordion
        items={[
          {
            title: 'Why use this?',
            content: <p className="text-sm text-slate-600 dark:text-slate-300">Built for speed, accessibility, and flexible layouts.</p>,
          },
          {
            title: 'What is included?',
            content: <p className="text-sm text-slate-600 dark:text-slate-300">Buttons, forms, navigation and feedback patterns.</p>,
          },
        ]}
      />
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
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Textarea input example</p>
            <Textarea placeholder="Leave a message" />
          </div>
        </Suspense>
      );
    case 4:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Select field preview</p>
            <Select>
              <option>Choose an option</option>
              <option>Option One</option>
              <option>Option Two</option>
            </Select>
          </div>
        </Suspense>
      );
    case 5:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <Checkbox label="Accept terms and conditions" />
          </div>
        </Suspense>
      );
    case 6:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="flex flex-wrap gap-6">
            <Radio name="plan" label="Monthly" />
            <Radio name="plan" label="Annual" />
          </div>
        </Suspense>
      );
    case 7:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <Switch label="Enable notifications" />
          </div>
        </Suspense>
      );
    case 8:
      return (
        <div className="flex flex-wrap gap-3">
          <Badge>New</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Beta</Badge>
        </div>
      );
    case 9:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="flex items-center gap-4">
            <Avatar alt="Alex Doe" fallback="AD" />
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">Alex Doe</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Product designer</p>
            </div>
          </div>
        </Suspense>
      );
    case 10:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tooltip on hover</p>
            <Tooltip label="More information">Hover me</Tooltip>
          </div>
        </Suspense>
      );
    case 11:
      return <ModalExample />;
    case 12:
      return <DropdownExample />;
    case 13:
      return <TabsExample />;
    case 14:
      return <AccordionExample />;
    case 15:
      return (
        <Suspense fallback={<LoadingBox />}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Library', href: '/library' },
              { label: 'Current' },
            ]}
          />
        </Suspense>
      );
    case 16:
      return <PaginationExample />;
    case 17:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </Suspense>
      );
    case 18:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="flex items-center gap-4">
            <Spinner />
            <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
          </div>
        </Suspense>
      );
    case 19:
      return (
        <Suspense fallback={<LoadingBox />}>
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Simple data table</p>
            <DataTable
              columns={[
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email' },
              ]}
              data={[
                { id: 1, name: 'Alice', email: 'alice@example.com' },
                { id: 2, name: 'Bob', email: 'bob@example.com' },
                { id: 3, name: 'Carol', email: 'carol@example.com' },
                { id: 4, name: 'Dan', email: 'dan@example.com' },
                { id: 5, name: 'Eve', email: 'eve@example.com' },
                { id: 6, name: 'Frank', email: 'frank@example.com' },
              ]}
            />
          </div>
        </Suspense>
      );
    case 20:
      return <CardPreview type="ProductCard" />;
    case 21:
      return <CardPreview type="UserCard" />;
    case 22:
      return <CardPreview type="PricingCard" />;
    case 23:
      return <CardPreview type="BlogCard" />;
    case 24:
      return <CardPreview type="DashboardCard" />;
    case 25:
      return <CardPreview type="AnalyticsCard" />;
    default:
      return null;
  }
}

function CardPreview({ type }: { type: string }) {
  const [Card, setCard] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    import('@/components/cards').then(m => setCard(() => m[type as keyof typeof m] as React.ComponentType));
  }, [type]);
  return Card ? <Suspense fallback={<LoadingBox />}><Card /></Suspense> : <LoadingBox />;
}

/**
 * Extended component type to fix @ts-ignore issues
 */
interface ExtendedUIComponent extends UIComponent {
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

function ComponentsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [selectedId, setSelectedId] = useState(Number(searchParams.get('id')) || 1);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'individual' | 'collections'>('individual');

  const copyCode = async () => {

    await navigator.clipboard.writeText(selectedComponent.source);
    setToastMessage('Code copied to clipboard');
    window.setTimeout(() => setToastMessage(''), 2200);
  };
  
  const selectedComponent = (componentsData.find((item) => item.id === selectedId) ?? componentsData[0]) as ExtendedUIComponent;

  // Sync State with URL for deep linking
  const updateParams = (id: number, cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id.toString());
    params.set('category', cat);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSelectComponent = (id: number) => {
    setSelectedId(id);
    updateParams(id, category);
    if (isMobileFiltersOpen) setIsMobileFiltersOpen(false);
  };

  // Dynamic Meta Tags & Page Title Update
  useEffect(() => {
    if (selectedComponent) {
      // Cập nhật tiêu đề trình duyệt
      document.title = `${selectedComponent.name} Component - Master UI Platform`;
      
      // Cập nhật thẻ meta description để hỗ trợ SEO khi chuyển đổi linh kiện
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedComponent.description);
      }
    }
  }, [selectedComponent]);

  const results = useMemo(() => {
    return componentsData.filter((component) => {
      const matchesCategory = category === 'All' || component.category === category;
      const matchesQuery = component.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  // Sidebar Content Component to reuse
  const SidebarContent = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components"
            className="pl-10"
          />
        </div>
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Categories</p>
          <div className="flex flex-col gap-1">
            {categories.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setCategory(option);
                  updateParams(selectedId, option);
                  if (isMobileFiltersOpen) setIsMobileFiltersOpen(false);
                }}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  category === option
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                {option}
                {category === option && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Removed: "Available Components" list from sidebar to avoid double sidebar */}
    </div>
  );

  return (
    <section className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Master UI Platform",
            "description": "A comprehensive UI component library built with React and Tailwind CSS.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "mainEntity": {
              "@type": "CreativeWork",
              "name": selectedComponent.name,
              "description": selectedComponent.description,
              "author": {
                "@type": "Organization",
                "name": "Master UI"
              },
              "keywords": selectedComponent.tags?.join(", "),
              "genre": "UI Component"
            }
          })
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4 text-center lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Component library</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Reusable UI Components
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-slate-600 dark:text-slate-300">
            Browse, preview, and copy production-ready components for your design system.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <button
                onClick={() => setViewMode('individual')}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-bold transition-all",
                  viewMode === 'individual' 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Individual
              </button>
              <button
                onClick={() => setViewMode('collections')}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-bold transition-all",
                  viewMode === 'collections' 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Collections
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'individual' ? (
          <>
            {/* Mobile Filter Trigger & Horizontal Categories */}
            <div className="sticky top-[64px] z-30 -mx-4 mb-8 bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-slate-950/80 lg:hidden">
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="shrink-0"
                >
                  <Filter size={18} className="mr-2" /> Filters
                </Button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex flex-1 gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {categories.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setCategory(option);
                        updateParams(selectedId, option);
                      }}
                      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                        category === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
              {/* Desktop Sidebar */}
              <aside className="sticky top-24 hidden h-[calc(100vh-120px)] overflow-y-auto pr-4 lg:block custom-scrollbar">
                <SidebarContent />
              </aside>

              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Selected component</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{selectedComponent.name}</h2>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {selectedComponent.difficulty && (
                        <Badge variant={selectedComponent.difficulty === 'Hard' ? 'warning' : 'success'}>
                          {selectedComponent.difficulty}
                        </Badge>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {selectedComponent.tags?.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-400 max-w-2xl font-normal">{selectedComponent.description}</p>
                  </div>
                  <Button type="button" variant="secondary" onClick={copyCode}>
                    Copy source
                  </Button>
                </div>

                {/* Premium Integrated Box: Preview + Code */}
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-8 dark:border-slate-800/80 dark:bg-slate-900">
                    <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Preview</p>
                    <div className="space-y-4">
                      {renderPreview(selectedComponent)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-8 dark:border-slate-800/80 dark:bg-slate-900">
                    <div className="mb-6 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                          activeTab === 'preview'
                            ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('code')}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                          activeTab === 'code'
                            ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        Code
                      </button>
                    </div>

                    {activeTab === 'preview' ? (
                      <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800/80 dark:bg-slate-950">
                        {renderPreview(selectedComponent)}
                      </div>
                    ) : (
                      <pre className="max-h-[420px] overflow-auto rounded-xl border border-slate-200/80 bg-slate-950 p-4 text-xs leading-6 text-slate-100 dark:border-slate-800/80">
                        <code>{selectedComponent.source}</code>
                      </pre>
                    )}
                  </div>
                </div>

                {/* Move All components BELOW preview/code block */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-8 dark:border-slate-800/80 dark:bg-slate-900">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        All components
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{results.length} results available</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((component) => {
                      const active = component.id === selectedComponent.id;
                      return (
                        <div
                          key={component.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleSelectComponent(component.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectComponent(component.id);
                            }
                          }}
                          className={`group rounded-xl border p-4 text-left cursor-pointer transition-all duration-200 ${
                            active
                              ? 'border-indigo-500 bg-white shadow-[0_0_30px_rgba(79,70,229,0.2)] dark:border-indigo-400 dark:bg-slate-800'
                              : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm dark:border-slate-800/80 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-slate-950 dark:text-white">{component.name}</p>
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{component.category}</p>
                            </div>
                            <span
                              className={`text-sm transition-transform ${
                                active
                                  ? 'text-slate-950 dark:text-white'
                                  : 'text-slate-400 group-hover:translate-x-1 dark:text-slate-600'
                              }`}
                            >
                              {active ? '✓' : '→'}
                            </span>
                          </div>
                          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800/80 dark:bg-slate-950">
                            {renderPreview(component)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Suspense fallback={<div className="grid gap-6 md:grid-cols-2"><div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" /><div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" /></div>}>
            <CuratedCollections />
          </Suspense>
          </motion.div>
        )}
      </div>

      <Toast message={toastMessage} />
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 flex items-center justify-center">Loading Library...</div>}>
      <ComponentsPageContent />
    </Suspense>
  );
}

