'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { Code2, Layout, Terminal, FileCode, Check, Copy, Monitor, Smartphone, RotateCcw, Sliders, Type, ToggleLeft, Palette, RefreshCw, Info, Package, Zap, ShieldCheck, Search, ChevronRight, Save, Share2, Download, Sparkles, Wand2, Loader2 } from 'lucide-react';
import * as Babel from '@babel/standalone';
import Editor from '@monaco-editor/react';

const DEFAULT_TSX = `function App({ title = "Live Sandbox", buttonText = "Clicked", showIcon = true, accentColor = "#4f46e5" }) {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="p-8 max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:scale-[1.02]">
      <div className="flex items-center gap-4 mb-6">
        {showIcon && (
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-white"
            style={{ backgroundColor: accentColor, boxShadow: \`0 10px 15px -3px \${accentColor}33\` }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Babel Runtime Active</p>
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
        Thử thay đổi nội dung trong tab <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono" style={{ color: accentColor }}>TSX</span> để thấy kết quả cập nhật ngay lập tức.
      </p>
      
      <button 
        onClick={() => setCount(c => c + 1)}
        className="w-full py-4 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group"
        style={{ backgroundColor: accentColor, boxShadow: \`0 10px 15px -3px \${accentColor}40\` }}
      >
        {buttonText} {count} times
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
}
`;

const DEFAULT_CSS = `/* Custom Tailwind or Plain CSS here */
@keyframes pulse-custom {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
`;

type Device = 'desktop' | 'mobile';
type Orientation = 'portrait' | 'landscape';
type LogEntry = { type: 'log' | 'error'; content: string; timestamp: string };
type Control = { id: string; label: string; type: 'text' | 'boolean' | 'color'; value: any };

interface ComponentRegistryItem {
  id: string;
  name: string;
  category: string;
  tsx: string;
  css: string;
  controls: Control[];
  dependencies: string[];
  metadata: { responsive: string; darkMode: string; complexity: string };
}

