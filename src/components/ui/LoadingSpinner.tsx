import React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/lib/icons';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variants = {
    default: 'text-slate-600',
    primary: 'text-blue-600',
    secondary: 'text-slate-400',
  };

  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <Icons.loader className={cn('animate-spin', sizes[size], variants[variant])} />
    </div>
  );
};

// Specialized loading components
const PageLoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
    <LoadingSpinner size="xl" variant="primary" />
    <p className="text-sm text-slate-600 font-medium">Loading...</p>
  </div>
);

const InlineLoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex items-center gap-3 py-4">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-slate-600">{message}</span>
  </div>
);

const ButtonLoadingSpinner: React.FC = () => <LoadingSpinner size="sm" className="mr-2" />;

export { LoadingSpinner, PageLoadingSpinner, InlineLoadingSpinner, ButtonLoadingSpinner };
