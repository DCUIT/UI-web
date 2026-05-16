'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeSync() {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return null;
}

