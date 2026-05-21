# Architecture - UI Platform

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js 14 App Router                                      │
│  ├── Root Layout (Providers: theme, etc.)                   │
│  │   ├── (main) Layout → AppShell → Pages with chrome       │
│  │   └── (fullscreen) Layout → Pages without chrome         │
└─────────────────────────────────────────────────────────────┘
```

---

## Layout Architecture

### Root Layout (`app/layout.tsx`)

```
<html>
  <body>
    <Providers>
      {children}
    </Providers>
  </body>
</html>
```

**Responsibility:** Theme providers, global CSS, metadata.
**NEVER wraps AppShell.**

### Main Layout (`(main)/layout.tsx`)

```
<AppShell>
  <SidebarProvider>
    <ShellClient>
      <div flex h-screen>
        <Sidebar />        ← Desktop only (hidden lg:flex)
        <div flex-1>
          <Navbar />       ← Top bar (single header)
          <main>           ← Scrollable content
            {children}
          </main>
          <Footer />
          <BottomNavbar /> ← Mobile only (md:hidden)
        </div>
      </div>
    </ShellClient>
  </SidebarProvider>
</AppShell>
```

**Responsibility:** Full app chrome for main routes.

### Fullscreen Layout (`(fullscreen)/layout.tsx`)

```
<>{children}</>
```

**Responsibility:** Bare pages for sandbox/test environments.

---

## Component Architecture

### Shell Components (`src/components/common/`)

| Component | Purpose |
|-----------|---------|
| `AppShell` | Main layout wrapper (Sidebar + Navbar + Main + Footer) |
| `ShellClient` | Mobile menu context provider (no UI) |
| `Navbar` | Top navigation bar (logo, links, search, theme toggle) |
| `Footer` | Site footer |
| `Sidebar` | Placeholder (actual sidebar in navigation/) |

### Navigation (`src/components/navigation/`)

| Component | Purpose | Visibility |
|-----------|---------|------------|
| `Sidebar` | Collapsible sidebar with grouped nav | Desktop (`lg:`) |
| `SidebarToggle` | Expand/collapse button | Desktop |
| `SidebarContext` | Sidebar state management | Global |
| `BottomNavbar` | Bottom tab bar | Mobile (`md:hidden`) |
| `Navbar` | Top bar (in common/) | All |
| `CommandMenu` | Ctrl/Cmd+K palette | All |
| `MegaMenu` | Dropdown navigation | Desktop |
| `MobileMenu` | Slide-out menu | Mobile |
| `SearchBar` | Component search | All |
| `Topbar` | Welcome bar (currently unused) | - |

### UI Primitives (`src/components/ui/`)

25+ reusable components:
- **Buttons:** Button
- **Forms:** Input, Textarea, Select, Checkbox, Radio, Switch
- **Feedback:** Toast, Badge, Skeleton, Spinner
- **Navigation:** Tabs, Breadcrumb, Pagination, Dropdown, Accordion
- **Overlays:** Modal, Tooltip
- **Data:** DataTable, Table
- **Layout:** Card
- **Theme:** ThemeToggle
- **Charts:** MiniChart

### Cards (`src/components/cards/`)

6 self-contained demo components:
- AnalyticsCard, BlogCard, DashboardCard, PricingCard, ProductCard, UserCard

### Sections (`src/components/sections/`)

Landing page sections:
- Hero, Categories, Features, DashboardSection, Pricing, Templates, CTA

### Discovery (`src/components/discovery/`)

- `ComponentPreview` - Preview wrapper with code display
- `ComponentRegistry` - Component rendering logic

---

## Route Map

| Route | Layout | Description |
|-------|--------|-------------|
| `/` | (main) | Landing page with sections |
| `/components` | (main) | Component library browser |
| `/playground` | (main) | Live code sandbox |
| `/test` | (main) | Test hub |
| `/test/mobile` | (fullscreen) | Mobile sandbox (Sandpack) |
| `/test/web` | (fullscreen) | Web sandbox (HTML/CSS/JS) |

---

## Data Flow

### Component Library Browser (`/components`)

```
URL searchParams → useSearchParams()
  ↓
