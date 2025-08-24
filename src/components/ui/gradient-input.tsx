import React from 'react';
import { cn } from '@/lib/utils';
interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const GradientInput = React.forwardRef<HTMLInputElement, GradientInputProps>(({
  className,
  label,
  error,
  ...props
}, ref) => {
  return <div className="space-y-2">
        {label && <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>}
        <div className="input-gradient px-0 mx-0">
          <input ref={ref} className={cn('input-gradient-content w-full', error && 'border-gaming-error', className)} {...props} />
        </div>
        {error && <p className="text-sm text-gaming-error animate-fade-in">
            {error}
          </p>}
      </div>;
});
GradientInput.displayName = 'GradientInput';