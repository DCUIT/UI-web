'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Box, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArchNodeData {
  label: string;
  type: 'provider' | 'layout' | 'shell' | 'page' | 'lib';
  file: string;
  description: string;
}

const NODE_TYPES = {
  provider: ProviderNode,
  layout: LayoutNode,
  shell: ShellNode,
  page: PageNode,
  lib: LibNode,
};

const initialNodes: Node[] = [
  { id: 'root', position: { x: 350, y: 0 }, data: { label: 'Root Layout', type: 'layout', file: 'app/layout.tsx', description: 'HTML + body + Providers' } },
  { id: 'theme', position: { x: 150, y: 100 }, data: { label: 'ThemeProvider', type: 'provider', file: 'app/providers.tsx', description: 'next-themes ThemeProvider + ThemeSync' } },
  { id: 'sidebar-ctx', position: { x: 400, y: 100 }, data: { label: 'SidebarProvider', type: 'provider', file: 'components/navigation/SidebarContext.tsx', description: 'Sidebar collapse/expand state context' } },
  { id: 'main-group', position: { x: 200, y: 220 }, data: { label: '(main) Layout', type: 'layout', file: 'app/(main)/layout.tsx', description: 'Wraps children in AppShell' } },
  { id: 'fullscreen-group', position: { x: 500, y: 220 }, data: { label: '(fullscreen) Layout', type: 'layout', file: 'app/(fullscreen)/layout.tsx', description: 'Minimal pass-through layout' } },
  { id: 'appshell', position: { x: 120, y: 340 }, data: { label: 'AppShell', type: 'shell', file: 'components/common/AppShell.tsx', description: 'Sidebar + Navbar + Footer + BottomNavbar' } },
  { id: 'sidebar', position: { x: 10, y: 440 }, data: { label: 'Sidebar', type: 'shell', file: 'components/navigation/Sidebar.tsx', description: 'Collapsible nav groups with links' } },
  { id: 'navbar', position: { x: 130, y: 440 }, data: { label: 'Navbar', type: 'shell', file: 'components/common/Navbar.tsx', description: 'Top bar with nav links + search + theme' } },
  { id: 'footer', position: { x: 250, y: 440 }, data: { label: 'Footer', type: 'shell', file: 'components/common/Footer.tsx', description: 'Site footer with links' } },
  { id: 'page-home', position: { x: 30, y: 560 }, data: { label: 'Home /', type: 'page', file: 'app/(main)/page.tsx', description: 'Hero, Features, Pricing, CTA' } },
  { id: 'page-components', position: { x: 160, y: 560 }, data: { label: 'Components /components', type: 'page', file: 'app/(main)/components/page.tsx', description: 'Component library browser with preview' } },
  { id: 'page-playground', position: { x: 310, y: 560 }, data: { label: 'Playground /playground', type: 'page', file: 'app/(main)/playground/page.tsx', description: 'Sandpack + Monaco editor + props controls' } },
  { id: 'page-patterns', position: { x: 460, y: 560 }, data: { label: 'Patterns /patterns', type: 'page', file: 'app/(main)/patterns/page.tsx', description: 'Pattern gallery + snippets + recipes' } },
  { id: 'page-test', position: { x: 590, y: 560 }, data: { label: 'Test UI /test', type: 'page', file: 'app/(main)/test/page.tsx', description: 'Test pages index' } },
  { id: 'page-tw', position: { x: 60, y: 670 }, data: { label: 'Tailwind Lab', type: 'page', file: 'app/(main)/playground/tailwind-lab/page.tsx', description: 'Interactive Tailwind class toggling' } },
  { id: 'page-anim', position: { x: 200, y: 670 }, data: { label: 'Animation Studio', type: 'page', file: 'app/(main)/playground/animation-studio/page.tsx', description: 'Framer Motion physics controls' } },
  { id: 'page-a11y', position: { x: 340, y: 670 }, data: { label: 'A11y Auditor', type: 'page', file: 'app/(main)/playground/a11y-auditor/page.tsx', description: 'Accessibility static analysis tool' } },
  { id: 'page-arch', position: { x: 480, y: 670 }, data: { label: 'Architecture', type: 'page', file: 'app/(main)/architecture/page.tsx', description: 'Visual architecture map' } },
  { id: 'page-errors', position: { x: 600, y: 670 }, data: { label: 'Error Wiki', type: 'page', file: 'app/(main)/errors/page.tsx', description: 'Common errors with fixes' } },
  { id: 'lib-registry', position: { x: 100, y: 780 }, data: { label: 'Component Registry', type: 'lib', file: 'lib/registry.ts', description: 'Component definitions + encyclopedia data' } },
  { id: 'lib-utils', position: { x: 280, y: 780 }, data: { label: 'Utils', type: 'lib', file: 'lib/utils.ts', description: 'cn() + shared helpers' } },
  { id: 'lib-props', position: { x: 460, y: 780 }, data: { label: 'Props Parser', type: 'lib', file: 'lib/props-parser.ts', description: 'Regex-based TSX prop extraction' } },
  { id: 'lib-data', position: { x: 620, y: 780 }, data: { label: 'Data / Types', type: 'lib', file: 'data/components.ts', description: 'Component data + type definitions' } },
];

