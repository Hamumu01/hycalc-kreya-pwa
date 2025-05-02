
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import CalculatorDisplay from '../components/CalculatorDisplay';
import { 
  isValidNumber, 
  fractionToDecimal, 
  decimalToFraction, 
  calculateResult, 
  formatNumber 
} from '../utils/calculatorUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/components/ui/use-toast";
import { Calculator as CalculatorIcon } from 'lucide-react';

const BasicCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [operation, setOperation] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [animateResult, setAnimateResult] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Enable keyboard input on desktop
  useEffect(() => {
    if (!isMobile) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.match(/[0-9]/) || e.key === '.') {
          handleNumber(e.key);
        } else if (e.key === '+') {
          handleOperation('+');
        } else if (e.key === '-') {
          handleOperation('-');
        } else if (e.key === '*' || e.key === 'x') {
          handleOperation('×');
        } else if (e.key === '/') {
          handleOperation('÷');
        } else if (e.key === 'Enter' || e.key === '=') {
          handleEquals();
        } else if (e.key === 'Backspace') {
          handleDelete();
        } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
          handleClear();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobile, input, firstOperand, operation, overwrite]);

  // Handle errors with toast
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
      setError('');
    }
  }, [error, toast]);

  const handleNumber = (value: string) => {
    if (overwrite) {
      setInput(value);
      setOverwrite(false);
    } else {
      setInput(input + value);
    }
    setShowResult(false);
  };

  const handleOperation = (op: string) => {
    try {
      if (input === '' && firstOperand === null) return;
      
      if (operation && input && firstOperand !== null) {
        // Complete the pending operation first
        handleEquals();
      }
      
      if (input !== '') {
        // Parse fraction if input contains one
        const numValue = fractionToDecimal(input);
        setFirstOperand(numValue);
      }
      
      setOperation(op);
      setOverwrite(true);
      setShowResult(true);
      setResult(input || (firstOperand !== null ? formatNumber(firstOperand) : '0'));
    } catch (err) {
      setError((err as Error).message);
      handleClear();
    }
  };

  const handleEquals = () => {
    try {
      if (firstOperand === null || operation === '' || input === '') return;
      
      const second = fractionToDecimal(input);
      const calculatedResult = calculateResult(firstOperand, second, operation);
      
      // Display the result as a number or fraction
      setResult(formatNumber(calculatedResult));
      setInput(formatNumber(calculatedResult));
      setFirstOperand(null);
      setOperation('');
      setOverwrite(true);
      setShowResult(true);
      
      // Add animation to highlight result
      setAnimateResult(true);
      setTimeout(() => setAnimateResult(false), 800);
    } catch (err) {
      setError((err as Error).message);
      handleClear();
    }
  };

  const handleFraction = () => {
    if (input.includes('/')) return;
    setInput(input + '/');
  };

  const handleDelete = () => {
    if (overwrite || input === '') return;
    setInput(input.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
    setResult('0');
    setOperation('');
    setFirstOperand(null);
    setOverwrite(false);
    setShowResult(false);
  };

  // Build the expression to display
  const buildExpression = () => {
    if (operation && firstOperand !== null) {
      return `${formatNumber(firstOperand)} ${operation} ${input}`;
    }
    return input || '0';
  };

  return (
    <div className="calc-container">
      <div className="mb-2 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/40 px-3 py-1 rounded-full text-sm text-muted-foreground glass">
          <CalculatorIcon size={14} /> Basic Calculator
        </div>
      </div>
      
      <CalculatorDisplay 
        expression={buildExpression()}
        result={result}
        showResult={showResult}
      />
      
      <div className={`calc-buttons ${animateResult ? 'pulse' : ''}`}>
        <Button onClick={handleClear}>C</Button>
        <Button onClick={handleDelete}>⌫</Button>
        <Button onClick={() => handleFraction()}>a/b</Button>
        <Button variant="primary" onClick={() => handleOperation('÷')}>÷</Button>
        
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button variant="primary" onClick={() => handleOperation('×')}>×</Button>
        
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button variant="primary" onClick={() => handleOperation('-')}>-</Button>
        
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button variant="primary" onClick={() => handleOperation('+')}>+</Button>
        
        <Button onClick={() => handleNumber('0')}>0</Button>
        <Button onClick={() => handleNumber('.')}>.</Button>
        <Button variant="primary" wide onClick={handleEquals}>=</Button>
      </div>
    </div>
  );
};

export default BasicCalculator;
