'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { ThemeSync } from './theme-logic';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}


