'use client'

import { useEffect, useMemo, useState } from 'react'
import Editor from '@monaco-editor/react'

const defaultHtml = `
<div class="test-shell">
  <h1>Web UI Test Preview</h1>
  <p>Paste or type HTML here to preview it live.</p>
  <button id="demoButton">Click me</button>
</div>
`

const defaultCss = `
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  background: #f8fafc;
  color: #0f172a;
}

.test-shell {
  padding: 24px;
}

button {
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.4rem;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}
`

const defaultJs = `
const button = document.getElementById('demoButton');
if (button) {
  button.addEventListener('click', () => {
    alert('Button clicked in preview!');
  });
}
`

type EditorTab = 'html' | 'css' | 'js'

export default function WebUITestPage() {
  const [html, setHtml] = useState(defaultHtml)
  const [css, setCss] = useState(defaultCss)
  const [js, setJs] = useState(defaultJs)

  const [debouncedHtml, setDebouncedHtml] = useState(defaultHtml)
  const [debouncedCss, setDebouncedCss] = useState(defaultCss)
  const [debouncedJs, setDebouncedJs] = useState(defaultJs)

  const [activeTab, setActiveTab] = useState<EditorTab>('html')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHtml(html)
      setDebouncedCss(css)
      setDebouncedJs(js)
    }, 500)
    return () => clearTimeout(timer)
  }, [html, css, js])

  const previewSrcDoc = useMemo(
    () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${debouncedCss}</style>
  </head>
  <body>
    ${debouncedHtml}
    <script>${debouncedJs.replace(new RegExp('</' + 'script>', 'g'), '<\\/' + 'script>')} </script>
  </body>
</html>`,
    [debouncedHtml, debouncedCss, debouncedJs]
  )

  const editorLanguage: Record<EditorTab, string> = {
    html: 'html',
    css: 'css',
    js: 'javascript',
  }

  const editorValue: Record<EditorTab, string> = {
    html,
    css,
    js,
  }

  const setEditorValue: Record<EditorTab, (v: string) => void> = {
    html: setHtml,
    css: setCss,
    js: setJs,
  }

  return (
    <div className="flex flex-col h-screen min-h-[800px] bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Web Sandbox
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            type="button"
            onClick={() => {
              setHtml(defaultHtml)
              setCss(defaultCss)
              setJs(defaultJs)
            }}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            Reset Code
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 min-w-[400px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {/* Tab Bar */}
          <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-200 dark:border-slate-800">
            {(['html', 'css', 'js'] as EditorTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all ${
                  activeTab === tab
                    ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-t-2 border-indigo-500'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab === 'html' ? 'HTML' : tab === 'css' ? 'CSS' : 'JavaScript'}
              </button>
            ))}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={editorLanguage[activeTab]}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              value={editorValue[activeTab]}
              onChange={(value?: string) => setEditorValue[activeTab](value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 2,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preview</h2>
          </div>
          <div className="flex-1 p-4">
            <div className="w-full h-full rounded-xl border border-slate-200 shadow-sm dark:border-slate-700 overflow-hidden bg-white">
              <iframe
                title="UI Test Preview"
                srcDoc={previewSrcDoc}
                sandbox="allow-scripts"
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
