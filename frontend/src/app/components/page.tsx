'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Radio from '@/components/ui/Radio';
import Switch from '@/components/ui/Switch';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Tooltip from '@/components/ui/Tooltip';
import Modal from '@/components/ui/Modal';
import Dropdown from '@/components/ui/Dropdown';
import Tabs from '@/components/ui/Tabs';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import Skeleton from '@/components/ui/Skeleton';
import Spinner from '@/components/ui/Spinner';
import DataTable from '@/components/ui/DataTable';
import Card from '@/components/ui/Card';
import Toast from '@/components/ui/Toast';
import ProductCard from '@/components/cards/ProductCard';
import UserCard from '@/components/cards/UserCard';
import PricingCard from '@/components/cards/PricingCard';
import BlogCard from '@/components/cards/BlogCard';
import DashboardCard from '@/components/cards/DashboardCard';
import AnalyticsCard from '@/components/cards/AnalyticsCard';
import { componentsData } from '@/data/components';
import type { Component as UIComponent } from '@/types/component';
import ComponentPreview from '@/components/discovery/ComponentPreview'; // Import ComponentPreview

const categories = ['All', 'UI', 'Form', 'Overlay', 'Navigation', 'Feedback', 'Layout', 'Cards', 'Dashboard'];

function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
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
  );
}

function DropdownExample() {
  const [selected, setSelected] = useState('Actions');

  return (
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
  );
}

function TabsExample() {
  return (
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
  );
}

function AccordionExample() {
  return (
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
  );
}

function PaginationExample() {
  const [page, setPage] = useState(1);

  return <Pagination currentPage={page} totalPages={5} onChange={setPage} />;
}

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
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Textarea input example</p>
          <Textarea placeholder="Leave a message" />
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Select field preview</p>
          <Select>
            <option>Choose an option</option>
            <option>Option One</option>
            <option>Option Two</option>
          </Select>
        </div>
      );
    case 5:
      return (
        <div className="space-y-4">
          <Checkbox label="Accept terms and conditions" />
        </div>
      );
    case 6:
      return (
        <div className="flex flex-wrap gap-6">
          <Radio name="plan" label="Monthly" />
          <Radio name="plan" label="Annual" />
        </div>
      );
    case 7:
      return (
        <div className="space-y-4">
          <Switch label="Enable notifications" />
        </div>
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
        <div className="flex items-center gap-4">
          <Avatar alt="Alex Doe" fallback="AD" />
          <div>
            <p className="font-semibold text-slate-950 dark:text-white">Alex Doe</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Product designer</p>
          </div>
        </div>
      );
    case 10:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tooltip on hover</p>
          <Tooltip label="More information">Hover me</Tooltip>
        </div>
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
      return <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Current' },
        ]}
      />;
    case 16:
      return <PaginationExample />;
    case 17:
      return (
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      );
    case 18:
      return (
        <div className="flex items-center gap-4">
          <Spinner />
          <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
        </div>
      );
    case 19:
      return (
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
      );
    case 20:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Product card preview</p>
          <ProductCard />
        </div>
      );
    case 21:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">User profile card preview</p>
          <UserCard />
        </div>
      );
    case 22:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pricing card preview</p>
          <PricingCard />
        </div>
      );
    case 23:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Blog card preview</p>
          <BlogCard />
        </div>
      );
    case 24:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Dashboard overview preview</p>
          <DashboardCard />
        </div>
      );
    case 25:
      return (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Analytics summary preview</p>
          <AnalyticsCard />
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
  
  const selectedComponent = componentsData.find((item) => item.id === selectedId) ?? componentsData[0];

  const results = useMemo(() => {
    return componentsData.filter((component) => {
      const matchesCategory = category === 'All' || component.category === category;
      const matchesQuery = component.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Component library</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Reusable UI Components
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-slate-600 dark:text-slate-300">
            Browse, preview, and copy production-ready components for your design system.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="sticky top-20 h-fit space-y-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
            <div className="space-y-4">
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
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      category === option
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {results.map((component) => (
                <button
                  key={component.id}
                  type="button"
                  onClick={() => setSelectedId(component.id)}
                  className={`w-full rounded-xl border p-3 text-left transition-all duration-200 ${
                    selectedComponent.id === component.id
                      ? 'border-indigo-500 bg-white text-slate-950 shadow-[0_0_20px_rgba(79,70,229,0.15)] dark:border-indigo-400 dark:bg-slate-800 dark:text-white'
                      : 'border-transparent bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-transparent dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <p className="text-sm font-medium">{component.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{component.category}</p>
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Selected component</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{selectedComponent.name}</h2>
                
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {/* @ts-ignore - Hiển thị độ khó từ metadata */}
                  {selectedComponent.difficulty && (
                    <Badge variant={selectedComponent.difficulty === 'Hard' ? 'warning' : 'success'}>
                      {selectedComponent.difficulty}
                    </Badge>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {/* @ts-ignore - Hiển thị danh sách tags */}
                    {selectedComponent.tags?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-lg leading-7 text-slate-500 dark:text-slate-400 max-w-2xl font-normal">{selectedComponent.description}</p>
              </div>
              <Button type="button" variant="secondary" onClick={copyCode}>
                Copy source
              </Button>
            </div>

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
                    <button
                      key={component.id}
                      type="button"
                      onClick={() => setSelectedId(component.id)}
                      className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
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
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} />
    </section>
  );
}
