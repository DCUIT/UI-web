'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, AlertTriangle, ChevronDown, ExternalLink,
  FileWarning, Bug, FlaskConical, Paintbrush, Copy, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorEntry {
  id: string;
  title: string;
  category: 'react' | 'nextjs' | 'typescript' | 'sandpack' | 'css';
  description: string;
  cause: string;
  solution: string;
  code?: string;
  link?: string;
}

const ERROR_WIKI: ErrorEntry[] = [
  {
    id: 'hydration-mismatch',
    title: 'Hydration Mismatch',
    category: 'nextjs',
    description: 'The server-rendered HTML does not match what the client expected on first render.',
    cause: 'Using browser-only APIs (window, localStorage, document) during server-side render. Or having dynamic content that differs between server and client (e.g., Date.now(), Math.random(), or user-specific data without proper suppression).',
    solution: 'Wrap browser-dependent code in useEffect or use a dynamic import with ssr: false. For components that must differ, suppress hydration with suppressHydrationWarning on the HTML element.',
    code: `// ❌ Bad: runs on server too
const width = window.innerWidth;

// ✅ Good: only runs on client
const [width, setWidth] = useState(0);
useEffect(() => setWidth(window.innerWidth), []);

// ✅ Or use dynamic import with ssr:false
const ClientOnly = dynamic(() => import('./Heavy'), { ssr: false });`,
    link: 'https://nextjs.org/docs/messages/react-hydration-error',
  },
  {
    id: 'missing-key',
    title: 'Missing "key" Prop in List',
    category: 'react',
    description: 'Each child in a list should have a unique "key" prop.',
    cause: 'Rendering an array without providing a unique key prop to each element. React uses keys to identify which items changed, are added, or are removed.',
    solution: 'Always provide a stable, unique key for each item. Use the item ID if available, or the index as a last resort (only for static lists). Avoid using Math.random() or Date.now() as keys.',
    code: `// ❌ Bad
{items.map((item, i) => <div>{item.name}</div>)}

// ✅ Good - use unique id
{items.map(item => <div key={item.id}>{item.name}</div>)}

// ✅ Acceptable - stable index (static list only)
{items.map((item, i) => <div key={i}>{item.name}</div>)}`,
  },
  {
    id: 'cannot-read-props',
    title: 'Cannot read properties of undefined',
    category: 'react',
    description: 'Trying to access a property on an undefined value, typically before data has loaded.',
    cause: 'Rendering a component before its data is available. Common with async data fetching, optional props, or nested object access without optional chaining.',
    solution: 'Use optional chaining (?.), nullish coalescing (??), or guard clauses. Always provide default values or loading states for async data.',
    code: `// ❌ Bad
user.name  // Error if user is undefined

// ✅ Good - optional chaining
user?.name

// ✅ Good - default value
user?.name ?? 'Guest'

// ✅ Good - guard clause
if (!user) return <Skeleton />;
return <p>{user.name}</p>;`,
  },
  {
    id: 'too-many-rerenders',
    title: 'Too Many Re-renders',
    category: 'react',
    description: 'React limits the number of renders to prevent an infinite loop.',
    cause: 'Calling a state setter directly during render instead of in an event handler or useEffect. This causes an immediate re-render, which calls the setter again, creating an infinite loop.',
    solution: 'Move state updates into event handlers, useEffect callbacks, or use functional updates. Never call setState directly in the render body.',
    code: `// ❌ Bad - infinite loop
function Bad() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // called every render!
}

// ✅ Good - in event handler
function Good() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}

// ✅ Good - in useEffect
useEffect(() => { setCount(5); }, []);`,
  },
  {
    id: 'missing-dep-effect',
    title: 'useEffect Missing Dependencies',
    category: 'react',
    description: 'React Hook useEffect has a missing dependency. Either include it or remove the dependency array.',
    cause: 'Using variables inside useEffect that are not listed in the dependency array. This leads to stale closures and bugs.',
    solution: 'Add all reactive values used inside the effect to the dependency array. If you intentionally want to run the effect only once, make sure you are not using any changing values.',
    code: `// ❌ Bad - missing dependency
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);  // missing count in deps!
}, []);

// ✅ Good - include dependency
useEffect(() => {
  console.log(count);
}, [count]);

// ✅ Good - if you really mean it
useEffect(() => {
  console.log(count);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);`,
  },
  {
    id: 'sandpack-timeout',
    title: 'Sandpack Bundle Timeout',
    category: 'sandpack',
    description: 'Sandpack preview fails to load or times out.',
    cause: 'Missing dependencies, syntax error in the code, or importing modules not listed in customSetup.dependencies. The bundler times out waiting for resolution.',
    solution: 'Check that all imported packages are listed in customSetup.dependencies. Ensure the code has no syntax errors. Add the Tailwind CDN via index.html if using Tailwind classes.',
    code: `// ❌ Bad - missing dependency
import { motion } from 'framer-motion';
// framer-motion not in customSetup.dependencies

// ✅ Good
<SandpackProvider
  customSetup={{
    dependencies: {
      'framer-motion': 'latest',  // included!
    }
  }}
>`,
  },
  {
    id: 'tailwind-not-working',
    title: 'Tailwind CSS Not Applied',
    category: 'css',
    description: 'Tailwind classes show no effect in the Sandpack preview.',
    cause: 'Tailwind CSS requires a build step or CDN. In Sandpack, there is no Tailwind PostCSS plugin, so you must use the CDN script tag.',
    solution: 'Add the Tailwind CDN script to a hidden /index.html file in the SandpackProvider files prop.',
    code: `// Add this to your Sandpack files:
files={{
  '/index.html': {
    code: '<script src="https://cdn.tailwindcss.com"></script>',
    hidden: true
  }
}}`,
  },
  {
    id: 'typescript-sandpack',
    title: 'TypeScript Errors in Sandpack',
    category: 'sandpack',
    description: 'TypeScript errors appear in the Sandpack console or preview fails.',
    cause: 'Sandpack uses the react-ts template which type-checks the code. Common issues: missing type annotations, using non-TypeScript syntax, or importing types incorrectly.',
    solution: 'Ensure all paramters are typed in function signatures. Use inline type annotations. For simple demos, use default values instead of explicit types.',
    code: `// ❌ Bad - missing types
function App({ name }) { ... }

// ✅ Good - default values work as types
function App({ name = "World" }) { ... }

// ✅ Also good - inline types
function App({ name }: { name: string }) { ... }`,
  },
  {
    id: 'css-specificity',
    title: 'CSS Specificity Conflicts',
    category: 'css',
    description: 'Styles are not being applied due to CSS specificity conflicts.',
    cause: 'Tailwind uses utility classes with low specificity. If you add custom CSS that uses the same properties with higher specificity, it can override Tailwind. Also, the order of CSS in the file matters.',
    solution: 'Use Tailwind utilities directly in JSX rather than custom CSS when possible. If using custom CSS, use the same selector specificity. Use !important as a last resort.',
    code: `// ❌ Bad - class has higher specificity
.myClass { color: red; }
<div className="myClass text-blue-500">Still red</div>

// ✅ Good - utility classes inline
<div className="text-blue-500">Blue text</div>

// ✅ OK - important override
.myClass { color: blue !important; }`,
  },
  {
    id: 'next-image',
    title: 'next/image Configuration',
    category: 'nextjs',
    description: 'next/image component errors about hostname configuration or layout.',
    cause: 'next/image requires the image hostname to be configured in next.config.js. Also, older Next.js versions required width/height or layout="fill".',
    solution: 'Add the image hostname to next.config.js. Use the fill prop with a parent container for responsive images, or specify explicit width and height.',
    code: `// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
  },
};

// Usage with fill
<div className="relative w-full h-64">
  <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
</div>`,
  },
];

