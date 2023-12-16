'use client';

import { Switch } from '@nextui-org/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between">
      <Switch
        defaultSelected
        size="md"
        color="success"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Sun className={className} onClick={() => setTheme('dark')} />
          ) : (
            <Moon className={className} onClick={() => setTheme('light')} />
          )
        }
      >
        Theme: {theme}
      </Switch>
    </div>
  );
}
