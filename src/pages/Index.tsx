
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StockSection from '@/components/StockSection';
import NewsSection from '@/components/NewsSection';
import CurrencyConverter from '@/components/CurrencyConverter';
import CryptoConverter from '@/components/CryptoConverter';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import NewsletterPopup from '@/components/NewsletterPopup';
import WelcomeMessage from '@/components/WelcomeMessage';

const Index = () => {
  // Set up smooth scrolling for anchor links
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StockSection />
      <NewsSection />
      <CurrencyConverter />
      <CryptoConverter />
      <Footer />
      <CookieConsent />
      <NewsletterPopup />
      <WelcomeMessage />
    </div>
  );
};

export default Index;
