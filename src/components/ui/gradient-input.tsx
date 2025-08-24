import React from 'react';
import { cn } from '@/lib/utils';

interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

interface GradientTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline: true;
}

type Props = GradientInputProps | GradientTextareaProps;

export const GradientInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(({
  className,
  label,
  error,
  multiline,
  ...props
}, ref) => {
  return <div className="space-y-2">
        {label && <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>}
        <div className="input-gradient px-0 mx-0">
          {multiline ? (
            <textarea 
              ref={ref as React.Ref<HTMLTextAreaElement>} 
              className={cn('input-gradient-content w-full resize-none', error && 'border-gaming-error', className)} 
              rows={(props as GradientTextareaProps).rows || 3}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} 
            />
          ) : (
            <input 
              ref={ref as React.Ref<HTMLInputElement>} 
              className={cn('input-gradient-content w-full', error && 'border-gaming-error', className)} 
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)} 
            />
          )}
        </div>
        {error && <p className="text-sm text-gaming-error animate-fade-in">
            {error}
          </p>}
      </div>;
});
GradientInput.displayName = 'GradientInput';