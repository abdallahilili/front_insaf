import { Menu, Bell, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useSidebar } from '../contexts/SidebarContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useAuth } from '../contexts/AuthContext'

export default function AppHeader() {
  const { toggle } = useSidebar()
  const { unreadCount } = useNotifications()
  const { user } = useAuth()

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-30">
      {/* Mobile menu */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 rounded-xl hover:bg-background text-text-secondary transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-background rounded-xl px-3 py-2 w-72 border border-border focus-within:border-primary/40 focus-within:bg-primary/5 transition-colors">
        <Search className="w-4 h-4 text-text-secondary" />
        <input
          placeholder="بحث..."
          className="bg-transparent outline-none text-sm flex-1 text-right text-text-primary placeholder:text-text-secondary"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <NavLink
          to="/notifications"
          className="relative p-2 rounded-xl hover:bg-background text-text-secondary hover:text-primary transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          )}
        </NavLink>

        <NavLink to="/profile" className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-background transition-colors">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
            {user?.full_name?.[0] || 'م'}
          </div>
        </NavLink>
      </div>
    </header>
  )
}
