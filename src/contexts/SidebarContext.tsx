import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  isOpen: boolean
  isCollapsed: boolean
  toggle: () => void
  close: () => void
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggle = () => setIsOpen((v) => !v)
  const close = () => setIsOpen(false)
  const toggleCollapse = () => setIsCollapsed((v) => !v)

  return (
    <SidebarContext.Provider value={{ isOpen, isCollapsed, toggle, close, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
