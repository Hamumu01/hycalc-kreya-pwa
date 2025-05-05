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

  // Get gradient classes based on variant
  const getGradientClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-kreya-blue via-blue-500 to-kreya-darkBlue';
      case 'secondary':
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900';
      case 'accent':
        return 'bg-gradient-to-br from-purple-500 via-purple-400 to-pink-500';
      default:
        return 'bg-gradient-to-br from-kreya-blue via-blue-500 to-kreya-darkBlue';
    }
  };

  const variantClass = `calc-button-${variant}`;
  const wideClass = wide ? 'calc-button-wide' : '';
  const hoverClass = isHovered ? 'button-3d pulse' : '';
  const pressedClass = isPressed ? 'scale-95' : '';
  const gradientClass = getGradientClass();

  return (
    <button
      className={cn(
        'calc-button',
        variantClass, 
        wideClass, 
        hoverClass, 
        pressedClass,
        gradientClass, // Apply gradient class
        'transform transition-all duration-150 backdrop-blur-sm overflow-hidden',
        'relative z-0 font-medium',
        variant === 'primary' || variant === 'accent' ? 'text-white' : '',
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
        'bg-gradient-to-b from-white/20 via-transparent to-black/10',
        'opacity-0',
        isHovered ? 'opacity-100' : ''
      )} />
      
      {/* Border glow effect on hover */}
      {isHovered && (variant === 'primary' || variant === 'accent') && (
        <span className={cn(
          "absolute inset-0 w-full h-full blur-md rounded-xl",
          variant === 'primary' ? 'bg-kreya-blue/30' : 'bg-purple-500/30'
        )} />
      )}
      
      {/* Shine line effect */}
    </button>
  );
};

export default Button;
