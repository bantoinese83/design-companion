import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icons } from '@/lib/icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: cn(
          'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/25',
          'hover:scale-105 active:scale-95',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
        ),
        primary: cn(
          'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25',
          'hover:scale-105 active:scale-95 focus-visible:ring-indigo-500',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
        ),
        secondary: cn(
          'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200',
          'hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus-visible:ring-slate-500'
        ),
        ghost: cn(
          'hover:bg-slate-100 text-slate-700 hover:text-slate-900',
          'hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:ring-slate-500'
        ),
        destructive: cn(
          'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/25',
          'hover:scale-105 active:scale-95 focus-visible:ring-rose-500'
        ),
        glass: cn(
          'bg-white/10 backdrop-blur-md text-white border border-white/20',
          'hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:ring-white/50 shadow-lg'
        ),
      },
      size: {
        xs: 'h-8 px-3 text-xs gap-1.5',
        sm: 'h-9 px-4 text-sm gap-2',
        default: 'h-10 px-6 text-sm gap-2',
        lg: 'h-12 px-8 text-base gap-2.5',
        xl: 'h-14 px-10 text-lg gap-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, icon, children, ...props },
    ref
  ) => {
    const isDisabled = props.disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Icons.loader className="animate-spin flex-shrink-0" size={16} />}
        {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
        {children && <span className={loading ? 'opacity-70' : ''}>{children}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
