
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 167.63, change: 1.25, changePercent: 0.75 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 390.27, change: -2.81, changePercent: -0.72 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.93, change: 0.57, changePercent: 0.41 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.75, change: 3.24, changePercent: 1.85 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 173.80, change: -5.36, changePercent: -2.99 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 468.09, change: 6.54, changePercent: 1.42 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 907.69, change: 15.38, changePercent: 1.72 },
  { symbol: 'BRK.A', name: 'Berkshire Hathaway', price: 608930, change: 1580, changePercent: 0.26 },
];

const StockSection = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    const loadStocks = async () => {
      // Simulate API fetch delay
      setTimeout(() => {
        setStocks(mockStocks);
        setIsLoading(false);
        
        // Remove placeholders after a short delay
        setTimeout(() => {
          setShowPlaceholder(false);
        }, 300);
      }, 1000);
    };
    
    loadStocks();
  }, []);
  
  return (
    <section id="stocks" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Real-Time Data
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Stock Market Overview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track the latest prices and performance of top companies from around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(showPlaceholder ? Array(8).fill(null) : stocks).map((stock, index) => (
            <div 
              key={stock?.symbol || index}
              className={cn(
                "glass rounded-2xl p-6 card-hover fade-in",
                !showPlaceholder && "animate-scale-in"
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {showPlaceholder ? (
                <>
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <span className={cn(
                      "text-sm px-2 py-1 rounded-full",
                      stock.changePercent >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-2xl font-semibold mb-1">
                      ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={stock.change >= 0 ? "stock-increase" : "stock-decrease"}>
                      {stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change).toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StockSection;
