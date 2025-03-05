
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
  category: string; // Added category property
};

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Federal Reserve Signals Potential Rate Cuts Later This Year',
    description: 'Central bank officials hint at possible policy shift as inflation continues to cool and economic data shows mixed signals.',
    source: 'Financial Times',
    date: '1 hour ago',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'economy'
  },
  {
    id: '2',
    title: 'Tech Giants Face New Antitrust Scrutiny in European Markets',
    description: 'Regulators in Europe announce fresh investigations into competitive practices of major technology companies.',
    source: 'Wall Street Journal',
    date: '3 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'technology'
  },
  {
    id: '3',
    title: 'Oil Prices Surge Amid Middle East Tensions and Supply Concerns',
    description: 'Crude oil prices reach multi-month highs as geopolitical tensions escalate in key producing regions.',
    source: 'Bloomberg',
    date: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1582486225454-894913025310?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'markets'
  },
  {
    id: '4',
    title: 'Startup Valuations Show Signs of Recovery After 2023 Slump',
    description: 'Venture capital deals and valuations begin to rebound following a difficult period for early-stage companies.',
    source: 'TechCrunch',
    date: '7 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'companies'
  },
  {
    id: '5',
    title: 'Global Supply Chains Improving as Shipping Bottlenecks Ease',
    description: 'Major ports report reduced congestion and normalized shipping rates after years of disruption.',
    source: 'Reuters',
    date: '10 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'economy'
  },
  {
    id: '6',
    title: 'Cryptocurrency Market Rebounds as Bitcoin Surpasses $50,000',
    description: 'Digital assets see renewed interest from institutional investors despite ongoing regulatory uncertainties.',
    source: 'CoinDesk',
    date: '12 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    url: '#',
    category: 'markets'
  }
];

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  
  useEffect(() => {
    const loadNews = async () => {
      // Simulate API fetch delay
      setTimeout(() => {
        setNews(mockNews);
        setIsLoading(false);
      }, 1500);
    };
    
    loadNews();
  }, []);
  
  // Filter news when category or news items change
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, news]);
  
  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'markets', label: 'Markets' },
    { id: 'economy', label: 'Economy' },
    { id: 'companies', label: 'Companies' },
    { id: 'technology', label: 'Technology' },
  ];
  
  return (
    <section id="news" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Financial News
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest developments and trends in the financial world.
          </p>
        </div>
        
        <div className="flex items-center justify-center mb-10 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 p-1 bg-white/50 backdrop-blur-sm rounded-full dark:bg-gray-800/50">
            {categories.map(category => (
              <button
                key={category.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  selectedCategory === category.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-transparent text-foreground hover:bg-secondary dark:text-gray-200 dark:hover:bg-gray-700"
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          // Placeholder loading cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(null).map((_, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length > 0 ? (
          // Actual news cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.3}s`, opacity: 0 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-primary">{item.source}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <a href={item.url}>{item.title}</a>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <a 
                    href={item.url}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Read Full Article
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No results found state
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No news found for this category
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different category or check back later for updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
