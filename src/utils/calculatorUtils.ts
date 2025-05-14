
// Helper function to check if string can be parsed to a valid number
export const isValidNumber = (str: string): boolean => {
  if (!str) return false;
  // Check for basic decimal numbers
  if (/^-?\d*\.?\d+$/.test(str)) return true;
  
  // Check for mixed fractions like 3 1/2 or simple fractions like 1/2
  const fractionRegex = /^(-?\d+\s+)?\d+\/\d+$/;
  return fractionRegex.test(str);
};

// Convert a string with fractions to a decimal number
export const fractionToDecimal = (str: string): number => {
  str = str.trim();
  
  // Check if it's a mixed fraction like "3 1/2"
  const mixedMatch = str.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const [, whole, numerator, denominator] = mixedMatch;
    const wholeNum = parseInt(whole);
    const sign = wholeNum < 0 ? -1 : 1;
    return wholeNum + sign * (parseInt(numerator) / parseInt(denominator));
  }
  
  // Check if it's a simple fraction like "1/2"
  const simpleMatch = str.match(/^(-?)(\d+)\/(\d+)$/);
  if (simpleMatch) {
    const [, sign, numerator, denominator] = simpleMatch;
    const signMultiplier = sign === "-" ? -1 : 1;
    return signMultiplier * (parseInt(numerator) / parseInt(denominator));
  }
  
  // Regular number
  return parseFloat(str);
};

// Convert a decimal to a fraction string (simplified)
export const decimalToFraction = (decimal: number, precision = 0.000001): string => {
  if (Number.isInteger(decimal)) return decimal.toString();
  
  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);
  
  // If it's a whole number with fractional part
  const wholePart = Math.floor(absDecimal);
  const fractionalPart = absDecimal - wholePart;
  
  if (fractionalPart === 0) {
    return isNegative ? `-${wholePart}` : `${wholePart}`;
  }
  
  // Find the best fraction approximation using continued fractions
  let h1 = 1;
  let h2 = 0;
  let k1 = 0;
  let k2 = 1;
  let x = fractionalPart;
  
  // Continued fraction algorithm
  const epsilon = precision;
  while (true) {
    const a = Math.floor(x);
    const h = a * h1 + h2;
    const k = a * k1 + k2;
    
    h2 = h1;
    h1 = h;
    k2 = k1;
    k1 = k;
    
    const newX = 1 / (x - a);
    if (Math.abs(fractionalPart - h / k) < fractionalPart * epsilon) {
      break;
    }
    if (!isFinite(newX)) break;
    x = newX;
  }
  
  // Format the result
  const sign = isNegative ? "-" : "";
  
  if (wholePart === 0) {
    return `${sign}${h1}/${k1}`;
  } else {
    return `${sign}${wholePart} ${h1}/${k1}`;
  }
};

// Calculate result based on operation
export const calculateResult = (
  num1: number, 
  num2: number, 
  operation: string
): number => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "×":
      return num1 * num2;
    case "÷":
      if (num2 === 0) {
        throw new Error("Division by zero");
      }
      return num1 / num2;
    case "^":
      return Math.pow(num1, num2);
    case "mod":
      return num1 % num2;
    default:
      return num2;
  }
};

// Calculate for scientific operations
export const calculateScientific = (num: number, operation: string): number => {
  switch (operation) {
    case "sin":
      return Math.sin(num);
    case "cos":
      return Math.cos(num);
    case "tan":
      return Math.tan(num);
    case "asin":
      if (num < -1 || num > 1) throw new Error("Invalid input for arcsin");
      return Math.asin(num);
    case "acos":
      if (num < -1 || num > 1) throw new Error("Invalid input for arccos");
      return Math.acos(num);
    case "atan":
      return Math.atan(num);
    case "sinh":
      return Math.sinh(num);
    case "cosh":
      return Math.cosh(num);
    case "tanh":
      return Math.tanh(num);
    case "log":
      if (num <= 0) throw new Error("Invalid input for logarithm");
      return Math.log10(num);
    case "ln":
      if (num <= 0) throw new Error("Invalid input for natural logarithm");
      return Math.log(num);
    case "sqrt":
      if (num < 0) throw new Error("Cannot compute square root of negative number");
      return Math.sqrt(num);
    case "cbrt":
      return Math.cbrt(num);
    case "abs":
      return Math.abs(num);
    case "exp":
      return Math.exp(num);
    case "inv":
      if (num === 0) throw new Error("Cannot divide by zero");
      return 1 / num;
    case "!":
      return factorial(num);
    default:
      return num;
  }
};

// Factorial calculation
const factorial = (num: number): number => {
  // Only calculate for positive integers and reasonably sized numbers
  if (num < 0 || !Number.isInteger(num)) {
    throw new Error("Factorial only defined for positive integers");
  }
  if (num > 170) {
    throw new Error("Number too large for factorial");
  }
  
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

// Format numbers for display (handles large and small numbers)
export const formatNumber = (num: number): string => {
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  
  const rounded = parseFloat(num.toFixed(10)).toString();
  return rounded.endsWith('.0') ? rounded.slice(0, -2) : rounded;
};
