
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('welcomeMessageSeen');
    if (!hasSeenWelcome) {
      // Show welcome message shortly after page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleClose = () => {
    sessionStorage.setItem('welcomeMessageSeen', 'true');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-20 right-6 z-50 max-w-sm"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          <div className="bg-card rounded-lg shadow-lg border border-border p-4 overflow-hidden">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Welcome to FluidFinance!</h3>
                <p className="text-sm text-muted-foreground">
                  Track real-time stock data, read the latest financial news, and convert currencies all in one place.
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="ml-4 text-muted-foreground hover:text-foreground" 
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                onClick={handleClose}
                className="px-4 py-1 text-sm bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got it
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
