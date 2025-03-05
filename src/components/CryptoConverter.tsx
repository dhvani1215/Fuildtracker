
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bitcoin, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

type CryptoData = {
  code: string;
  name: string;
  symbol: string;
  logo?: string;
};

const cryptocurrencies: CryptoData[] = [
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', logo: '₿' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', logo: 'Ξ' },
  { code: 'USDT', name: 'Tether', symbol: '₮', logo: '₮' },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', logo: 'BNB' },
  { code: 'XRP', name: 'Ripple', symbol: 'XRP', logo: 'XRP' },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', logo: 'ADA' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', logo: 'SOL' },
  { code: 'DOT', name: 'Polkadot', symbol: 'DOT', logo: 'DOT' },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', logo: 'Ð' },
  { code: 'AVAX', name: 'Avalanche', symbol: 'AVAX', logo: 'AVAX' },
];

// Mock conversion rates (in a real app, these would come from an API)
const cryptoConversionRates: Record<string, Record<string, number>> = {
  BTC: { ETH: 13.25, USDT: 64850, BNB: 145.72, XRP: 115840, ADA: 160231, SOL: 582.8, DOT: 5210, DOGE: 480421, AVAX: 1798 },
  ETH: { BTC: 0.0755, USDT: 4890, BNB: 11, XRP: 8742, ADA: 12096, SOL: 44, DOT: 393, DOGE: 36259, AVAX: 135.7 },
  USDT: { BTC: 0.0000154, ETH: 0.000204, BNB: 0.00225, XRP: 1.79, ADA: 2.47, SOL: 0.009, DOT: 0.0804, DOGE: 7.42, AVAX: 0.0278 },
  BNB: { BTC: 0.00686, ETH: 0.09083, USDT: 444.75, XRP: 795.3, ADA: 1099.4, SOL: 4, DOT: 35.75, DOGE: 3296.7, AVAX: 12.34 },
  XRP: { BTC: 0.00000863, ETH: 0.000114, USDT: 0.5591, BNB: 0.00126, ADA: 1.38, SOL: 0.00503, DOT: 0.045, DOGE: 4.14, AVAX: 0.0155 },
  ADA: { BTC: 0.00000624, ETH: 0.0000827, USDT: 0.405, BNB: 0.00091, XRP: 0.725, SOL: 0.00364, DOT: 0.0325, DOGE: 3, AVAX: 0.0112 },
  SOL: { BTC: 0.00172, ETH: 0.0227, USDT: 111.28, BNB: 0.25, XRP: 198.76, ADA: 274.82, DOT: 8.94, DOGE: 824.2, AVAX: 3.08 },
  DOT: { BTC: 0.000192, ETH: 0.00254, USDT: 12.45, BNB: 0.028, XRP: 22.23, ADA: 30.74, SOL: 0.112, DOGE: 92.2, AVAX: 0.345 },
  DOGE: { BTC: 0.00000208, ETH: 0.0000276, USDT: 0.135, BNB: 0.000303, XRP: 0.241, ADA: 0.333, SOL: 0.00121, DOT: 0.0108, AVAX: 0.00374 },
  AVAX: { BTC: 0.000556, ETH: 0.00737, USDT: 36.07, BNB: 0.081, XRP: 64.45, ADA: 89.13, SOL: 0.325, DOT: 2.9, DOGE: 267.38 },
};

const CryptoConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCrypto, setFromCrypto] = useState<string>('BTC');
  const [toCrypto, setToCrypto] = useState<string>('ETH');
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
    
    const section = document.getElementById('crypto');
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
      if (fromCrypto === toCrypto) {
        setConvertedAmount(Number(amount));
      } else {
        const rate = cryptoConversionRates[fromCrypto][toCrypto];
        setConvertedAmount(Number(amount) * rate);
      }
      setIsConverting(false);
    }, 600);
  };
  
  const handleSwapCryptos = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
    setConvertedAmount(null);
  };
  
  return (
    <section id="crypto" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Crypto Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Cryptocurrency Converter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert between popular cryptocurrencies with our easy-to-use calculator.
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
              <label htmlFor="crypto-amount" className="block text-sm font-medium text-foreground mb-2">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Bitcoin className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  name="crypto-amount"
                  id="crypto-amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full pl-10 rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 text-lg focus:border-primary focus:ring-primary"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            
            {/* Cryptocurrency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              <div className="md:col-span-3">
                <label htmlFor="fromCrypto" className="block text-sm font-medium text-foreground mb-2">
                  From
                </label>
                <select
                  id="fromCrypto"
                  value={fromCrypto}
                  onChange={(e) => {
                    setFromCrypto(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 focus:border-primary focus:ring-primary"
                >
                  {cryptocurrencies.map((crypto) => (
                    <option key={`from-${crypto.code}`} value={crypto.code}>
                      {crypto.logo} {crypto.code} - {crypto.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleSwapCryptos}
                  className="p-3 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label="Swap cryptocurrencies"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              
              <div className="md:col-span-3">
                <label htmlFor="toCrypto" className="block text-sm font-medium text-foreground mb-2">
                  To
                </label>
                <select
                  id="toCrypto"
                  value={toCrypto}
                  onChange={(e) => {
                    setToCrypto(e.target.value);
                    setConvertedAmount(null);
                  }}
                  className="block w-full rounded-md border-gray-300 bg-white/60 backdrop-blur-md px-4 py-3 focus:border-primary focus:ring-primary"
                >
                  {cryptocurrencies.map((crypto) => (
                    <option key={`to-${crypto.code}`} value={crypto.code}>
                      {crypto.logo} {crypto.code} - {crypto.name}
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
                    {cryptocurrencies.find(c => c.code === fromCrypto)?.symbol}{amount} {fromCrypto} =
                  </div>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {cryptocurrencies.find(c => c.code === toCrypto)?.symbol}{convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {toCrypto}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    *Conversion rates are for demonstration purposes only
                  </p>
                </div>
              </div>
            )}

            {/* Market Info */}
            <div className="mt-2 text-xs text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>24h Change</span>
                <span className="text-green-500">+2.45%</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>24h Volume</span>
                <span>$48.2B</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>Market Cap</span>
                <span>$1.24T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoConverter;
