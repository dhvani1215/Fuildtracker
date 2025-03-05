
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    if (!hasSubscribed) {
      // Delay showing the newsletter popup
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 45000); // Show after 45 seconds on site
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Handle subscription
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our financial updates soon.",
      variant: "default"
    });
    
    localStorage.setItem('newsletterSubscribed', 'true');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-card rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80" 
                alt="Financial Newsletter" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-6">
                <h2 className="text-white text-2xl font-bold">Stay Updated with Market Trends</h2>
              </div>
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-1 hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter and get the latest financial insights delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe Now
                </motion.button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>{" "}
                  and{" "}
                  <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