const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
  {
    id: 'default-sandbox',
    name: 'Default Sandbox',
    category: 'Feedback',
    tsx: DEFAULT_TSX,
    css: DEFAULT_CSS,
    controls: [
      { id: 'title', label: 'Title Text', type: 'text', value: 'Live Sandbox' },
      { id: 'buttonText', label: 'Button Label', type: 'text', value: 'Clicked' },
      { id: 'showIcon', label: 'Show Icon', type: 'boolean', value: true },
      { id: 'accentColor', label: 'Accent Color', type: 'color', value: '#4f46e5' },
    ],
    dependencies: ['lucide-react', 'framer-motion', 'clsx'],
    metadata: { responsive: 'Fully', darkMode: 'Ready', complexity: 'Entry' }
  },
  {
    id: 'neon-button',
    name: 'Neon Glow Button',
    category: 'Buttons',
    tsx: `function App({ text = "Neon Glow", color = "#00f2ff" }) {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-slate-950 p-10 rounded-2xl">
      <button 
        className="px-10 py-5 rounded-full font-black text-white transition-all duration-300 active:scale-95 uppercase tracking-widest text-sm"
        style={{ 
          backgroundColor: color,
          boxShadow: \`0 0 20px \${color}66, 0 0 40px \${color}33\`,
          textShadow: '0 0 8px rgba(0,0,0,0.3)'
        }}
      >
        {text}
      </button>
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'text', label: 'Button Text', type: 'text', value: 'Neon Glow' },
      { id: 'color', label: 'Glow Color', type: 'color', value: '#00f2ff' }
    ],
    dependencies: ['clsx'],
    metadata: { responsive: 'Fully', darkMode: 'Dark Only', complexity: 'Beginner' }
  }
];

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentRegistryItem>(COMPONENT_REGISTRY[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tsxCode, setTsxCode] = useState(DEFAULT_TSX);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [device, setDevice] = useState<Device>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [srcDoc, setSrcDoc] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mẫu controls khởi tạo cho component mặc định
  const [controls, setControls] = useState<Control[]>(COMPONENT_REGISTRY[0].controls);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 1. Load shared state or drafts on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('share');

    if (sharedData) {
      try {
        // Giải mã Base64 an toàn cho Unicode
        const decoded = JSON.parse(decodeURIComponent(escape(window.atob(sharedData))));
        const comp = COMPONENT_REGISTRY.find(c => c.id === decoded.componentId) || COMPONENT_REGISTRY[0];
        
        setSelectedComponent(comp);
        setTsxCode(decoded.tsx);
        setCssCode(decoded.css);
        setControls(decoded.controls);
        
        // Xóa query param để URL sạch sẽ sau khi load
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
        setControls(parsed.controls || comp.controls);
      } catch (e) {
        console.error("Failed to parse playground draft", e);
      }
    }
  }, []);

  // 2. Auto-save drafts on change
  useEffect(() => {
    setIsSaving(true);
    const draft = {
      tsx: tsxCode,
      css: cssCode,
      controls: controls,
      componentId: selectedComponent.id
    };
    localStorage.setItem('ui-platform-playground-draft', JSON.stringify(draft));
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [tsxCode, cssCode, controls, selectedComponent.id]);

  // Hàm tải linh kiện mới
  const loadComponent = (component: ComponentRegistryItem) => {
    setSelectedComponent(component);
    setTsxCode(component.tsx);
    setCssCode(component.css);
    setControls(component.controls);
    setLogs([]); // Clear logs khi đổi component
  };

  // Filter linh kiện dựa trên search
  const filteredRegistry = useMemo(() => {
    return COMPONENT_REGISTRY.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Theme sync với class trên html/body (đang do next-themes quản lý)
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    // Thông báo cho iframe nếu cần (trong srcDoc script đã tự xử lý cơ bản qua class dark)
  }, [theme]);

  const deviceDims = useMemo(() => {
    if (device === 'desktop') return { w: 900, h: 600 };
    // mobile frame
    return orientation === 'portrait'
      ? { w: 390, h: 740 }
      : { w: 740, h: 390 };
  }, [device, orientation]);

  // Logic biên dịch và cập nhật Sandbox
  const updateSandbox = () => {
    try {
      // Biên dịch code TSX sang JS (ES5) dùng Babel Standalone
      const result = Babel.transform(tsxCode, {
        presets: ['react', 'typescript'],
        filename: 'playground.tsx',
      });

      const compiledCode = result.code;
      
      // Chuyển mảng controls thành object props
      const currentProps = controls.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.value }), {});
      const propsJson = JSON.stringify(currentProps);

      const doc = `
        <!DOCTYPE html>
        <html class="${theme}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = { darkMode: 'class' };
            </script>
            <style>
              ${cssCode}
              body { margin: 0; padding: 0; background-color: transparent; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script>
              // Capture console
              const originalLog = console.log;
              const originalError = console.error;
              const send = (type, args) => {
                window.parent.postMessage({ 
                  type: 'sandbox-log', 
                  logType: type, 
                  data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') 
                }, '*');
              };

              console.log = (...args) => { send('log', args); originalLog(...args); };
              console.error = (...args) => { send('error', args); originalError(...args); };
              window.onerror = (msg) => { send('error', [msg]); };

              try {
                ${compiledCode}
                const root = ReactDOM.createRoot(document.getElementById('root'));
                if (typeof App !== 'undefined') {
                  const props = ${propsJson};
                  root.render(React.createElement(App, props));
                } else {
                  console.error("Function 'App' is missing. Please define 'function App() { ... }'");
                }
              } catch (err) {
                console.error(err.message);
              }
            </script>
          </body>
        </html>
      `;
      setSrcDoc(doc);
    } catch (err: any) {
      // Lỗi biên dịch (syntax error)
      setLogs(prev => [{ 
        type: 'error' as const, 
        content: `Compiler Error: ${err.message}`, 
        timestamp: new Date().toLocaleTimeString() 
      }, ...prev].slice(0, 20));
    }
  };

  // Debounce re-render 800ms
  useEffect(() => {
    const timer = setTimeout(updateSandbox, 800);
    return () => clearTimeout(timer);
  }, [tsxCode, cssCode, theme, controls]);

  const tabs = useMemo(
    () =>
      [
        {
          value: 'preview',
          label: <span className="flex items-center gap-2"><Monitor className="w-4 h-4" /> Preview</span>,
          content: (
            <div className="flex h-full min-h-[500px] flex-col items-center justify-start overflow-auto bg-slate-50/50 p-4 dark:bg-slate-900/50">
              <div className="relative rounded-[2.5rem] border-[8px] border-slate-800 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 transition-all duration-300 overflow-hidden" 
                   style={{ width: deviceDims.w, height: deviceDims.h }}>
                
                <iframe
                  ref={iframeRef}
                  srcDoc={srcDoc}
                  className="h-full w-full bg-transparent"
                  title="Playground Preview"
                  sandbox="allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
                />

                  {/* Phone frame bezel */}
              </div>
            </div>
          ),
        },
        {
          value: 'tsx',
          label: <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> TSX</span>,
          content: (
            <div className="h-full">
              <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  path="playground.tsx"
                  value={tsxCode}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  onChange={(val?: string) => setTsxCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Sử dụng Babel để biên dịch code trực tiếp.</p>
            </div>
          ),
        },
        {
          value: 'css',
          label: <span className="flex items-center gap-2"><Layout className="w-4 h-4" /> CSS</span>,
          content: (
            <div className="h-full">
              <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
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
              </div>
            </div>
          ),
        },
        {
          value: 'usage',
          label: <span className="flex items-center gap-2"><FileCode className="w-4 h-4" /> Usage</span>,
          content: (
            <div className="h-full rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
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
          ),
        },
      ] as const,
    [tsxCode, cssCode, device, orientation, deviceDims.w, deviceDims.h, srcDoc, controls, selectedComponent]
  );

  // Dữ liệu cấu trúc SEO (JSON-LD)
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

  // Lắng nghe message từ sandbox
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sandbox-log') {
        setLogs(prev => [{
          type: event.data.logType,
          content: event.data.data,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 20));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
    // Mã hóa Base64 an toàn cho Unicode
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
    setControls(selectedComponent.controls);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    // Giả lập gọi API AI (sau này bạn có thể thay bằng fetch tới OpenAI/Gemini)
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
    setAiPrompt('');
    setIsGenerating(false);
    
    // Thông báo cho Console
    setLogs(prev => [{
      type: 'log',
      content: `✨ AI has generated a new component based on: "${prompt}"`,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  return (
    <main className="space-y-6" role="main">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-labelledby="playground-title">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Playground</p>
            {isSaving && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 animate-pulse" role="status" aria-live="polite">
                <Save className="w-3 h-3" /> SAVED
              </span>
            )}
          </div>
          <h1 id="playground-title" className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Playground / Sandbox Page
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Runtime Sandbox Ready: Code được biên dịch trực tiếp bằng Babel và render trong IFrame riêng biệt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={sharePlayground}
            className="gap-2 rounded-xl"
            aria-label="Share this playground"
          >
            {isShared ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            {isShared ? 'Link Copied!' : 'Share'}
          </Button>
          <Button
            variant="secondary"
            onClick={exportComponent}
            className="gap-2 rounded-xl"
            disabled={isExporting}
            aria-label="Export component as TSX file"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export .tsx'}
          </Button>
          <ThemeToggle />
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">Device</span>
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              aria-pressed={device === 'desktop'}
              aria-label="Switch to desktop preview"
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              aria-pressed={device === 'mobile'}
              aria-label="Switch to mobile preview"
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">Orientation</span>
            <button
              type="button"
              onClick={() => setOrientation('portrait')}
              aria-pressed={orientation === 'portrait'}
              aria-label="Portrait orientation"
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${orientation === 'portrait' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Portrait
            </button>
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              aria-pressed={orientation === 'landscape'}
              aria-label="Landscape orientation"
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${orientation === 'landscape' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Landscape
            </button>
          </div>
        </div>
      </header>

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
            <p className="text-[9px] text-slate-400 italic">Ví dụ: "Tạo một card giới thiệu sản phẩm mượt mà"</p>
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

          {/* Metadata & Dependencies */}
          <section className="space-y-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Component Info</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Category</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{selectedComponent.category}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Responsive</p>
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {selectedComponent.metadata.responsive}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dark Mode</p>
                  <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {selectedComponent.metadata.darkMode}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Complexity</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{selectedComponent.metadata.complexity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
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
            </div>
          </section>

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

          <div className="flex flex-col h-[300px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Console</span>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition"
                aria-label="Clear console logs"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 font-mono text-[11px] space-y-1">
              {logs.length === 0 && (
                <p className="text-slate-400 italic text-center mt-4">No logs yet...</p>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className={`p-1.5 rounded border-l-2 ${log.type === 'error' ? 'bg-red-50 text-red-600 border-red-500 dark:bg-red-950/20' : 'bg-slate-100 text-slate-700 border-slate-400 dark:bg-slate-800 dark:text-slate-300'}`}>
                  <div className="flex justify-between items-center opacity-60 mb-0.5">
                    <span className="font-bold uppercase text-[9px]">{log.type}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-wrap break-words">{log.content}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <Tabs items={tabs as any} />
        </article>
      </div>
    </main>
  );
}
