# AI Rules - UI Platform

This document defines how AI should read, write, and modify code in this project.

---

## Project Overview

A UI component library + live code playground platform.

**Tech Stack:**
- Next.js 14.2.5 (App Router)
- TypeScript (strict mode)
- TailwindCSS 3.4 (class-based dark mode)
- React 18.3
- Framer Motion (animations)
- Monaco Editor (code editing)
- Babel Standalone (runtime TSX compilation)
- Sandpack (mobile sandbox)
- cmdk (command palette)
- next-themes (theme management)

---

## Architecture Rules

### Layout Hierarchy

```
RootLayout (app/layout.tsx)
  Providers (theme, etc.)
    children

(main)/layout.tsx
  AppShell
    SidebarProvider
      ShellClient (mobile menu context only)
        Sidebar (left, desktop)
        Navbar (top)
        Main content (scrollable)
        Footer
        BottomNavbar (mobile only)

(fullscreen)/layout.tsx
  <>children</> (no chrome)
```

### CRITICAL: Never duplicate AppShell

- `app/layout.tsx` must NOT wrap children with AppShell
- Only `(main)/layout.tsx` wraps with AppShell
- `(fullscreen)/layout.tsx` returns bare children
- Result: each page gets exactly ONE Navbar, ONE Sidebar

### Route Groups

| Group | Chrome | Routes |
|-------|--------|--------|
| `(main)` | Full AppShell | `/`, `/components`, `/playground`, `/test` |
| `(fullscreen)` | None | `/test/mobile`, `/test/web` |

### Page Rules

- `page.tsx` files return ONLY core content wrapped in `<div>` or `<main>`
- NO Navbar, Sidebar, Topbar, Footer in pages
- NO layout chrome in pages
- All chrome comes from AppShell

---

## Folder Structure

```
src/
  app/                    # Next.js App Router
    (main)/               # Pages with AppShell
    (fullscreen)/         # Pages without chrome
  components/
    ui/                   # Reusable primitives (Button, Input, Modal, etc.)
    cards/                # Demo card components (self-contained, no props)
    common/               # AppShell, Navbar, Footer, ShellClient
    navigation/           # Sidebar, BottomNavbar, CommandMenu, MegaMenu, etc.
    sections/             # Landing page sections (Hero, Features, Pricing, etc.)
    discovery/            # Component preview/registry
    templates/            # Page templates
    mobile-playground/    # Mobile sandbox components
  data/                   # Static data (components.ts)
  hooks/                  # Custom hooks
  lib/                    # Utilities (cn, seo)
  services/               # API wrappers
  styles/                 # Global CSS, typography
  types/                  # TypeScript type definitions
```

### No `features/` folder

Feature logic lives in page components or dedicated component subdirectories.

---

## Code Style

### TypeScript

- Strict mode enabled
- Use interfaces for component props
- Use type aliases for simple unions
- Always type function returns
- No `any` unless unavoidable

### React

- Functional components only
- Named exports (no default unless page.tsx or layout.tsx)
- Prefer composition over prop explosion
- Use `React.memo` for expensive renders
- Use `useMemo`/`useCallback` where it matters

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `DataTable.tsx` |
| Hooks | camelCase, `use` prefix | `useTheme.ts`, `useMobileMenu()` |
| Utils | camelCase, verb prefix | `generateReactCode.ts`, `cn()` |
| Types | PascalCase | `ButtonProps`, `TabItem` |
| Constants | UPPER_SNAKE_CASE | `COMPONENT_REGISTRY` |

### TailwindCSS

- Use utility classes only (no inline styles)
- Dark mode: `dark:` prefix
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Use `cn()` from `@/lib/utils` for conditional classes
- Prefer semantic spacing: `p-4`, `gap-6`, `space-y-6`

