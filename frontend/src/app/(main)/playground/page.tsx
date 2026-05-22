'use client';

import { useEffect, useMemo, useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import { Code2, Layout, FileCode, Check, Copy, Sliders, Type, ToggleLeft, Palette, RefreshCw, Package, Search, ChevronRight, Save, Share2, Download, Sparkles, Wand2, Loader2, Activity } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Group, Panel, Separator } from "react-resizable-panels";
import { SandpackProvider, SandpackPreview, SandpackConsole } from '@codesandbox/sandpack-react';
import ComponentEncyclopedia from '@/components/common/ComponentEncyclopedia';
import StateTracker from '@/components/playground/StateTracker';
import { cn } from '@/lib/utils';
import { COMPONENT_REGISTRY, ComponentRegistryItem, DEFAULT_TSX, DEFAULT_CSS } from '@/lib/registry';
import { parsePropsFromSource, generateEntryPoint, Control } from '@/lib/props-parser';

type Device = 'desktop' | 'mobile';
type Orientation = 'portrait' | 'landscape';

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentRegistryItem>(COMPONENT_REGISTRY[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tsxCode, setTsxCode] = useState(DEFAULT_TSX);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [device, setDevice] = useState<Device>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorTab, setEditorTab] = useState<'tsx' | 'css'>('tsx');
  const [controls, setControls] = useState<Control[]>(() => parsePropsFromSource(DEFAULT_TSX));
  const [showStateTracker, setShowStateTracker] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('share');

    if (sharedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(window.atob(sharedData))));
        const comp = COMPONENT_REGISTRY.find(c => c.id === decoded.componentId) || COMPONENT_REGISTRY[0];

        setSelectedComponent(comp);
        setTsxCode(decoded.tsx);
        setCssCode(decoded.css);
        const parsed = parsePropsFromSource(decoded.tsx);
        setControls(parsed.length > 0 ? parsed : decoded.controls);

        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } catch (e) {
        console.error("Failed to decode shared playground data", e);
      }
    }

    const savedDraft = localStorage.getItem('ui-platform-playground-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        const comp = COMPONENT_REGISTRY.find(c => c.id === parsed.componentId) || COMPONENT_REGISTRY[0];

        setSelectedComponent(comp);
        setTsxCode(parsed.tsx || comp.tsx);
        setCssCode(parsed.css || comp.css);
        setControls(parsePropsFromSource(parsed.tsx || comp.tsx));
      } catch (e) {
        console.error("Failed to parse playground draft", e);
      }
    }
  }, []);

  useEffect(() => {
    setIsSaving(true);
    const draft = {
      tsx: tsxCode,
      css: cssCode,
      componentId: selectedComponent.id
    };
    localStorage.setItem('ui-platform-playground-draft', JSON.stringify(draft));
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [tsxCode, cssCode, selectedComponent.id]);

  const loadComponent = (component: ComponentRegistryItem) => {
    setSelectedComponent(component);
    setTsxCode(component.tsx);
    setCssCode(component.css);
    setControls(parsePropsFromSource(component.tsx));
  };

  const filteredRegistry = useMemo(() => {
    return COMPONENT_REGISTRY.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);

  const deviceDims = useMemo(() => {
    if (device === 'desktop') return { w: 900, h: 600 };
    return orientation === 'portrait'
      ? { w: 390, h: 740 }
      : { w: 740, h: 390 };
  }, [device, orientation]);

  const entryPointCode = useMemo(() => generateEntryPoint(controls), [controls]);

  const sandpackFiles = useMemo(() => ({
    '/App.tsx': tsxCode,
    '/styles.css': cssCode,
    '/index.tsx': {
      code: entryPointCode,
      hidden: true
    }
  }), [tsxCode, cssCode, entryPointCode]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Master UI Playground",
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "An interactive playground for React and Tailwind CSS components with live preview and AI generation.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const copyFullComponent = async () => {
    const content = `/** TSX **/\n${tsxCode}\n\n/** CSS **/\n${cssCode}`;
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const sharePlayground = async () => {
    const data = {
      tsx: tsxCode,
      css: cssCode,
      controls: controls,
      componentId: selectedComponent.id
    };
    const jsonString = JSON.stringify(data);
    const encoded = window.btoa(
      encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encoded}`;

    await navigator.clipboard.writeText(shareUrl);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const exportComponent = () => {
    setIsExporting(true);
    const fileName = `${selectedComponent.id || 'component'}.tsx`;
    const content = `/**
 * Generated by UI Platform Playground
 * Component: ${selectedComponent.name}
 * Category: ${selectedComponent.category}
 * Dependencies: ${selectedComponent.dependencies.join(', ')}
 */

${tsxCode}

/** CSS Styles (Optional) **/
${cssCode}`;

    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsExporting(false), 1500);
  };

  const updateControl = (id: string, value: any) => {
    setControls(prev => prev.map(c => c.id === id ? { ...c, value } : c));
  };

  const resetControls = () => {
    setControls(parsePropsFromSource(tsxCode));
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    let generatedCode = "";
    const prompt = aiPrompt.toLowerCase();

    if (prompt.includes('button')) {
      generatedCode = `function App({ text = "AI Button", color = "#ef4444" }) {\n  return (\n    <div className="p-10 flex justify-center">\n      <button className="px-6 py-3 rounded-lg text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg" style={{ backgroundColor: color }}>\n        {text}\n      </button>\n    </div>\n  );\n}`;
    } else if (prompt.includes('card')) {
      generatedCode = `function App({ title = "AI Generated Card", desc = "This was created using your prompt." }) {\n  return (\n    <div className="p-8">\n      <div className="max-w-sm rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-2xl border border-slate-100 dark:border-slate-700">\n        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>\n        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>\n        <div className="mt-6 flex gap-2">\n           <div className="w-8 h-8 rounded-full bg-indigo-500" />\n           <div className="w-8 h-8 rounded-full bg-emerald-500" />\n        </div>\n      </div>\n    </div>\n  );\n}`;
    } else {
      generatedCode = `function App() {\n  return (\n    <div className="p-12 text-center">\n      <div className="inline-block p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">\n        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>\n      </div>\n      <h2 className="text-2xl font-black dark:text-white">AI Result</h2>\n      <p className="text-slate-500 mt-2">Mã nguồn được tạo dựa trên prompt: "${aiPrompt}"</p>\n    </div>\n  );\n}`;
    }

    setTsxCode(generatedCode);
    setControls(parsePropsFromSource(generatedCode));
    setAiPrompt('');
    setIsGenerating(false);
  };

  return (
    <SandpackProvider
      template="react-ts"
      theme={theme === 'dark' ? 'dark' : 'light'}
      files={sandpackFiles}
      customSetup={{
        dependencies: {
          'lucide-react': 'latest',
          'framer-motion': 'latest',
          'clsx': 'latest'
        }
      }}
    >
      <div className="w-full space-y-6 p-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 animate-pulse" role="status" aria-live="polite">
                <Save className="w-3 h-3" /> SAVED
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" onClick={sharePlayground} className="gap-2 rounded-lg h-8 text-xs" aria-label="Share this playground">
              {isShared ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              {isShared ? 'Copied!' : 'Share'}
            </Button>
            <Button variant="secondary" onClick={exportComponent} className="gap-2 rounded-lg h-8 text-xs" disabled={isExporting} aria-label="Export component as TSX file">
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              {isExporting ? '...' : 'Export'}
            </Button>
            <ThemeToggle />
            <button
              onClick={() => setShowStateTracker(!showStateTracker)}
              className={cn(
                "flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold transition",
                showStateTracker
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <Activity className="w-3 h-3" /> Tracker
            </button>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300">Device</span>
              <button type="button" onClick={() => setDevice('desktop')} aria-pressed={device === 'desktop'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Desktop</button>
              <button type="button" onClick={() => setDevice('mobile')} aria-pressed={device === 'mobile'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Mobile</button>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300">Orient</span>
              <button type="button" onClick={() => setOrientation('portrait')} aria-pressed={orientation === 'portrait'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${orientation === 'portrait' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Portrait</button>
              <button type="button" onClick={() => setOrientation('landscape')} aria-pressed={orientation === 'landscape'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${orientation === 'landscape' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Landscape</button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Left controls */}
          <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-label="Playground controls">
            {/* AI Magic Prompt */}
            <section className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">AI Magic Prompt</h2>
              </div>
              <div className="relative group">
                <textarea
                  id="ai-prompt-input"
                  aria-label="Describe the component you want to generate"
                  placeholder="Mô tả linh kiện bạn muốn tạo..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] font-medium outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white resize-none"
                />
                <button
                  onClick={handleAIGenerate}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="absolute bottom-2 right-2 p-2 rounded-lg bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all disabled:opacity-50 disabled:scale-100 active:scale-90"
                  aria-label="Generate component with AI"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[9px] text-slate-400 italic">Ví dụ: &quot;Tạo một card giới thiệu sản phẩm mượt mà&quot;</p>
            </section>

            {/* Component Search & Selection */}
            <section className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  aria-label="Search components by name or category"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {searchTerm && (
                <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 z-20">
                  {filteredRegistry.length > 0 ? (
                    filteredRegistry.map(comp => (
                      <button
                        key={comp.id}
                        onClick={() => {
                          loadComponent(comp);
                          setSearchTerm('');
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b last:border-0 border-slate-50 dark:border-slate-900"
                      >
                        <div>
                          <p className="text-[11px] font-bold text-slate-900 dark:text-white">{comp.name}</p>
                          <p className="text-[9px] text-slate-400 uppercase">{comp.category}</p>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-[10px] text-slate-400 text-center italic">No components found</p>
                  )}
                </div>
              )}
            </section>

            {/* Dependencies */}
            <section className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-indigo-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Dependencies</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedComponent.dependencies.map(dep => (
                  <span key={dep} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {dep}
                  </span>
                ))}
              </div>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(`npm install ${selectedComponent.dependencies.join(' ')}`);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 text-white text-[10px] font-bold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-950"
                aria-label="Copy install command to clipboard"
              >
                <Copy className="w-3 h-3" /> Copy Install Command
              </button>
            </section>

            {/* Auto-extracted Props Controls */}
            <section aria-labelledby="props-controls-title">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <h2 id="props-controls-title" className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Component Props</h2>
                </div>
                <button
                  onClick={resetControls}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Reset Controls"
                  aria-label="Reset all controls to default"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {controls.length === 0 && (
                <p className="text-[10px] text-slate-400 italic text-center py-4">
                  No props detected. Add destructured params to your <code className="font-mono">App</code> function.
                </p>
              )}

              <div className="space-y-4">
                {controls.map((control) => (
                  <div key={control.id} className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1 flex items-center gap-1.5">
                      {control.type === 'text' && <Type className="w-3 h-3" />}
                      {control.type === 'color' && <Palette className="w-3 h-3" />}
                      {control.type === 'boolean' && <ToggleLeft className="w-3 h-3" />}
                      {control.label}
                    </label>

                    {control.type === 'text' ? (
                      <input
                        type="text"
                        value={control.value}
                        aria-label={`Change ${control.label}`}
                        onChange={(e) => updateControl(control.id, e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      />
                    ) : control.type === 'color' ? (
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={control.value}
                            aria-label={`Hex color for ${control.label}`}
                            onChange={(e) => updateControl(control.id, e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                          />
                          <div
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: control.value }}
                          />
                        </div>
                        <input
                          type="color"
                          value={control.value}
                          aria-label={`Pick color for ${control.label}`}
                          onChange={(e) => updateControl(control.id, e.target.value)}
                          className="h-8 w-8 cursor-pointer rounded-lg border-none bg-transparent"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => updateControl(control.id, !control.value)}
                        aria-pressed={control.value}
                        aria-label={`Toggle ${control.label}`}
                        className={`flex h-8 w-full items-center justify-between rounded-xl border px-3 transition-all ${control.value ? 'border-indigo-500/50 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300' : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900'}`}
                      >
                        <span className="text-[10px] font-bold">{control.value ? 'ENABLED' : 'DISABLED'}</span>
                        <div className={`h-4 w-4 rounded-full transition-all ${control.value ? 'translate-x-0 bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Encyclopedia */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <ComponentEncyclopedia
                component={selectedComponent}
                onApplyCode={(code) => setTsxCode(code)}
              />
            </div>

            {/* Copy actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Copy</p>
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(tsxCode);
                }}
                aria-label="Copy TSX code to clipboard"
                className="w-full justify-start gap-2"
              >
                <Code2 className="w-4 h-4" />
                Copy TSX
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={copyFullComponent}
                aria-label="Copy component code and styles to clipboard"
                className="w-full justify-start gap-2"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied All!' : 'Copy full component'}
              </Button>
            </div>
          </aside>

          {/* Main */}
          <div className="flex flex-col gap-4">
            <Group orientation="horizontal" className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden" style={{ minHeight: '560px' }}>
              {/* Editor Panel */}
              <Panel defaultSize={55} minSize={25}>
                <div className="h-full flex flex-col bg-white dark:bg-slate-950">
                  <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 px-3 py-0 shrink-0">
                    <button
                      onClick={() => setEditorTab('tsx')}
                      className={`px-3 py-2.5 text-xs font-semibold transition border-b-2 ${editorTab === 'tsx' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                      <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> TSX</span>
                    </button>
                    <button
                      onClick={() => setEditorTab('css')}
                      className={`px-3 py-2.5 text-xs font-semibold transition border-b-2 ${editorTab === 'css' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                      <span className="flex items-center gap-1.5"><Layout className="w-3.5 h-3.5" /> CSS</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {editorTab === 'tsx' ? (
                      <Editor
                        height="100%"
                        defaultLanguage="typescript"
                        path="playground.tsx"
                        value={tsxCode}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        onChange={(val?: string) => {
                          setTsxCode(val || '');
                          setControls(parsePropsFromSource(val || ''));
                        }}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          roundedSelection: true,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    ) : (
                      <Editor
                        height="100%"
                        defaultLanguage="css"
                        path="style.css"
                        value={cssCode}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        onChange={(val?: string) => setCssCode(val || '')}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  </div>
                </div>
              </Panel>

              <Separator className="w-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors cursor-col-resize shrink-0" />

              {/* Preview Panel */}
              <Panel defaultSize={45} minSize={25}>
                <div className="h-full flex flex-col bg-white dark:bg-slate-950">
                  <div className="flex items-center justify-end gap-2 border-b border-slate-200 dark:border-slate-800 px-3 py-2 shrink-0">
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 px-1.5 py-0.5">
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">Device</span>
                      <button type="button" onClick={() => setDevice('desktop')} aria-pressed={device === 'desktop'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Desktop</button>
                      <button type="button" onClick={() => setDevice('mobile')} aria-pressed={device === 'mobile'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Mobile</button>
                    </div>
                    {device === 'mobile' && (
                      <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 px-1.5 py-0.5">
                        <span className="text-[9px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">Orient</span>
                        <button type="button" onClick={() => setOrientation('portrait')} aria-pressed={orientation === 'portrait'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${orientation === 'portrait' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Portrait</button>
                        <button type="button" onClick={() => setOrientation('landscape')} aria-pressed={orientation === 'landscape'} className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${orientation === 'landscape' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>Landscape</button>
                      </div>
                    )}
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 px-1.5 py-0.5">
                      <button
                        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                        className="rounded px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center overflow-auto bg-slate-50/50 dark:bg-slate-900/50 p-4">
                    <div
                      className={
                        device === 'mobile'
                          ? `relative rounded-[2.5rem] border-[8px] border-slate-800 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 transition-all duration-300 overflow-hidden`
                          : `w-full h-full flex items-center justify-center`
                      }
                      style={device === 'mobile' ? { width: deviceDims.w, maxWidth: '100%', height: deviceDims.h } : {}}
                    >
                      <div className={device === 'mobile' ? "h-full w-full" : "h-full w-full [&_.sp-wrapper]:h-full [&_.sp-layout]:h-full [&_.sp-preview-container]:h-full [&_.sp-preview-iframe]:!h-full"}>
                        <SandpackPreview
                          showOpenInCodeSandbox={false}
                          showRefreshButton={false}
                          style={{ height: '100%', border: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Group>

            {/* Usage Section */}
            <details className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 group">
              <summary className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors select-none">
                <FileCode className="w-4 h-4" />
                Usage
                <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-90" />
              </summary>
              <div className="border-t border-slate-200 dark:border-slate-800 px-5 py-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                  {(() => {
                    const componentPascalName = selectedComponent.name.replace(/\s+/g, '');
                    const propsString = controls.map(c => {
                      if (c.type === 'boolean') {
                        return `      ${c.id}={${c.value}}`;
                      }
                      return `      ${c.id}="${c.value}"`;
                    }).join('\n');

                    return `// Example Usage
import ${componentPascalName} from '@/components/${componentPascalName}';

export default function Page() {
  return (
    <${componentPascalName}
${propsString}
    />
  );
}`;
                  })()}
                </pre>
              </div>
            </details>

            {/* State Tracker */}
            {showStateTracker && (
              <StateTracker
                states={{
                  component: selectedComponent.id,
                  device,
                  orientation,
                  theme,
                  editorTab,
                  controls: controls.map(c => ({ id: c.id, value: c.value })),
                  saving: isSaving,
                  aiGenerating: isGenerating,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </SandpackProvider>
  );
}
