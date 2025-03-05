
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Delay showing the cookie consent banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-xl p-6 border border-border">
            <div className="flex justify-between items-start">
              <div className="pr-8">
                <h3 className="text-lg font-semibold mb-2">Cookie Notice</h3>
                <p className="text-muted-foreground mb-4">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. For more information, please read our{" "}
                  <Link to="/cookies-policy" className="text-primary hover:underline">
                    Cookies Policy
                  </Link>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptCookies}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={declineCookies}
                    className="bg-secondary text-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <button
                onClick={declineCookies}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
