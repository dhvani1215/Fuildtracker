
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
        
        <motion.div 
          className="space-y-8 bg-card p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              These Terms of Service ("Terms") govern your access to and use of the FluidFinance website. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Using Our Services</h2>
            <p className="text-muted-foreground mb-4">
              Our services are designed to provide financial information and tools. You must use them in compliance with applicable laws and regulations. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use our services for any illegal purpose</li>
              <li>Breach or circumvent our security measures</li>
              <li>Interfere with the operation of our services</li>
              <li>Scrape, crawl, or spider any content on our website</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Financial Information Disclaimer</h2>
            <p className="text-muted-foreground">
              The financial information provided through our services is for informational purposes only and should not be considered financial advice. Always consult with a qualified financial advisor before making investment decisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              The content, features, and functionality of our services, including text, graphics, logos, and software, are owned by FluidFinance and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, FluidFinance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on this page and updating the "Last updated" date.
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

export default TermsOfService;
