
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-4xl font-bold text-primary">
          hycalculator
        </div>
        
        <div className="spinner" />
        
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          Loading resources...
        </div>
      </div>
    </div>
  );
};

export default Loading;
