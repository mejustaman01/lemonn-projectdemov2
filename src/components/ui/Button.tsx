import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, leftIcon, rightIcon, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      secondary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-green-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus:ring-green-500',
      link: 'bg-transparent underline-offset-4 hover:underline focus:ring-green-500 p-0',
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm rounded',
      md: 'h-10 px-4 rounded-md',
      lg: 'h-12 px-6 rounded-md text-lg',
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;