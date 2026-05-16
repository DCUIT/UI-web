import { useMemo, useState } from 'react';

export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?(row: T): React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  className?: string;
};

export default function DataTable<T extends Record<string, any>>({ columns, data, pageSize = 5, className }: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const va = a[sortKey as keyof T];
      const vb = b[sortKey as keyof T];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      const sa = String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? sa : -sa;
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const total = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [page, pageSize, sorted]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  return (
    <div className={className}>
      <div className="overflow-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[600px] table-auto">
          <thead className="bg-slate-50 text-left text-sm font-semibold dark:bg-slate-900">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 ${col.sortable ? 'cursor-pointer select-none' : ''}`}
                  onClick={() => col.sortable && toggleSort(String(col.key))}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {col.sortable && sortKey === String(col.key) ? (
                      <span className="text-xs text-slate-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 dark:text-slate-300">
            {pageData.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-100 dark:border-slate-800">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 align-top">
                    {col.render ? col.render(row) : (row as any)[col.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-slate-500">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-slate-600 dark:text-slate-400">Page {page} of {total}</div>
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-2xl border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
            className="rounded-2xl border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
