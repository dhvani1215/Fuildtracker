
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type CurrencyData = {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
};

const currencies: CurrencyData[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
];

// Mock conversion rates (in a real app, these would come from an API)
const conversionRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.91, GBP: 0.78, JPY: 149.95, CAD: 1.35, AUD: 1.50, CHF: 0.88, CNY: 7.19, INR: 83.10, BRL: 5.05 },
  EUR: { USD: 1.10, GBP: 0.85, JPY: 164.87, CAD: 1.48, AUD: 1.64, CHF: 0.96, CNY: 7.90, INR: 91.23, BRL: 5.54 },
  GBP: { USD: 1.29, EUR: 1.17, JPY: 193.56, CAD: 1.74, AUD: 1.93, CHF: 1.13, CNY: 9.27, INR: 107.15, BRL: 6.50 },
  JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0052, CAD: 0.0090, AUD: 0.0100, CHF: 0.0059, CNY: 0.048, INR: 0.55, BRL: 0.034 },
  CAD: { USD: 0.74, EUR: 0.67, GBP: 0.57, JPY: 111.07, AUD: 1.11, CHF: 0.65, CNY: 5.32, INR: 61.56, BRL: 3.73 },
  AUD: { USD: 0.67, EUR: 0.61, GBP: 0.52, JPY: 100.03, CAD: 0.90, CHF: 0.59, CNY: 4.79, INR: 55.38, BRL: 3.36 },
  CHF: { USD: 1.14, EUR: 1.04, GBP: 0.88, JPY: 171.54, CAD: 1.54, AUD: 1.71, CNY: 8.21, INR: 94.97, BRL: 5.76 },
  CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 20.86, CAD: 0.19, AUD: 0.21, CHF: 0.12, INR: 11.56, BRL: 0.70 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0093, JPY: 1.80, CAD: 0.016, AUD: 0.018, CHF: 0.011, CNY: 0.087, BRL: 0.061 },
  BRL: { USD: 0.20, EUR: 0.18, GBP: 0.15, JPY: 29.69, CAD: 0.27, AUD: 0.30, CHF: 0.17, CNY: 1.42, INR: 16.44 },
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('converter');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    setIsConverting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (fromCurrency === toCurrency) {
        setConvertedAmount(Number(amount));
      } else {
        const rate = conversionRates[fromCurrency][toCurrency];
        setConvertedAmount(Number(amount) * rate);
      }
      setIsConverting(false);
    }, 600);
  };
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };
  
  return (
    <section id="converter" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Currency Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Currency Converter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick and easy currency conversion with real-time exchange rates.
          </p>
        </div>
        
        <div 
          className={cn(
            "max-w-2xl mx-auto glass rounded-2xl p-8 shadow-lg transition-all duration-700 transform",
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 text-lg focus:border-primary focus:ring-primary"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            
            {/* Currency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              <div className="md:col-span-3">
                <label htmlFor="fromCurrency" className="block text-sm font-medium text-foreground mb-2">
                  From
                </label>
                <select
                  id="fromCurrency"
                  value={fromCurrency}
                  onChange={(e) => {
                    setFromCurrency(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 focus:border-primary focus:ring-primary"
                >
                  {currencies.map((currency) => (
                    <option key={`from-${currency.code}`} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleSwapCurrencies}
                  className="p-3 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label="Swap currencies"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3l4 4-4 4"></path>
                    <path d="M20 7H4"></path>
                    <path d="M8 21l-4-4 4-4"></path>
                    <path d="M4 17h16"></path>
                  </svg>
                </button>
              </div>
              
              <div className="md:col-span-3">
                <label htmlFor="toCurrency" className="block text-sm font-medium text-foreground mb-2">
                  To
                </label>
                <select
                  id="toCurrency"
                  value={toCurrency}
                  onChange={(e) => {
                    setToCurrency(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 focus:border-primary focus:ring-primary"
                >
                  {currencies.map((currency) => (
                    <option key={`to-${currency.code}`} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Convert Button */}
            <div className="mt-6">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isConverting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </span>
                ) : "Convert"}
              </button>
            </div>
            
            {/* Result */}
            {convertedAmount !== null && (
              <div className="mt-6 p-4 bg-secondary/50 backdrop-blur-sm rounded-lg animate-fade-in">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Converted Amount</p>
                  <div className="text-2xl font-bold text-foreground">
                    {currencies.find(c => c.code === fromCurrency)?.symbol}{amount} {fromCurrency} =
                  </div>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {currencies.find(c => c.code === toCurrency)?.symbol}{convertedAmount.toFixed(2)} {toCurrency}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    *Exchange rates are for informational purposes only
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
