import { createContext, useContext, useState, ReactNode } from 'react'
import { Notification } from '../models/dashboard.model'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  setNotifications: (n: Notification[]) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, setNotifications, markRead, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
