import { motion } from 'framer-motion'
import { Bell, CheckCheck, Zap } from 'lucide-react'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import EmptyState from '../../components/shared/EmptyState'
import { useNotifications } from '../../contexts/NotificationContext'
import { MOCK_ALERTS } from '../../utils/mockData'
import { formatRelativeTime } from '../../utils/formatters'

const ALERT_ICONS: Record<string, string> = {
  new_unit: '🏛️',
  leader_detected: '⭐',
  milestone: '🎯',
  new_wilaya: '📍',
  goal_reached: '✅',
  anomaly: '⚠️',
}

export default function NotificationsPage() {
  const { markAllRead } = useNotifications()
  const alerts = MOCK_ALERTS
  const unread = alerts.filter((a) => !a.is_read).length

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-primary">الإشعارات</h1>
          <p className="text-text-secondary mt-0.5">
            {unread > 0 ? `${unread} إشعارات غير مقروءة` : 'كل الإشعارات مقروءة'}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="secondary" size="sm" leftIcon={<CheckCheck className="w-4 h-4" />} onClick={markAllRead}>
            تعليم الكل كمقروء
          </Button>
        )}
      </div>

      {alerts.length === 0 ? (
        <EmptyState title="لا توجد إشعارات" description="ستظهر هنا التنبيهات والإشعارات الجديدة" icon={<Bell className="w-8 h-8" />} />
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl shadow-card p-4 flex gap-4 ${!alert.is_read ? 'border-r-4 border-primary' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${!alert.is_read ? 'bg-primary/10' : 'bg-background'}`}>
                {ALERT_ICONS[alert.type] || <Zap className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-primary">{alert.title}</h3>
                    {!alert.is_read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <span className="text-xs text-text-secondary flex-shrink-0">{formatRelativeTime(alert.timestamp)}</span>
                </div>
                <p className="text-text-secondary text-sm mt-1 leading-relaxed">{alert.description}</p>
                <div className="mt-2">
                  <Badge variant={alert.is_read ? 'neutral' : 'primary'}>
                    {alert.type === 'new_unit' ? 'وحدة جديدة' :
                     alert.type === 'leader_detected' ? 'قائد محتمل' :
                     alert.type === 'milestone' ? 'هدف محقق' :
                     alert.type === 'new_wilaya' ? 'ولاية جديدة' : 'تنبيه'}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
