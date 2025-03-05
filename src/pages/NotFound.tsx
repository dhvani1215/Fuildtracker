
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="text-9xl font-display font-bold text-primary/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-display font-semibold text-primary">Page Not Found</div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
