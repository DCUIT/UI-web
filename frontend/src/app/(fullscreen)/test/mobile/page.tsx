'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PhoneFrame, { DeviceType } from '@/components/mobile-playground/devices/PhoneFrame'
import Editor from '@monaco-editor/react'
import { SandpackProvider, SandpackPreview, SandpackConsole } from '@codesandbox/sandpack-react'
import { Group, Panel, Separator } from "react-resizable-panels"
import ComponentEncyclopedia from '@/components/common/ComponentEncyclopedia'
import { COMPONENT_REGISTRY } from '@/lib/registry'
import { BookOpen } from 'lucide-react'

const defaultAppTsx = `import React, { useState } from 'react';
import './styles.css';

export default function App({ simulatedState = 'normal' }) {
  const [tasks, setTasks] = useState(12);
  const [messages, setMessages] = useState(5);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => setIsStarted(false), 2000);
  };

  if (simulatedState === 'loading') {
    return (
      <div className="mobile-app" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: 16, color: '#64748b' }}>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (simulatedState === 'error') {
    return (
      <div className="mobile-app" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h3 style={{ margin: '0 0 8px' }}>Lỗi kết nối</h3>
        <p style={{ color: '#64748b', margin: '0 0 24px' }}>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
        <button className="primary-btn" style={{ width: 'auto', padding: '12px 24px' }}>Thử lại</button>
      </div>
    );
  }

  if (simulatedState === 'empty') {
    return (
      <div className="mobile-app" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <h3 style={{ margin: '0 0 8px' }}>Chưa có dữ liệu</h3>
        <p style={{ color: '#64748b', margin: '0 0 24px' }}>Bạn chưa có task hoặc tin nhắn nào mới.</p>
        <button className="primary-btn" style={{ width: 'auto', padding: '12px 24px' }}>Tạo Task Đầu Tiên</button>
      </div>
    );
  }

  return (
    <div className="mobile-app">
      <header className="app-header">
        <div className="menu-icon">☰</div>
        <h2>My React App</h2>
        <div className="profile-icon">👤</div>
      </header>
      <main className="app-content">
        <div className="welcome-card">
          <h3>Welcome back!</h3>
          <p>Here is your daily summary.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Tasks</h4>
            <p>{tasks}</p>
          </div>
          <div className="stat-card">
            <h4>Messages</h4>
            <p>{messages}</p>
          </div>
        </div>
        <button 
          onClick={handleStart}
          className="primary-btn"
          style={{ background: isStarted ? '#22c55e' : '#0f172a' }}
        >
          {isStarted ? 'Task Started!' : 'Start New Task'}
        </button>
      </main>
      <nav className="bottom-nav">
        <div className="nav-item active">🏠</div>
        <div className="nav-item">🔍</div>
        <div className="nav-item">🔔</div>
        <div className="nav-item">⚙️</div>
      </nav>
    </div>
  );
}
`;

const defaultStylesCss = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: #f1f5f9;
  color: #0f172a;
  -webkit-font-smoothing: antialiased;
}

.mobile-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.app-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.welcome-card {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
}

.welcome-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
}

