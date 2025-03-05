
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active section based on scroll position
      const sections = ['hero', 'stocks', 'news', 'converter'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className={cn(
            "text-xl font-display font-semibold transition-colors duration-300",
            scrolled 
              ? "text-primary" 
              : "text-white dark:text-white"
          )}>
            FluidFinance
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'news', label: 'News' },
            { id: 'converter', label: 'Converter' }
          ].map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "nav-link text-sm font-medium transition-colors duration-300",
                scrolled 
                  ? "text-foreground" 
                  : "text-white dark:text-white",
                activeSection === item.id && "nav-link-active"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle 
            className={cn(
              !scrolled && "bg-white/10 text-white hover:bg-white/20 dark:bg-gray-800/40 dark:hover:bg-gray-800/60"
            )} 
          />
          
          <div className="md:hidden">
            <button 
              className={cn(
                "p-2 rounded-full transition-colors",
                scrolled 
                  ? "text-foreground hover:bg-secondary" 
                  : "text-white hover:bg-white/10 dark:hover:bg-gray-800/30"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
