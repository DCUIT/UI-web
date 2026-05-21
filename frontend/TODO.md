# TODO - UI Platform Roadmap

## Completed

- [x] AppShell architecture (Sidebar + Navbar + Main + Footer)
- [x] Route groups: (main) and (fullscreen)
- [x] Duplicate header fix (single Navbar)
- [x] Dark mode support (next-themes)
- [x] Component library browser (25 components)
- [x] Playground with Monaco Editor + Babel
- [x] Mobile sandbox (Sandpack + PhoneFrame)
- [x] Web sandbox (HTML/CSS/JS)
- [x] Command palette (Ctrl/Cmd+K)
- [x] Theme toggle
- [x] Responsive layouts (mobile-first)
- [x] Custom scrollbar styles
- [x] AI rules and architecture documentation

---

## In Progress

### Playground Enhancements
- [ ] Resizable split panes (editor ↔ preview)
- [ ] Share playground via URL (Base64 encoding - partially done)
- [ ] Export component as .tsx file (partially done)

---

## Next Steps (Priority Order)

### 1. Sidebar Content
**Priority:** High
**Location:** `src/components/navigation/Sidebar.tsx`

Current state: Placeholder/stub.
Action needed:
- Add navigation items matching Navbar routes
- Group by category (Pages, Components, Tools)
- Add collapse/expand animation
- Sync with `SidebarContext` state

### 2. Component Library Improvements
**Priority:** High
**Location:** `src/app/(main)/components/page.tsx`

- [ ] Add search input UI (currently URL-only)
- [ ] Add view mode toggle (individual vs collections)
- [ ] Add category filter dropdown
- [ ] Add pagination or infinite scroll
- [ ] Improve code syntax highlighting in preview

### 3. Playground Architecture Refactor
**Priority:** Medium
**Location:** `src/app/(main)/playground/page.tsx`

Current state: Single 850-line file.
Proposed structure:
```
src/features/playground/
  editor/       # Monaco editor wrapper
  preview/      # iframe sandbox + device frames
  runtime/      # Babel compilation logic
  registry/     # Component registry
  controls/     # Props controls panel
  hooks/        # usePlaygroundState, useSandbox
  types/        # Playground types
```

### 4. AI Code Generation
**Priority:** Medium
**Location:** `src/features/ai/` (new)

- [ ] Connect AI prompt to actual API (OpenAI/Gemini)
- [ ] Add streaming response support
- [ ] Add code validation before applying
- [ ] Add version history for AI-generated code

### 5. Component Export System
**Priority:** Medium

- [ ] Export as React TSX file
- [ ] Export as HTML/CSS
- [ ] Export as CodeSandbox snippet
- [ ] Export as StackBlitz project
- [ ] Add npm package generation

### 6. Testing Infrastructure
**Priority:** Medium

- [ ] Fix Jest TypeScript config
- [ ] Add component unit tests
- [ ] Add accessibility tests (jest-axe)
- [ ] Add Playwright E2E tests
- [ ] Add visual regression tests

### 7. Performance Optimization
**Priority:** Low

- [ ] Implement virtual scrolling for component grid
- [ ] Optimize Monaco Editor bundle size
- [ ] Add route-level code splitting
- [ ] Implement image optimization
- [ ] Add service worker for offline support

### 8. Mobile Experience
**Priority:** Low

- [ ] Improve mobile menu UX
- [ ] Add gesture support (swipe to open sidebar)
- [ ] Optimize touch targets
- [ ] Add pull-to-refresh
- [ ] Improve mobile playground editing

---

## Future Vision

### Phase 1: Polish (Current)
- Complete sidebar
- Improve component browser
- Refactor playground

### Phase 2: AI Integration
- AI code generation
- AI component suggestions
- AI-powered code review

### Phase 3: Collaboration
- Real-time collaboration
- Share playgrounds
- Component versioning
- Team workspaces

### Phase 4: Ecosystem
- Plugin system
- Custom component registry
- npm integration
- Figma sync

---

## Technical Debt

- [ ] Remove unused `babel.config.cjs.bak` and `babel.config.js.unused`
- [ ] Remove unused `Topbar.tsx` (replaced by Navbar)
- [ ] Clean up `TODO/` folder (migrate to this file)
- [ ] Fix test configuration
- [ ] Add ESLint rules
- [ ] Add Prettier configuration
- [ ] Add CI/CD pipeline
- [ ] Add error boundary components