.welcome-card p {
  margin: 0;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.stat-card h4 {
  margin: 0 0 8px 0;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-card p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.primary-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 16px;
  background: #0f172a;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}

.primary-btn:active {
  transform: scale(0.98);
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding-bottom: env(safe-area-inset-bottom, 16px);
}

.nav-item {
  font-size: 1.5rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.nav-item.active {
  opacity: 1;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default function MobileUITestPage() {
  const [appTsx, setAppTsx] = useState(defaultAppTsx)
  const [stylesCss, setStylesCss] = useState(defaultStylesCss)

  const [debouncedAppTsx, setDebouncedAppTsx] = useState(defaultAppTsx)
  const [debouncedStylesCss, setDebouncedStylesCss] = useState(defaultStylesCss)

  const [device, setDevice] = useState<DeviceType>('iphone')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [activeTab, setActiveTab] = useState<'App.tsx' | 'styles.css'>('App.tsx')
  const [appState, setAppState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal')
  const [showEncyclopedia, setShowEncyclopedia] = useState(false)
  const [encyclopediaCompId, setEncyclopediaCompId] = useState(COMPONENT_REGISTRY[0].id)
  const encyclopediaComponent = COMPONENT_REGISTRY.find(c => c.id === encyclopediaCompId) || COMPONENT_REGISTRY[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAppTsx(appTsx)
      setDebouncedStylesCss(stylesCss)
    }, 500)
    return () => clearTimeout(timer)
  }, [appTsx, stylesCss])



  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTab(tabName);
      setTimeout(() => setCopiedTab(null), 2000);
    });
  };

  return (
    <div className="flex flex-col h-screen min-h-[800px] bg-slate-50 dark:bg-slate-950">
      {/* Navbar */}
      <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            Mobile Sandbox
          </div>
          <nav className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 ml-4 text-sm font-medium">
             <Link href="/test/web" className="px-3 py-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">Web Sandbox</Link>
             <Link href="/test/mobile" className="px-3 py-1 rounded-md bg-white/80 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 transition-colors">Mobile Sandbox</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAppTsx(defaultAppTsx)
              setStylesCss(defaultStylesCss)
            }}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            Reset Code
          </button>
          <button
            onClick={() => {
              const url = window.location.href
              navigator.clipboard.writeText(url).then(() => {
                setCopiedUrl(true);
                setTimeout(() => setCopiedUrl(false), 2000);
              })
            }}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-none ${copiedUrl ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {copiedUrl ? 'Copied!' : 'Share'}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950">
          <SandpackProvider
            key={appState}
            template="react-ts" 
            theme={theme === 'dark' ? 'dark' : 'light'}
            files={{
              '/App.tsx': debouncedAppTsx,
              '/styles.css': debouncedStylesCss,
              '/index.tsx': {
                code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App simulatedState="${appState}" />
  </StrictMode>
);`,
                hidden: true
              },
              '/index.html': {
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>`,
                hidden: true
              }
            }}
            customSetup={{
              dependencies: {
                'lucide-react': 'latest',
                'framer-motion': 'latest',
                'clsx': 'latest',
                'tailwind-merge': 'latest'
              }
            }}
          >
          <Group orientation="horizontal" className="h-full w-full xl:flex" style={{ minHeight: '600px' }}>
            {/* Editor + Console Panel */}
            <Panel defaultSize={44} minSize={25}>
              <div className="flex flex-col gap-4 h-full p-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 flex-1 flex flex-col overflow-hidden">
                  <div className="mb-4 flex items-center justify-between gap-3 shrink-0 p-4 pb-0">
                    <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
                      <button onClick={() => setActiveTab('App.tsx')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'App.tsx' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>App.tsx</button>
                      <button onClick={() => setActiveTab('styles.css')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'styles.css' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>styles.css</button>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(activeTab === 'App.tsx' ? appTsx : stylesCss, activeTab)}
                      className={`text-xs px-3 py-2 rounded-lg transition-colors font-medium flex items-center gap-1 ${
                        copiedTab === activeTab 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {copiedTab === activeTab ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      )}
                      {copiedTab === activeTab ? 'Copied!' : `Copy ${activeTab}`}
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-hidden px-4 pb-4">
                    <div className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e]">
                      <Editor
                        height="100%"
                        language={activeTab === 'styles.css' ? 'css' : 'typescriptreact'}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        value={activeTab === 'App.tsx' ? appTsx : stylesCss}
                        onChange={(value?: string) => {
                          if (activeTab === 'App.tsx') setAppTsx(value || '')
                          if (activeTab === 'styles.css') setStylesCss(value || '')
                        }}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          padding: { top: 16 },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          tabSize: 2
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 flex flex-col shrink-0" style={{ minHeight: showEncyclopedia ? '320px' : '192px' }}>
                  <div className="mb-3 flex items-center justify-between shrink-0">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                      Console & Errors
                    </h3>
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e] [&_.sp-wrapper]:h-full [&_.sp-layout]:h-full [&_.sp-console]:h-full [&_.sp-console]:bg-transparent [&_.sp-console]:!border-0">
                    <SandpackConsole standalone resetOnPreviewRestart />
                  </div>

                  {showEncyclopedia && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 overflow-y-auto max-h-64">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Knowledge</span>
                        <select
                          value={encyclopediaCompId}
                          onChange={e => setEncyclopediaCompId(e.target.value)}
                          className="ml-auto text-[10px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 outline-none"
                        >
                          {COMPONENT_REGISTRY.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <ComponentEncyclopedia 
                        component={encyclopediaComponent} 
                        onApplyCode={(code) => {
                          setAppTsx(code);
                          setActiveTab('App.tsx');
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            <Separator className="hidden xl:block w-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors cursor-col-resize shrink-0" />

            {/* Preview Panel */}
            <Panel defaultSize={56} minSize={25}>
              <div className="h-full flex flex-col p-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 flex-1 flex flex-col overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 shrink-0 p-4 pb-0">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Xem trước thiết bị Mobile</h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                        <button onClick={() => setDevice('iphone')} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${device === 'iphone' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>iPhone 15</button>
                        <button onClick={() => setDevice('android')} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${device === 'android' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Pixel</button>
                        <button onClick={() => setDevice('ipad')} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${device === 'ipad' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>iPad</button>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                        <button onClick={() => setOrientation('portrait')} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${orientation === 'portrait' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Dọc</button>
                        <button onClick={() => setOrientation('landscape')} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${orientation === 'landscape' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Ngang</button>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="px-2 py-1 text-[10px] font-medium rounded-md bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white transition-all">{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
                      </div>
                      <button
                        onClick={() => setShowEncyclopedia(!showEncyclopedia)}
                        className={`flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-lg transition-all ${showEncyclopedia ? 'bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'}`}
                      >
                        <BookOpen className="w-3 h-3" /> Knowledge
                      </button>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                        {(['normal', 'loading', 'empty', 'error'] as const).map(state => (
                          <button key={state} onClick={() => setAppState(state)} className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all capitalize ${appState === state ? 'bg-indigo-100 text-indigo-700 shadow-sm dark:bg-indigo-500/20 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>{state}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center overflow-auto p-4">
                    <div className={`flex justify-center bg-slate-100 dark:bg-slate-900/50 p-8 rounded-3xl overflow-auto w-full max-h-full transition-colors ${theme === 'dark' ? '!bg-slate-800/80' : ''}`}>
                      <PhoneFrame device={device} orientation={orientation} theme={theme}>
                        <div className="h-full w-full bg-white [&_.sp-wrapper]:h-full [&_.sp-layout]:h-full [&_.sp-preview-container]:h-full [&_.sp-preview-iframe]:!h-full">
                          <SandpackPreview 
                            showOpenInCodeSandbox={false} 
                            showRefreshButton={false} 
                            style={{ height: '100%', border: 'none' }} 
                          />
                        </div>
                      </PhoneFrame>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </Group>
          </SandpackProvider>
        </main>
      </div>
    </div>
  )
}
