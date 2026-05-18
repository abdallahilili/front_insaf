import { InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  value: string
}

export default function SearchInput({ onClear, value, className = '', ...props }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
      <input
        value={value}
        className="w-full h-10 pl-9 pr-10 rounded-xl border border-border bg-white text-sm text-text-primary
          placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
          transition-all duration-150"
        {...props}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-danger transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
