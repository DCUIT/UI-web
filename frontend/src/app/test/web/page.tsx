'use client'

import { useEffect, useMemo, useState } from 'react'

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

export default function WebUITestPage() {
  const [html, setHtml] = useState(defaultHtml)
  const [css, setCss] = useState(defaultCss)
  const [js, setJs] = useState(defaultJs)

  const [debouncedHtml, setDebouncedHtml] = useState(defaultHtml)
  const [debouncedCss, setDebouncedCss] = useState(defaultCss)
  const [debouncedJs, setDebouncedJs] = useState(defaultJs)

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const value = target.value
      
      setter(value.substring(0, start) + '  ' + value.substring(end))
      
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Web UI Tester</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Nhập mã HTML, CSS và JavaScript vào trình chỉnh sửa để xem trước trên giao diện Desktop.
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
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">HTML</h2>
                </div>
              </div>
              <textarea
                value={html}
                onChange={(event) => setHtml(event.target.value)}
                onKeyDown={(e) => handleKeyDown(e, setHtml)}
                spellCheck={false}
                className="h-48 w-full font-mono rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">CSS</h2>
                </div>
              </div>
              <textarea
                value={css}
                onChange={(event) => setCss(event.target.value)}
                onKeyDown={(e) => handleKeyDown(e, setCss)}
                spellCheck={false}
                className="h-48 w-full font-mono rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">JavaScript</h2>
                </div>
              </div>
              <textarea
                value={js}
                onChange={(event) => setJs(event.target.value)}
                onKeyDown={(e) => handleKeyDown(e, setJs)}
                spellCheck={false}
                className="h-48 w-full font-mono rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none flex flex-col items-center">
              <div className="mb-6 flex w-full items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Xem trước giao diện Desktop</h2>
                </div>
              </div>
              <div className="transition-all duration-500 ease-in-out relative w-full h-[600px] rounded-xl border border-slate-200 shadow-sm dark:border-slate-700 overflow-hidden">
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
    </div>
  )
}
