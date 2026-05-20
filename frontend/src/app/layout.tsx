import type { Metadata } from 'next';
import './globals.css';
import '../styles/typography.css';
import Providers from './providers';
import AppShell from '@/components/common/AppShell';

export const metadata: Metadata = {
  title: 'UI Platform',
  description: 'A polished UI platform with component previews, dark mode, and responsive layouts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}




