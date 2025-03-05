
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Key } from 'lucide-react';
import { motion } from 'framer-motion';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Cookies Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
        
        <motion.div 
          className="space-y-8 bg-card p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Essential cookies: These are necessary for the website to function properly</li>
              <li>Preferences cookies: These remember your settings and choices</li>
              <li>Analytics cookies: These help us understand how visitors interact with our website</li>
              <li>Marketing cookies: These track your online activity to help deliver relevant advertising</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Session Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are temporary and expire when you close your browser. They are used to keep you logged in as you navigate through our website.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Persistent Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies remain on your device until they expire or you delete them. They help us recognize you when you return to our website.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Third-Party Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are set by third-party services that appear on our pages, such as analytics and advertising services.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Delete cookies from your device</li>
              <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
              <li>Set your browser to notify you when you receive a cookie</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Please note that if you choose to block or delete cookies, some features of our website may not work properly.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Cookies Policy</h2>
            <p className="text-muted-foreground">
              We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
