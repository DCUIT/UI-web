'use client';

import React, { useState } from 'react';
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
import ProductCard from '@/components/cards/ProductCard';
import UserCard from '@/components/cards/UserCard';
import PricingCard from '@/components/cards/PricingCard';
import BlogCard from '@/components/cards/BlogCard';
import DashboardCard from '@/components/cards/DashboardCard';
import AnalyticsCard from '@/components/cards/AnalyticsCard';
import type { Component as UIComponent } from '@/types/component';

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

export function renderPreview(component: UIComponent) {
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