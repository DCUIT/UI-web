'use client';

import React from 'react';

type ComponentPreviewProps = {
  name: string;
  children?: React.ReactNode;
  code: string;
};

export default function ComponentPreview({ name, children, code }: ComponentPreviewProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{name}</h3>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800/80 dark:bg-slate-950">
          {children}
        </div>

        <pre className="max-h-[260px] overflow-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-slate-100 dark:bg-slate-950">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
