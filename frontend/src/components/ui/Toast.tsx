type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-50 rounded-3xl border border-slate-800/20 bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-slate-950/30 dark:border-slate-200/20 dark:bg-slate-200 dark:text-slate-950">
      {message}
    </div>
  );
}
