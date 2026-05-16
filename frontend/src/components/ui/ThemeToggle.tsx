'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Button from './Button';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="h-11 px-4 text-slate-700 dark:text-slate-200"
    >
      {mounted ? (
        <span className="inline-flex items-center gap-2">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? 'Light' : 'Dark'}
        </span>
      ) : (
        'Theme'
      )}
    </Button>
  );
}