const CATEGORIES = [
  { id: 'react', label: 'React', icon: Bug },
  { id: 'nextjs', label: 'Next.js', icon: FileWarning },
  { id: 'typescript', label: 'TypeScript', icon: Bug },
  { id: 'sandpack', label: 'Sandpack', icon: FlaskConical },
  { id: 'css', label: 'CSS / Tailwind', icon: Paintbrush },
] as const;

export default function ErrorsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = ERROR_WIKI;
    if (category) result = result.filter(e => e.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.cause.toLowerCase().includes(q));
    }
    return result;
  }, [category, search]);

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Category sidebar */}
      <aside className="w-52 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search errors..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs outline-none focus:border-indigo-500 dark:text-white" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button onClick={() => setCategory(null)}
            className={cn("w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all",
              !category ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
            )}>
            All ({ERROR_WIKI.length})
          </button>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = ERROR_WIKI.filter(e => e.category === cat.id).length;
            const isActive = category === cat.id;
            return (
              <button key={cat.id} onClick={() => setCategory(isActive ? null : cat.id)}
                className={cn("w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2",
                  isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                )}>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1">{cat.label}</span>
                <span className="text-[10px] text-slate-400">{count}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Error Wiki</h2>
            <p className="text-sm text-slate-500 mt-1">{filtered.length} common errors explained with causes and fixes.</p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500">No errors match your search.</p>
            </div>
          ) : (
            filtered.map(error => {
              const isOpen = expanded === error.id;
              return (
                <div key={error.id} className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  isOpen
                    ? 'border-indigo-200 dark:border-indigo-800 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                )}>
                  <button onClick={() => setExpanded(isOpen ? null : error.id)}
                    className="flex items-start gap-3 w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      error.category === 'react' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                      error.category === 'nextjs' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' :
                      error.category === 'typescript' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      error.category === 'sandpack' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    )}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{error.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{error.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
                          error.category === 'react' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                          error.category === 'nextjs' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' :
                          error.category === 'typescript' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          error.category === 'sandpack' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        )}>{error.category}</span>
                      </div>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 mt-1 shrink-0 text-slate-400 transition-transform", isOpen && "rotate-180")} />
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
                        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                          {/* Cause */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Cause</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{error.cause}</p>
                          </div>

                          {/* Solution */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Solution</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{error.solution}</p>
                          </div>

                          {/* Code */}
                          {error.code && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Example</h4>
                                <button onClick={() => copyCode(error.code!, error.id)}
                                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                  {copied === error.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                  {copied === error.id ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                              <pre className="rounded-xl bg-slate-950 p-3 text-xs font-mono leading-relaxed text-emerald-400 overflow-x-auto">
                                <code>{error.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* External link */}
                          {error.link && (
                            <a href={error.link} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">
                              <ExternalLink className="w-3 h-3" />
                              Read more on Next.js docs
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
