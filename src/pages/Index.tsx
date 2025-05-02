
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircleCheck, Calculator, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: <Calculator className="h-8 w-8" />, title: "Basic Calculator", description: "Perform everyday calculations with ease" },
    { icon: <Calculator className="h-8 w-8" />, title: "Scientific Mode", description: "Advanced functions for complex calculations" },
    { icon: <Calculator className="h-8 w-8" />, title: "Unit Converter", description: "Convert between different units effortlessly" }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    // Rotate through features
    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);
  
  const handleGetStarted = () => {
    navigate('/calculator');
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-kreya-blue/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent)]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 z-10 flex flex-col items-center justify-center flex-grow">
        <div className={`transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center space-y-8 max-w-3xl mx-auto`}>
          {/* Logo/Icon */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-kreya-blue to-kreya-lightBlue rounded-xl animate-float"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
              hc
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
              <CircleCheck className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
          {/* Name */}
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-kreya-blue via-kreya-lightBlue to-kreya-blue">
              hycalculator
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-muted-foreground">
            Your powerful calculator for everyday calculations
          </p>
          
          {/* Feature highlight */}
          <div className="h-32 flex items-center justify-center">
            <div className="transition-all duration-500 transform flex flex-col items-center space-y-2">
              <div className="p-3 bg-gradient-to-br from-kreya-blue/10 to-kreya-lightBlue/20 rounded-full backdrop-blur-sm">
                {features[currentFeature].icon}
              </div>
              <h3 className="text-xl font-medium">{features[currentFeature].title}</h3>
              <p className="text-sm text-muted-foreground">{features[currentFeature].description}</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              onClick={handleGetStarted}
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-kreya-blue to-kreya-lightBlue hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300 group"
            >
              Get Started 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground z-10">
        © KREYA 2025 • All calculations are performed locally
      </footer>
    </div>
  );
};

export default Index;
