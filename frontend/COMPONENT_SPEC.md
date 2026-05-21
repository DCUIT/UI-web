# Component Specification - UI Platform

## Component Standards

All UI components must follow these standards.

---

## Base Component Template

```tsx
"use client";

import { cn } from "@/lib/utils";

type ComponentNameProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function ComponentName({
  variant = 'default',
  size = 'md',
  className,
  ...rest
}: ComponentNameProps) {
  return (
    <element
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    />
  );
}
```

---

## UI Components Registry

### Button

**File:** `src/components/ui/Button.tsx`

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style |
| `href` | `string` | - | If provided, renders as link |
| `className` | `string` | - | Additional classes |

**Supports:** dark mode, loading state, disabled state, icon slot

**Exports:** React

---

### Input

**File:** `src/components/ui/Input.tsx`

```ts
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional classes |

**Supports:** dark mode, all native input attributes

**Exports:** React

---

### Textarea

**File:** `src/components/ui/Textarea.tsx`

```ts
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};
```

**Supports:** dark mode, all native textarea attributes, auto-resize (future)

**Exports:** React (lazy loaded)

---

### Select

**File:** `src/components/ui/Select.tsx`

```ts
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};
```

**Supports:** dark mode, all native select attributes

**Exports:** React (lazy loaded)

---

### Checkbox

**File:** `src/components/ui/Checkbox.tsx`

```ts
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text next to checkbox |
| `className` | `string` | - | Additional classes |

**Supports:** dark mode, all native checkbox attributes

**Exports:** React (lazy loaded)

---

### Radio

**File:** `src/components/ui/Radio.tsx`

```ts
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};
```

**Supports:** dark mode, all native radio attributes, grouped by `name`

**Exports:** React (lazy loaded)

---

### Switch

**File:** `src/components/ui/Switch.tsx`

```ts
type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};
```

**Supports:** dark mode, all native checkbox attributes (uses checkbox internally)

**Exports:** React (lazy loaded)

---

### Badge

**File:** `src/components/ui/Badge.tsx`

```ts
type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color scheme |
| `className` | `string` | - | Additional classes |

**Supports:** dark mode

**Exports:** React

---

### Modal

**File:** `src/components/ui/Modal.tsx`

```ts
type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Visibility state |
| `onClose` | `() => void` | - | Close callback |
| `title` | `string` | - | Modal title |
| `children` | `ReactNode` | - | Modal content |

**Supports:** dark mode, ESC key close, backdrop click close, focus trap

**Exports:** React (lazy loaded)

---

### Toast

**File:** `src/components/ui/Toast.tsx`

```ts
type ToastProps = {
  message: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | - | Message to display |

**Supports:** auto-dismiss, dark mode

**Exports:** React

---

### Tabs

**File:** `src/components/ui/Tabs.tsx`

```ts
type TabItem = {
  value: string;
  label: string | React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  activeValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | - | Tab definitions |
| `activeValue` | `string` | first item | Active tab |
| `onValueChange` | `(value: string) => void` | - | Tab change callback |
| `className` | `string` | - | Additional classes |

**Supports:** dark mode, keyboard navigation

**Exports:** React (lazy loaded)

---

### Accordion

**File:** `src/components/ui/Accordion.tsx`

```ts
type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};
```

**Supports:** dark mode, animated expand/collapse

**Exports:** React (lazy loaded)

---

### Dropdown

**File:** `src/components/ui/Dropdown.tsx`

```ts
type DropdownItem = {
  label: string;
  onSelect: () => void;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  className?: string;
};
```

**Supports:** dark mode, click outside to close

**Exports:** React (lazy loaded)

---

### Tooltip

**File:** `src/components/ui/Tooltip.tsx`

```ts
type TooltipProps = {
  label: string;
  children: React.ReactNode;
};
```

**Supports:** dark mode, hover/focus trigger

**Exports:** React (lazy loaded)

---

### Avatar

**File:** `src/components/ui/Avatar.tsx`

```ts
type AvatarProps = {
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
};
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `alt` | `string` | - | Alt text (required) |
| `fallback` | `string` | - | Fallback initials |
| `className` | `string` | - | Additional classes |

**Supports:** dark mode, image error fallback

**Exports:** React (lazy loaded)

---

### Breadcrumb

**File:** `src/components/ui/Breadcrumb.tsx`

```ts
type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};
```

**Supports:** dark mode, optional links

**Exports:** React (lazy loaded)

---

### Pagination

**File:** `src/components/ui/Pagination.tsx`

```ts
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
};
```

**Supports:** dark mode, keyboard navigation

**Exports:** React (lazy loaded)

---

### Skeleton

**File:** `src/components/ui/Skeleton.tsx`

```ts
type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
```

**Supports:** dark mode, animate-pulse

**Exports:** React (lazy loaded)

---

### Spinner

**File:** `src/components/ui/Spinner.tsx`

```ts
type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
```

**Supports:** dark mode, animate-spin

**Exports:** React (lazy loaded)

---

### DataTable

**File:** `src/components/ui/DataTable.tsx`

```ts
type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?(row: T): React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  className?: string;
};
```

**Supports:** dark mode, sortable columns, pagination

**Exports:** React (lazy loaded)

---

### Card

**File:** `src/components/ui/Card.tsx`

```ts
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
```

**Supports:** dark mode

**Exports:** React

---

### ThemeToggle

**File:** `src/components/ui/ThemeToggle.tsx`

No props. Uses next-themes internally.

**Supports:** light/dark/system themes, localStorage persistence

**Exports:** React

---

### MiniChart

**File:** `src/components/ui/MiniChart.tsx`

```ts
type MiniChartProps = {
  width?: number;
  height?: number;
  data?: number[];
};
```

**Supports:** dark mode, SVG rendering

**Exports:** React

---

## Card Components (Demo)

All card components in `src/components/cards/` are self-contained demos with no props:

| Component | Description |
|-----------|-------------|
| `AnalyticsCard` | Dashboard analytics display |
| `BlogCard` | Blog post preview |
| `DashboardCard` | Dashboard metric card |
| `PricingCard` | Pricing tier display |
| `ProductCard` | Product showcase |
| `UserCard` | User profile card |

---

## Navigation Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Sidebar` | None | Collapsible sidebar navigation |
| `SidebarToggle` | None | Expand/collapse button |
| `BottomNavbar` | None | Mobile bottom tab bar |
| `CommandMenu` | None | Ctrl/Cmd+K command palette |
| `MegaMenu` | None | Dropdown navigation menu |
| `MobileMenu` | `{ open, onClose }` | Slide-out mobile menu |
| `SearchBar` | None | Component search input |

---

## Context Providers

### SidebarContext

```ts
interface SidebarContextType {
  collapsed: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}
```

Exports: `SidebarProvider`, `useSidebar`

### MobileMenuContext (via ShellClient)

```ts
interface MobileMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
```

Exports: `useMobileMenu` (via `ShellClient.tsx`)

---

## Adding a New Component

1. Create file in `src/components/ui/ComponentName.tsx`
2. Define props type extending native element props
3. Support dark mode with `dark:` prefix
4. Support responsive design
5. Use `cn()` for conditional classes
6. Add to component data registry if needed (`src/data/components.ts`)
7. Test in both light and dark mode
8. Test on mobile and desktop
