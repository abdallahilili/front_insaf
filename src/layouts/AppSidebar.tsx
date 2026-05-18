import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Building2,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Network,
} from 'lucide-react'
import { useSidebar } from '../contexts/SidebarContext'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { ROLE_LABELS } from '../utils/constants'
import { getInitials } from '../utils/helpers'
import AuthService from '../services/AuthService'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
  { path: '/members', label: 'الأعضاء', icon: Users },
  { path: '/referrals', label: 'التزكيات', icon: GitBranch },
  { path: '/organization', label: 'الهيكل التنظيمي', icon: Building2 },
  { path: '/analytics', label: 'الإحصائيات', icon: BarChart3 },
  { path: '/notifications', label: 'الإشعارات', icon: Bell, badge: true },
  { path: '/settings', label: 'الإعدادات', icon: Settings },
]

export default function AppSidebar() {
  const { isOpen, isCollapsed, close, toggleCollapse } = useSidebar()
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await AuthService.logout()
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`
        fixed top-0 right-0 h-full z-40 bg-white border-l border-border
        flex flex-col transition-all duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-[72px]' : 'w-[260px]'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Network className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-primary text-lg leading-none">وشائج</div>
              <div className="text-[10px] text-text-secondary leading-none mt-0.5">إدارة العضوية</div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <Network className="w-4 h-4 text-white" />
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-background text-text-secondary hover:text-primary transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={close}
          className="lg:hidden p-1.5 rounded-lg hover:bg-background text-text-secondary"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative
                ${isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="font-medium text-sm">{label}</span>
                  {badge && unreadCount > 0 && (
                    <span className="mr-auto bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && badge && unreadCount > 0 && (
                <span className="absolute top-1 left-1 w-2 h-2 bg-danger rounded-full" />
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-border p-3 flex-shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 mb-2">
            <NavLink to="/profile" onClick={close}>
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user?.full_name ? getInitials(user.full_name) : 'م'}
              </div>
            </NavLink>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-text-primary text-sm truncate">
                {user?.full_name || 'مستخدم'}
              </div>
              <div className="text-xs text-text-secondary">
                {user?.role ? ROLE_LABELS[user.role] : 'عضو'}
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/profile" onClick={close}>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
              {user?.full_name ? getInitials(user.full_name) : 'م'}
            </div>
          </NavLink>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-danger hover:bg-danger/5 transition-colors text-sm font-medium
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  )
}
