import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: number
  trendLabel?: string
  color?: 'primary' | 'gold' | 'success' | 'danger'
  isLoading?: boolean
}

const colorMap = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' },
  gold: { bg: 'bg-gold/10', text: 'text-gold', icon: 'text-gold' },
  success: { bg: 'bg-success/10', text: 'text-success', icon: 'text-success' },
  danger: { bg: 'bg-danger/10', text: 'text-danger', icon: 'text-danger' },
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendLabel,
  color = 'primary',
  isLoading,
}: StatCardProps) {
  const colors = colorMap[color]

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <div className="flex items-start justify-between mb-4">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton w-10 h-10 rounded-xl" />
        </div>
        <div className="skeleton h-8 w-32 rounded mb-2" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card card-hover">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center ${colors.icon}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-text-primary mb-1">{value}</div>
      {(trend !== undefined || subtitle) && (
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
              {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend >= 0 ? '+' : ''}{trend}%</span>
            </div>
          )}
          {trendLabel && <span className="text-xs text-text-secondary">{trendLabel}</span>}
          {subtitle && !trendLabel && <span className="text-xs text-text-secondary">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
