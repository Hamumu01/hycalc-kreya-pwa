
import React from 'react';
import Fraction from './Fraction';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  showResult: boolean;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
  showResult,
}) => {
  const isMobile = useIsMobile();
  
  // Function to parse and render fractions (like 3 1/2)
  const renderExpression = (text: string) => {
    // Match patterns like "3 1/2", "1/2" in expressions
    const fractionRegex = /(\d+\s+\d+\/\d+|\d+\/\d+)/g;
    const parts = text.split(fractionRegex);
    const matches = text.match(fractionRegex) || [];
    
    return (
      <>
        {parts.map((part, index) => {
          const match = matches[index - 1];
          if (!match) return part;
          
          // Parse the fraction parts
          if (match.includes(' ')) {
            const [whole, fraction] = match.split(' ');
            const [numerator, denominator] = fraction.split('/');
            
            return (
              <React.Fragment key={index}>
                {whole}{' '}
                <Fraction numerator={numerator} denominator={denominator} />
              </React.Fragment>
            );
          } else {
            const [numerator, denominator] = match.split('/');
            
            return (
              <React.Fragment key={index}>
                <Fraction numerator={numerator} denominator={denominator} />
              </React.Fragment>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="calc-display flex flex-col items-end glass relative">
      <div className="absolute top-2 left-3 flex space-x-1">
        <span className="w-2 h-2 rounded-full bg-destructive/60"></span>
        <span className="w-2 h-2 rounded-full bg-yellow-400/60"></span>
        <span className="w-2 h-2 rounded-full bg-green-400/60"></span>
      </div>
      
      <div className={`text-muted-foreground ${isMobile ? 'text-xl' : 'text-2xl'} overflow-x-auto whitespace-nowrap transition-all duration-300`}>
        {renderExpression(expression)}
      </div>
      
      {showResult && (
        <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold overflow-x-auto whitespace-nowrap transition-all duration-300 float`}>
          {renderExpression(result)}
        </div>
      )}
    </div>
  );
};

export default CalculatorDisplay;