query, category, id, viewMode
  ↓
filter(componentsData) → results
  ↓
selectedComponent → renderPreview()
  ↓
Preview panel | Code panel | Component grid
```

### Playground (`/playground`)

```
User input (Monaco) → TSX code
  ↓
Babel.transform() → compiled JS
  ↓
iframe srcDoc (React 18 + Tailwind CDN)
  ↓
postMessage → console logs
  ↓
Console panel
```

### Theme System

```
next-themes (ThemeProviders)
  ↓
localStorage persistence
  ↓
html class "dark"
  ↓
Tailwind dark: variants
```

---

## State Management

| State | Location | Method |
|-------|----------|--------|
| Theme | `providers.tsx` | next-themes |
| Sidebar | `SidebarContext.tsx` | React Context |
| Mobile Menu | `ShellClient.tsx` | React Context |
| Playground | `playground/page.tsx` | useState + localStorage |
| Component Browser | `components/page.tsx` | URL searchParams |
| Command Menu | `CommandMenu.tsx` | Window event listener |

---

## Performance Architecture

### Code Splitting Points

```
dynamic() - Heavy components:
  - Monaco Editor (playground)
  - Sandpack (mobile sandbox)
  - MegaMenu (navigation)
  - SearchBar (navigation)
  - CommandMenu (navigation)
  - Sidebar (navigation)
  - BottomNavbar (navigation)
  - DashboardSection (landing)

lazy() + Suspense - UI components:
  - Modal, Dropdown, Tabs, Accordion
  - Pagination, Textarea, Select
  - Checkbox, Radio, Switch
  - Avatar, Tooltip, Breadcrumb
  - Skeleton, Spinner, DataTable
```

### Debounce Points

- Playground sandbox update: 800ms
- Search input: (if implemented)

---

## File Conventions

| File Type | Naming | Export |
|-----------|--------|--------|
| Page | `page.tsx` | default export |
| Layout | `layout.tsx` | default export |
| Component | `ComponentName.tsx` | default export |
| Hook | `useHookName.ts` | named export |
| Utility | `utilityName.ts` | named export |
| Type | `typeName.ts` | named export/type |
| Data | `dataName.ts` | named export |

---

## Design Tokens

### Colors (Tailwind)

| Token | Usage |
|-------|-------|
| `slate-950` to `slate-50` | Primary neutral palette |
| `indigo-600`, `indigo-500` | Primary accent |
| `sky-500`, `sky-400` | Secondary accent (brand) |
| `emerald-500` | Success state |
| `amber-500` | Warning state |
| `red-500` | Error state |

### Spacing

- Section gaps: `space-y-24` (landing), `space-y-6` (pages)
- Card padding: `p-5`, `p-6`
- Component gaps: `gap-2`, `gap-3`, `gap-4`, `gap-6`

### Border Radius

- Cards: `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- Buttons: `rounded-lg`, `rounded-2xl`
- Inputs: `rounded-lg`, `rounded-xl`

### Shadows

- Cards: `shadow-sm`, `shadow-xl`
- Custom: `boxShadow.card` = `0 20px 60px rgba(15, 23, 42, 0.08)`

---

## Testing

| Tool | Purpose |
|------|---------|
| Jest + ts-jest | Unit tests |
| @testing-library/react | Component tests |
| jest-axe | Accessibility tests |
| Playwright | E2E tests (configured) |

Test files: `*.test.tsx`, `*.test.ts` (excluded from tsconfig)

---

## Build Configuration

| Tool | Config File |
|------|-------------|
| Next.js | `next.config.mjs` |
| TypeScript | `tsconfig.json` |
| TailwindCSS | `tailwind.config.ts` |
| PostCSS | `postcss.config.cjs` |
| Babel | `babel.config.cjs.bak` (unused) |
| Jest | `jest.config.cjs` |
