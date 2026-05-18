import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'gold' | 'neutral'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  gold: 'bg-gold/10 text-gold',
  neutral: 'bg-background text-text-secondary border border-border',
}

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
}

export default function Badge({ children, variant = 'primary', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
