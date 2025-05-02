
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import CalculatorDisplay from '../components/CalculatorDisplay';
import { 
  isValidNumber, 
  fractionToDecimal, 
  calculateResult,
  calculateScientific,
  formatNumber 
} from '../utils/calculatorUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/components/ui/use-toast";

const ScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [operation, setOperation] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
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
        } else if (e.key === '^') {
          handleOperation('^');
        } else if (e.key === '%') {
          handlePercent();
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

  const handleScientificOperation = (op: string) => {
    try {
      if (input === '') return;
      
      const value = fractionToDecimal(input);
      const calculatedResult = calculateScientific(value, op);
      
      setResult(formatNumber(calculatedResult));
      setInput(formatNumber(calculatedResult));
      setOverwrite(true);
      setShowResult(true);
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
      
      setResult(formatNumber(calculatedResult));
      setInput(formatNumber(calculatedResult));
      setFirstOperand(null);
      setOperation('');
      setOverwrite(true);
      setShowResult(true);
    } catch (err) {
      setError((err as Error).message);
      handleClear();
    }
  };

  const handleFraction = () => {
    if (input.includes('/')) return;
    setInput(input + '/');
  };

  const handlePercent = () => {
    try {
      if (input === '') return;
      
      const value = fractionToDecimal(input);
      const calculatedResult = value / 100;
      
      setResult(formatNumber(calculatedResult));
      setInput(formatNumber(calculatedResult));
      setOverwrite(true);
      setShowResult(true);
    } catch (err) {
      setError((err as Error).message);
    }
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
      <CalculatorDisplay 
        expression={buildExpression()}
        result={result}
        showResult={showResult}
      />
      
      <div className="calc-buttons grid grid-cols-5 gap-2">
        <Button onClick={() => handleScientificOperation('sin')}>sin</Button>
        <Button onClick={() => handleScientificOperation('cos')}>cos</Button>
        <Button onClick={() => handleScientificOperation('tan')}>tan</Button>
        <Button onClick={handleClear}>C</Button>
        <Button onClick={handleDelete}>⌫</Button>
        
        <Button onClick={() => handleScientificOperation('ln')}>ln</Button>
        <Button onClick={() => handleScientificOperation('log')}>log</Button>
        <Button onClick={() => handleScientificOperation('!')}>x!</Button>
        <Button onClick={handlePercent}>%</Button>
        <Button variant="primary" onClick={() => handleOperation('÷')}>÷</Button>
        
        <Button onClick={() => handleOperation('^')}>x^y</Button>
        <Button onClick={() => handleScientificOperation('sqrt')}>√</Button>
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        
        <Button onClick={() => handleScientificOperation('exp')}>e^x</Button>
        <Button onClick={() => handleFraction()}>a/b</Button>
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        
        <Button onClick={() => handleNumber('(')}>(</Button>
        <Button onClick={() => handleNumber(')')}>)</Button>
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        
        <Button onClick={() => handleOperation('mod')}>mod</Button>
        <Button onClick={() => handleNumber('0')}>0</Button>
        <Button onClick={() => handleNumber('.')}>.</Button>
        <Button variant="primary" onClick={handleEquals} wide>=</Button>
      </div>
    </div>
  );
};

export default ScientificCalculator;
