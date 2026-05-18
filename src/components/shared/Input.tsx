import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, hint, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-text-primary">
            {label}
            {props.required && <span className="text-danger mr-1">*</span>}
          </label>
        )}
        <div className="relative">
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full h-11 rounded-xl border bg-white text-text-primary text-sm
              placeholder:text-text-secondary transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
              disabled:opacity-50 disabled:bg-background
              ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${className}
            `}
            {...props}
          />
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-text-secondary">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
