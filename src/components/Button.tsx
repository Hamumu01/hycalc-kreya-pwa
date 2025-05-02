
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
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const variantClass = `calc-button-${variant}`;
  const wideClass = wide ? 'calc-button-wide' : '';
  const hoverClass = isHovered ? 'button-3d pulse' : '';

  return (
    <button
      className={`calc-button ${variantClass} ${wideClass} ${hoverClass} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
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
      
      {/* Glow effect on hover */}
      {isHovered && variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-kreya-blue/20 blur-md rounded-xl" />
      )}
    </button>
  );
};

export default Button;
