export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/95 py-10 dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} UI Platform. Built with Next.js, Tailwind CSS, and React.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>Responsive UI</span>
          <span>Dark mode</span>
          <span>Component previews</span>
        </div>
      </div>
    </footer>
  );
}

