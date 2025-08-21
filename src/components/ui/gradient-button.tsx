import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const variantClasses = {
      primary: 'btn-gradient-outline hover:scale-105 active:scale-95',
      secondary: 'border border-gray-600 hover:border-gradient-purple/50 bg-surface-elevated hover:bg-surface-muted',
      ghost: 'hover:bg-surface-elevated'
    };

    if (variant === 'primary') {
      return (
        <button
          ref={ref}
          className={cn(
            'btn-gradient-outline transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          disabled={loading || props.disabled}
          {...props}
        >
          <div className={cn(
            'btn-content flex items-center justify-center gap-2 font-semibold text-text-primary',
            sizeClasses[size]
          )}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
          </div>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          'transition-all duration-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </div>
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';