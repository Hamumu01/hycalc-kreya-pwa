
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [isPressed, setIsPressed] = useState(false);

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
    
    // Add pressed state briefly
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
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
  const pressedClass = isPressed ? 'scale-95' : '';

  return (
    <button
      className={cn(
        'calc-button',
        variantClass, 
        wideClass, 
        hoverClass, 
        pressedClass,
        'transform transition-all duration-150 backdrop-blur-sm overflow-hidden',
        'relative z-0 font-medium',
        variant === 'primary' ? 'text-white' : '',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple absolute block bg-white/30 rounded-full scale-0 animate-ripple"
          style={{
            left: ripple.left,
            top: ripple.top,
          }}
        />
      ))}
      
      {/* Inner shadow effect */}
      <span className={cn(
        'absolute inset-0 w-full h-full rounded-xl transition-opacity duration-200',
        'bg-gradient-to-b from-white/10 via-transparent to-black/5',
        'opacity-0',
        isHovered ? 'opacity-100' : ''
      )} />
      
      {/* Border glow effect on hover for primary buttons */}
      {isHovered && variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-kreya-blue/20 blur-md rounded-xl" />
      )}
      
      {/* Shine line effect */}
      <span className={cn(
        'absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent',
        'opacity-0 top-[10%] transition-opacity duration-300',
        isHovered ? 'opacity-100' : ''
      )} />
    </button>
  );
};

export default Button;
