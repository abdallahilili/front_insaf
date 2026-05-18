import { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({
  title = 'لا توجد بيانات',
  description = 'لم يتم العثور على أي نتائج',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="font-bold text-text-primary text-lg mb-1">{title}</h3>
      <p className="text-text-secondary text-sm max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
