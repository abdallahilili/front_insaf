import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-text-primary">
            {label}
            {props.required && <span className="text-danger mr-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full h-11 rounded-xl border bg-white text-text-primary text-sm
              appearance-none pr-4 pl-10 transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
              disabled:opacity-50 disabled:bg-background
              ${error ? 'border-danger' : 'border-border'}
              ${className}
            `}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