### Component Props Pattern

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...rest} />
  );
}
```

---

## UI Rules

### Dark Mode

- Every component MUST support dark mode
- Use `dark:` Tailwind prefix
- Test both light and dark variants
- Colors: slate palette for neutrals, indigo/sky for accents

### Responsiveness

- Mobile-first approach
- Every component must work on mobile, tablet, desktop
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- BottomNavbar visible only on mobile (`md:hidden`)
- Sidebar visible only on desktop (`hidden lg:flex`)

### Accessibility

- Use semantic HTML (`<nav>`, `<main>`, `<header>`, `<footer>`)
- Add `aria-label`, `aria-pressed`, `aria-expanded` where appropriate
- Keyboard navigation support
- Focus visible states
- Skip-to-content link in AppShell

---

## Component Library Rules

### UI Components (`src/components/ui/`)

- Self-contained, reusable primitives
- Support dark mode and responsive layouts
- Extend native HTML element props when possible
- Use `cn()` for conditional class merging
- No side effects, no global state

### Card Components (`src/components/cards/`)

- Self-contained demo components
- No props (hardcoded content for preview)
- Used in component library browser

### Navigation Components (`src/components/navigation/`)

- Sidebar: collapsible, grouped navigation
- Navbar: top bar with logo, nav links, search, theme toggle
- BottomNavbar: mobile-only bottom navigation
- CommandMenu: Ctrl/Cmd+K palette
- MegaMenu: dropdown navigation
- MobileMenu: slide-out mobile menu

---

## Playground Rules

### Main Playground (`/playground`)

- Monaco Editor: lazy loaded via `@monaco-editor/react`
- Babel Standalone: runtime TSX compilation
- Preview: iframe sandbox with React 18 + Tailwind CDN
- Device frames: desktop (900x600), mobile portrait/landscape
- Auto-save drafts to localStorage
- Share: Base64-encoded URL params
- Export: download as .tsx file
- Console: capture iframe postMessage logs

### Mobile Sandbox (`/test/mobile`)

- Sandpack-based live editing
- PhoneFrame wrapper for device simulation
- Fullscreen layout (no AppShell chrome)

### Web Sandbox (`/test/web`)

- HTML/CSS/JS editor
- iframe preview
- Fullscreen layout (no AppShell chrome)

---

## Performance Rules

### Code Splitting

- Use `dynamic()` for heavy components (Monaco, Sandpack, MegaMenu)
- Use `lazy()` + `Suspense` for UI components in component browser
- Always provide loading fallbacks

### Bundle Size

- Avoid importing entire libraries when partial imports work
- Use `next/dynamic` with `ssr: false` for client-only components
- Monaco: load only needed languages

### Rendering

- Use `useMemo` for expensive computations (filtering, sorting)
- Use `useCallback` for stable function references
- Debounce iframe sandbox updates (800ms)

---

## Export Rules

Generated code must be:
- Clean, copy-paste ready
- No unnecessary wrappers
- Include proper TypeScript types
- Support dark mode
- Be responsive

Supported export formats:
- React TSX (current)
- HTML/CSS (current via web sandbox)
- React Native (future)

---

## Anti-Patterns (DO NOT)

- Do NOT add AppShell to `app/layout.tsx`
- Do NOT put Navbar/Sidebar/Footer in page.tsx files
- Do NOT use inline styles (use Tailwind)
- Do NOT use `any` type
- Do NOT rewrite unrelated code when editing
- Do NOT break existing routes
- Do NOT add default exports to non-page components
- Do NOT duplicate layout chrome
- Do NOT add side effects to component files
- Do NOT use `useState` for derived state (use `useMemo`)

---

## When Generating Components

1. Prioritize clean, modern UI
2. Use TailwindCSS exclusively
3. Support dark mode with `dark:` prefix
4. Make responsive (mobile-first)
5. Add proper TypeScript types
6. Keep code production-ready
7. Avoid excessive complexity
8. Use semantic HTML
9. Add accessibility attributes
10. Follow existing component patterns

---

## When Editing Existing Code

1. Preserve the existing architecture
2. Match the existing code style
3. Do not break existing routes
4. Do not rewrite unrelated code
5. Run type check after changes (`npx tsc --noEmit`)
6. Test both light and dark mode implications
7. Keep commits focused and atomic
