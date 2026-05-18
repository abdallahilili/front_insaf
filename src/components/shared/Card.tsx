import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
  noPadding?: boolean
}

export default function Card({ children, title, subtitle, action, className = '', noPadding }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-card ${noPadding ? '' : 'p-5'} ${className}`}>
      {(title || action) && (
        <div className={`flex items-center justify-between ${noPadding ? 'px-5 pt-5' : ''} mb-4`}>
          <div>
            {title && <h3 className="font-bold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
