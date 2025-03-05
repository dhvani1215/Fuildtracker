
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 flex items-center justify-center rounded-full", className)}>
        <span className="h-5 w-5 bg-muted animate-pulse rounded-full"></span>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-full transition-colors", 
        theme === "dark" 
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
          : "bg-secondary/20 text-foreground hover:bg-secondary/30",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
