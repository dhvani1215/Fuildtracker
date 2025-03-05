
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient - different for dark and light modes */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 dark:from-primary/80 dark:to-primary/30 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full bg-white/10 dark:bg-white/5 animate-float",
              i % 2 === 0 ? "animate-pulse-slow" : ""
            )}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <h1 
          className={cn(
            "text-4xl md:text-6xl font-display font-bold text-white mb-6 transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "100ms" }}
        >
          Track the Markets <span className="text-blue-100 dark:text-blue-200">in Real-Time</span>
        </h1>
        
        <p 
          className={cn(
            "text-lg md:text-xl text-blue-50 dark:text-blue-100 max-w-2xl mx-auto mb-8 transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          Get live stock data, financial news, and currency conversion tools all in one elegant dashboard.
        </p>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <a 
            href="#stocks" 
            className="bg-white dark:bg-white/90 text-primary font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explore Markets
          </a>
          <a 
            href="#news" 
            className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Latest News
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={cn(
            "absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
