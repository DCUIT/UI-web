'use client';

import { useEffect, useMemo, useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';

const DEFAULT_CODE = `import React from 'react';

export default function PlaygroundComponent() {
  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: 18, fontWeight: 800 }}>Playground Preview</h2>
      <p style={{ opacity: 0.8 }}>MVP: Live render stub. Next step sẽ tích hợp Sandpack/iframe runtime.</p>
      <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #6366f1', background: '#eef2ff' }}>
        Action
      </button>
    </div>
  );
}
`;

type Device = 'desktop' | 'mobile';
type Orientation = 'portrait' | 'landscape';

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [device, setDevice] = useState<Device>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  // Theme sync với class trên html/body (đang do next-themes quản lý)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const deviceDims = useMemo(() => {
    if (device === 'desktop') return { w: 900, h: 600 };
    // mobile frame
    return orientation === 'portrait'
      ? { w: 390, h: 740 }
      : { w: 740, h: 390 };
  }, [device, orientation]);

  const tabs = useMemo(
    () =>
      [
        {
          value: 'preview',
          label: 'Preview',
          content: (
            <div className="h-full">
              <div className="relative mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950" style={{ width: deviceDims.w, height: deviceDims.h }}>
                {/* Safe area */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-indigo-500/10 to-transparent" />
                  <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-indigo-500/10 to-transparent" />

                  <div className="absolute inset-0 p-4">
                    <div className="h-full w-full overflow-auto rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                      {/* MVP stub render */}
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                          <span className="h-2 w-2 rounded-full bg-indigo-500" />
                          Live Preview (stub)
                        </div>
                        <div className="text-sm font-semibold text-slate-950 dark:text-white">
                          {device === 'desktop' ? 'Desktop' : `Mobile (${orientation})`}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          MVP hiện tại: editor + frame + theme switch. Bước kế tiếp: tích hợp sandbox runtime (Sandpack/iframe) để render code thật.
                        </p>
                        <Button variant="primary">Button</Button>
                      </div>
                    </div>
                  </div>

                  {/* Phone frame bezel */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10" />
                  <div className="pointer-events-none absolute left-1/2 top-2 h-2 w-28 -translate-x-1/2 rounded-full bg-slate-900/10 dark:bg-white/10" />
                </div>
              </div>
            </div>
          ),
        },
        {
          value: 'tsx',
          label: 'TSX',
          content: (
            <div className="h-full">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="h-[520px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">MVP: placeholder textarea thay Monaco.</p>
            </div>
          ),
        },
        {
          value: 'css',
          label: 'CSS',
          content: (
            <div className="h-full rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              MVP: placeholder (sẽ tích hợp editor CSS + sync vào preview).
            </div>
          ),
        },
        {
          value: 'usage',
          label: 'Usage',
          content: (
            <div className="h-full rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {`// Copy sang project thật
// 1) TSX
// 2) CSS
// 3) Props usage (tuỳ component)
`}
              </pre>
            </div>
          ),
        },
      ] as const,
    [code, device, orientation, deviceDims.w, deviceDims.h]
  );

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Playground</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Playground / Sandbox Page</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            MVP: Preview frame + editor stub. Next: tích hợp Monaco + Sandpack runtime để render code thật.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">Device</span>
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
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
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${orientation === 'portrait' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Portrait
            </button>
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              className={`rounded-lg px-2 py-1 text-xs font-bold transition ${orientation === 'landscape' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              Landscape
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left controls */}
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Controls (MVP)</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sẽ mở rộng sau: props controls, dependencies, console viewer.</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Copy</p>
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                await navigator.clipboard.writeText(code);
              }}
              className="w-full"
            >
              Copy TSX
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                await navigator.clipboard.writeText(code);
              }}
              className="w-full"
            >
              Copy full component
            </Button>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <p className="font-bold text-slate-900 dark:text-white">Console/Error viewer</p>
            <p className="mt-1">MVP hiện tại: chưa có runtime sandbox để bắt lỗi.</p>
          </div>
        </aside>

        {/* Main */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <Tabs items={tabs as any} />
        </div>
      </div>
    </section>
  );
}

