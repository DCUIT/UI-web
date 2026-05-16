import Link from 'next/link';

type Props = {
  open: boolean;
  onClose: () => void;
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/templates', label: 'Templates' },
];

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button onClick={onClose} className="rounded-md px-2 py-1">Close</button>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
