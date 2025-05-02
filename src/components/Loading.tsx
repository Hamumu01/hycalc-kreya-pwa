
import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down as we approach 100%
        const increment = Math.max(1, 10 - Math.floor(prev / 10));
        const next = Math.min(100, prev + increment);
        
        // Stop the interval when we reach 100%
        if (next >= 100) {
          clearInterval(interval);
        }
        
        return next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background animated-bg">
      <div className="flex flex-col items-center space-y-12">
        <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kreya-blue via-kreya-lightBlue to-kreya-blue float">
          hycalculator
        </div>
        
        <div className="relative size-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-kreya-blue to-kreya-lightBlue opacity-20 animate-ping" />
          <div className="spinner" />
        </div>
        
        <div className="w-64 h-3 bg-muted rounded-full overflow-hidden glass">
          <div 
            className="h-full bg-gradient-to-r from-kreya-blue via-kreya-lightBlue to-kreya-blue transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          Loading resources... {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loading;
