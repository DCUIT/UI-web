'use client'

import { useEffect, useMemo, useState } from 'react'
import PhoneFrame, { DeviceType } from '@/components/mobile-playground/devices/PhoneFrame'
import Editor from '@monaco-editor/react'
import { SandpackProvider, SandpackPreview, SandpackConsole } from '@codesandbox/sandpack-react'

const defaultAppTsx = `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [tasks, setTasks] = useState(12);
  const [messages, setMessages] = useState(5);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => setIsStarted(false), 2000);
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAppTsx(appTsx)
      setDebouncedStylesCss(stylesCss)
    }, 500)
    return () => clearTimeout(timer)
  }, [appTsx, stylesCss])



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Đã sao chép vào clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div className="flex flex-col h-screen min-h-[800px] bg-slate-50 dark:bg-slate-950 -m-4 sm:-m-8">
      {/* Navbar */}
      <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            Mobile Sandbox
          </div>
          <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 ml-4 text-sm font-medium">
             <button className="px-3 py-1 bg-white dark:bg-slate-700 shadow-sm rounded-md text-slate-900 dark:text-white">Playground</button>
             <button className="px-3 py-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">Components</button>
             <button className="px-3 py-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">Documentation</button>
          </div>
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
          <button className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
            Share
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-y-auto hidden md:flex">
          <div className="p-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Components</h3>
             <div className="space-y-1">
               <button className="w-full text-left px-3 py-2 text-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium rounded-lg">Buttons</button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">Cards</button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">Inputs & Forms</button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">Bottom Sheets</button>
             </div>
             
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 mt-8">Templates</h3>
             <div className="space-y-1">
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">E-commerce App</button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">Chat Interface</button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">Social Feed</button>
             </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950">
          <SandpackProvider 
            template="react-ts" 
            theme={theme === 'dark' ? 'dark' : 'light'}
            files={{
              '/App.tsx': debouncedAppTsx,
              '/styles.css': debouncedStylesCss
            }}
            customSetup={{
              dependencies: {
                "lucide-react": "latest"
              }
            }}
          >
          <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr] h-full max-w-[1600px] mx-auto">
            <div className="space-y-4 flex flex-col h-full min-h-[600px]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 flex-1 flex flex-col min-h-[500px]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
                  <button onClick={() => setActiveTab('App.tsx')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'App.tsx' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>App.tsx</button>
                  <button onClick={() => setActiveTab('styles.css')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'styles.css' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>styles.css</button>
                </div>
                <button 
                  onClick={() => copyToClipboard(activeTab === 'App.tsx' ? appTsx : stylesCss)}
                  className="text-xs px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy {activeTab}
                </button>
              </div>
              
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e] min-h-[500px]">
                <Editor
                  height="100%"
                  language={activeTab === 'styles.css' ? 'css' : 'typescript'}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={activeTab === 'App.tsx' ? appTsx : stylesCss}
                  onChange={(value) => {
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
            
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 h-64 flex flex-col shrink-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                  Console & Errors
                </h3>
              </div>
              <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e] [&_.sp-wrapper]:h-full [&_.sp-layout]:h-full [&_.sp-console]:h-full [&_.sp-console]:bg-transparent [&_.sp-console]:!border-0">
                <SandpackConsole standalone resetOnPreviewRestart />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none flex flex-col items-center">
              <div className="mb-6 flex w-full flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Xem trước thiết bị Mobile</h2>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setDevice('iphone')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${device === 'iphone' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                      iPhone 15
                    </button>
                    <button
                      onClick={() => setDevice('android')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${device === 'android' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                      Pixel
                    </button>
                    <button
                      onClick={() => setDevice('ipad')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${device === 'ipad' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                      iPad
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setOrientation('portrait')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${orientation === 'portrait' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                      Dọc
                    </button>
                    <button
                      onClick={() => setOrientation('landscape')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${orientation === 'landscape' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                      Ngang
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white transition-all"
                    >
                      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>
                </div>
              </div>
              <div className={`flex justify-center bg-slate-100 dark:bg-slate-900/50 p-8 rounded-3xl overflow-auto w-full max-h-[850px] transition-colors ${theme === 'dark' ? '!bg-slate-800/80' : ''}`}>
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
          </SandpackProvider>
        </main>
      </div>
    </div>
  )
}
