'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Type, Square, Database, Layers, Code2, Palette, Accessibility, Library, Box, BookOpen, FlaskConical, type LucideIcon } from 'lucide-react'
import { COMPONENT_REGISTRY, getAllCategories } from '@/lib/registry'

type CategoryItem = { name: string; href: string; icon?: LucideIcon }
type Category = { name: string; items: CategoryItem[] }

const categoryIcons: Record<string, LucideIcon> = {
  'Atoms': Square,
  'Molecules': Box,
  'Forms': Type,
  'Data': Database,
  'Overlays': Layers,
  'Screens': LayoutGrid,
};

const registryCategories = getAllCategories().map(cat => {
  const Icon = categoryIcons[cat] || FlaskConical;
  return {
    name: cat,
    items: COMPONENT_REGISTRY
      .filter(c => c.category === cat)
      .map(c => ({ name: c.name, href: `/test/mobile?id=${c.id}`, icon: Icon }))
  };
});

const categories: Category[] = [
  { name: 'Getting Started', items: [{ name: 'Introduction', href: '/', icon: Square }] },
  ...registryCategories,
  { name: 'Playgrounds', items: [
    { name: 'Main Playground', href: '/playground', icon: Code2 },
    { name: 'Tailwind Lab', href: '/playground/tailwind-lab', icon: Palette },
    { name: 'Animation Studio', href: '/playground/animation-studio', icon: Layers },
    { name: 'A11y Auditor', href: '/playground/a11y-auditor', icon: Accessibility },
  ]},
  { name: 'Patterns', items: [
    { name: 'Gallery & Snippets', href: '/patterns', icon: Library },
  ]},
  { name: 'System', items: [
    { name: 'Architecture Map', href: '/architecture', icon: Box },
    { name: 'Error Wiki', href: '/errors', icon: BookOpen },
  ]},
  { name: 'Testing', items: [
    { name: 'Web Sandbox', href: '/test/web', icon: Layers },
    { name: 'Mobile Sandbox', href: '/test/mobile', icon: Layers },
  ]}
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category.name}>
          <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {category.name}
          </h4>
          <div className="space-y-1">
            {category.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`}
              >
                {item.icon && <item.icon size={16} />}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}
