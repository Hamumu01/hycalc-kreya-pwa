
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

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
      {/* Background gradients for visual interest */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-kreya-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="z-10 flex flex-col items-center space-y-8 px-4 max-w-md w-full">
        {/* Title */}
        <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kreya-blue via-kreya-lightBlue to-kreya-blue">
          hycalculator
        </div>
        
        {/* Progress bar - replacing circular loader */}
        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
          <p className="text-sm text-muted-foreground text-center">
            Loading resources... {progress}%
          </p>
        </div>
        
        {/* Decorative element */}
        <div className="flex justify-center gap-3 pt-4">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="h-2 w-2 rounded-full bg-kreya-blue animate-bounce-subtle" 
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
