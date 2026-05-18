import { useSidebar } from '../contexts/SidebarContext'

export default function Backdrop() {
  const { isOpen, close } = useSidebar()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
      onClick={close}
    />
  )
}
