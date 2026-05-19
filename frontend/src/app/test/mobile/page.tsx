'use client'

import { useEffect, useMemo, useState } from 'react'
import PhoneFrame, { DeviceType } from '@/components/mobile-playground/devices/PhoneFrame'
import Editor from '@monaco-editor/react'

const defaultHtml = `
<div class="mobile-app">
  <header class="app-header">
    <div class="menu-icon">☰</div>
    <h2>My App</h2>
    <div class="profile-icon">👤</div>
  </header>
  <main class="app-content">
    <div class="welcome-card">
      <h3>Welcome back!</h3>
      <p>Here is your daily summary.</p>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <h4>Tasks</h4>
        <p>12</p>
      </div>
      <div class="stat-card">
        <h4>Messages</h4>
        <p>5</p>
      </div>
    </div>
    <button id="actionButton" class="primary-btn">Start New Task</button>
  </main>
  <nav class="bottom-nav">
    <div class="nav-item active">🏠</div>
    <div class="nav-item">🔍</div>
    <div class="nav-item">🔔</div>
    <div class="nav-item">⚙️</div>
  </nav>
</div>
`

const defaultCss = `
body {
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

const defaultJs = `
const button = document.getElementById('actionButton');
if (button) {
  button.addEventListener('click', () => {
    button.textContent = 'Task Started!';
    button.style.background = '#22c55e';
    setTimeout(() => {
      button.textContent = 'Start New Task';
      button.style.background = '#0f172a';
    }, 2000);
  });
}
`

export default function MobileUITestPage() {
  const [html, setHtml] = useState(defaultHtml)
  const [css, setCss] = useState(defaultCss)
  const [js, setJs] = useState(defaultJs)

  const [debouncedHtml, setDebouncedHtml] = useState(defaultHtml)
  const [debouncedCss, setDebouncedCss] = useState(defaultCss)
  const [debouncedJs, setDebouncedJs] = useState(defaultJs)

  const [device, setDevice] = useState<DeviceType>('iphone')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHtml(html)
      setDebouncedCss(css)
      setDebouncedJs(js)
    }, 500)
    return () => clearTimeout(timer)
  }, [html, css, js])

  const previewSrcDoc = useMemo(
    () => \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>\${debouncedCss}</style>
  </head>
  <body>
    \${debouncedHtml}
    <script>\${debouncedJs.replace(/<\/script>/g, '<\\\\/script>')} </script>
  </body>
</html>\`,
    [debouncedHtml, debouncedCss, debouncedJs]
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Đã sao chép vào clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Mobile App UI Tester</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Nhập mã HTML, CSS và JavaScript vào trình chỉnh sửa để xem trước ngay lập tức.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setHtml(defaultHtml)
              setCss(defaultCss)
              setJs(defaultJs)
            }}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Reset starter code
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-4 flex flex-col h-full">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 flex-1 flex flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
                  <button onClick={() => setActiveTab('html')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'html' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>HTML</button>
                  <button onClick={() => setActiveTab('css')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'css' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>CSS</button>
                  <button onClick={() => setActiveTab('js')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'js' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>JavaScript</button>
                </div>
                <button 
                  onClick={() => copyToClipboard(activeTab === 'html' ? html : activeTab === 'css' ? css : js)}
                  className="text-xs px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy {activeTab.toUpperCase()}
                </button>
              </div>
              
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e] min-h-[500px]">
                <Editor
                  height="100%"
                  language={activeTab === 'js' ? 'javascript' : activeTab}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={activeTab === 'html' ? html : activeTab === 'css' ? css : js}
                  onChange={(value) => {
                    if (activeTab === 'html') setHtml(value || '')
                    if (activeTab === 'css') setCss(value || '')
                    if (activeTab === 'js') setJs(value || '')
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
                  <iframe
                    title="UI Test Preview"
                    srcDoc={previewSrcDoc}
                    sandbox="allow-scripts"
                    className="h-full w-full border-0 bg-white"
                  />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
