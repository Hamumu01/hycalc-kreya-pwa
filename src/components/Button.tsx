
import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  wide?: boolean;
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'secondary',
  wide = false,
  children,
  className = '',
  onClick,
  ...props 
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; left: number; top: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    
    // Add new ripple
    const id = Date.now();
    setRipples((prev) => [...prev, { id, left, top }]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
    
    // Call original onClick handler if provided
    if (onClick) onClick(e);
  };

  const variantClass = `calc-button-${variant}`;
  const wideClass = wide ? 'calc-button-wide' : '';

  return (
    <button
      className={`calc-button ${variantClass} ${wideClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.left,
            top: ripple.top,
          }}
        />
      ))}
    </button>
  );
};

export default Button;