const initialEdges: Edge[] = [
  // Root → Providers
  { id: 'e-root-theme', source: 'root', target: 'theme', animated: true, style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } },
  { id: 'e-root-sidebar-ctx', source: 'root', target: 'sidebar-ctx', animated: true, style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } },

  // Providers → Route Groups
  { id: 'e-theme-main', source: 'theme', target: 'main-group', style: { stroke: '#94a3b8' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e-theme-full', source: 'theme', target: 'fullscreen-group', style: { stroke: '#94a3b8' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },

  // Route Groups → Shell
  { id: 'e-main-appshell', source: 'main-group', target: 'appshell', style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } },

  // AppShell → Components
  { id: 'e-shell-sidebar', source: 'appshell', target: 'sidebar', style: { stroke: '#8b5cf6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-shell-navbar', source: 'appshell', target: 'navbar', style: { stroke: '#8b5cf6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-shell-footer', source: 'appshell', target: 'footer', style: { stroke: '#8b5cf6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },

  // AppShell → Pages
  { id: 'e-appshell-home', source: 'appshell', target: 'page-home', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-appshell-components', source: 'appshell', target: 'page-components', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-appshell-playground', source: 'appshell', target: 'page-playground', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-appshell-patterns', source: 'appshell', target: 'page-patterns', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-appshell-test', source: 'appshell', target: 'page-test', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },

  // Playground → Learning Labs
  { id: 'e-playground-tw', source: 'page-playground', target: 'page-tw', style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-playground-anim', source: 'page-playground', target: 'page-anim', style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-playground-a11y', source: 'page-playground', target: 'page-a11y', style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },

  // Patterns → Architecture + Errors
  { id: 'e-patterns-arch', source: 'page-patterns', target: 'page-arch', style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-patterns-errors', source: 'page-patterns', target: 'page-errors', style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },

  // Data flow: context providers to consumers
  { id: 'e-ctx-sidebar', source: 'sidebar-ctx', target: 'sidebar', style: { stroke: '#ec4899', strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' }, label: 'Context' },
  { id: 'e-ctx-navbar', source: 'sidebar-ctx', target: 'navbar', style: { stroke: '#ec4899', strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' } },

  // Lib dependencies
  { id: 'e-lib-registry', source: 'page-playground', target: 'lib-registry', style: { stroke: '#94a3b8', strokeDasharray: '3 3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e-lib-utils', source: 'page-home', target: 'lib-utils', style: { stroke: '#94a3b8', strokeDasharray: '3 3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e-lib-props', source: 'page-playground', target: 'lib-props', style: { stroke: '#94a3b8', strokeDasharray: '3 3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e-lib-data', source: 'page-components', target: 'lib-data', style: { stroke: '#94a3b8', strokeDasharray: '3 3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
];

function ProviderNode({ data }: { data: ArchNodeData }) {
  return (
    <div className="px-3 py-2 rounded-xl border-2 border-purple-300 dark:border-purple-700 shadow-sm cursor-pointer min-w-[150px] bg-purple-50 dark:bg-purple-950/40">
      <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">{data.label}</p>
      <p className="text-[8px] text-purple-500 dark:text-purple-400 mt-0.5">{data.description}</p>
      <p className="text-[7px] font-mono text-purple-400 dark:text-purple-500 mt-0.5 truncate">{data.file}</p>
    </div>
  );
}

function LayoutNode({ data }: { data: ArchNodeData }) {
  return (
    <div className="px-3 py-2 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 shadow-sm cursor-pointer min-w-[140px] bg-indigo-50 dark:bg-indigo-950/40">
      <p className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">{data.label}</p>
      <p className="text-[8px] text-indigo-500 dark:text-indigo-400 mt-0.5">{data.description}</p>
      <p className="text-[7px] font-mono text-indigo-400 dark:text-indigo-500 mt-0.5 truncate">{data.file}</p>
    </div>
  );
}

function ShellNode({ data }: { data: ArchNodeData }) {
  return (
    <div className="px-3 py-2 rounded-xl border-2 border-violet-300 dark:border-violet-700 shadow-sm cursor-pointer min-w-[130px] bg-violet-50 dark:bg-violet-950/40">
      <p className="text-[11px] font-bold text-violet-700 dark:text-violet-300">{data.label}</p>
      <p className="text-[8px] text-violet-500 dark:text-violet-400 mt-0.5">{data.description}</p>
      <p className="text-[7px] font-mono text-violet-400 dark:text-violet-500 mt-0.5 truncate">{data.file}</p>
    </div>
  );
}

function PageNode({ data }: { data: ArchNodeData }) {
  return (
    <div className="px-3 py-2 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 shadow-sm cursor-pointer min-w-[130px] bg-emerald-50 dark:bg-emerald-950/40">
      <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">{data.label}</p>
      <p className="text-[8px] text-emerald-500 dark:text-emerald-400 mt-0.5">{data.description}</p>
      <p className="text-[7px] font-mono text-emerald-400 dark:text-emerald-500 mt-0.5 truncate">{data.file}</p>
    </div>
  );
}

function LibNode({ data }: { data: ArchNodeData }) {
  return (
    <div className="px-3 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm cursor-pointer min-w-[120px] bg-slate-50 dark:bg-slate-900">
      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{data.label}</p>
      <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-0.5">{data.description}</p>
      <p className="text-[7px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">{data.file}</p>
    </div>
  );
}

const LEGEND_ITEMS = [
  { label: 'Provider', color: 'bg-purple-500', border: 'border-purple-300' },
  { label: 'Layout', color: 'bg-indigo-500', border: 'border-indigo-300' },
  { label: 'Shell', color: 'bg-violet-500', border: 'border-violet-300' },
  { label: 'Page / Route', color: 'bg-emerald-500', border: 'border-emerald-300' },
  { label: 'Library', color: 'bg-slate-500', border: 'border-slate-300' },
];

export default function ArchitecturePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<ArchNodeData | null>(null);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as unknown as ArchNodeData);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Flow canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background color="#e2e8f0" gap={20} />
          <Controls className="!rounded-xl !border !border-slate-200 !shadow-sm" />
          <MiniMap
            nodeStrokeWidth={3}
            className="!rounded-xl !border !border-slate-200 !shadow-sm"
            style={{ width: 180, height: 120 }}
          />
        </ReactFlow>

        {/* Legend overlay */}
        <div className="absolute top-4 right-4 z-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Legend</p>
          <div className="space-y-1.5">
            {LEGEND_ITEMS.map(item => (
              <div key={item.label} className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                <div className={cn("w-3 h-3 rounded", item.color)} />
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <div className="w-4 h-0.5 rounded bg-emerald-500" />
              Route / Page flow
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <div className="w-4 h-0.5 rounded bg-pink-500" style={{ borderTop: '2px dashed #ec4899' }} />
              Context data flow
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <div className="w-4 h-0.5 rounded bg-slate-400" style={{ borderTop: '2px dashed #94a3b8' }} />
              Import dependency
            </div>
          </div>
        </div>
      </div>

      {/* Details panel */}
      <aside className="w-72 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Box className="w-3.5 h-3.5" /> Node Details
          </h2>
        </div>
        {selectedNode ? (
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedNode.label}</p>
              <p className="text-xs text-slate-500 mt-1">{selectedNode.description}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400">File</p>
              <code className="block text-[11px] font-mono text-indigo-600 dark:text-indigo-400 break-all">{selectedNode.file}</code>
            </div>
            <a
              href={`https://github.com/DCUIT/UI-web/blob/main/frontend/src/${selectedNode.file}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on GitHub
            </a>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                <Box className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-400">Click a node to see details</p>
              <p className="text-[11px] text-slate-400 mt-1">Pan and zoom to explore</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
