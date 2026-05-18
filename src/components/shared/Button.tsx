import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-sm',
  secondary: 'bg-background border border-border text-text-primary hover:bg-primary/5 hover:border-primary/40',
  danger: 'bg-danger hover:bg-red-700 text-white shadow-sm',
  ghost: 'text-text-secondary hover:bg-background hover:text-primary',
  gold: 'gradient-gold text-white shadow-sm',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  children,
  fullWidth,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-semibold rounded-xl
        transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        <span>{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !isLoading && <span>{rightIcon}</span>}
    </button>
  )
}
