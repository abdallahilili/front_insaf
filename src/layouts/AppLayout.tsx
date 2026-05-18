import { Outlet } from 'react-router-dom'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import Backdrop from './Backdrop'
import { useSidebar } from '../contexts/SidebarContext'

export default function AppLayout() {
  const { isOpen, isCollapsed } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AppSidebar />

      {/* Mobile backdrop */}
      <Backdrop />

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'lg:mr-[72px]' : 'lg:mr-[260px]'
        }`}
      >
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-slide-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
