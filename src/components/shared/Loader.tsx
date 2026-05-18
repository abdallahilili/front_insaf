import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullPage?: boolean
}

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }

export default function Loader({ size = 'md', text, fullPage }: LoaderProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          {text && <p className="text-text-secondary font-medium">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className={`${sizes[size]} text-primary animate-spin`} />
      {text && <p className="text-text-secondary font-medium text-sm">{text}</p>}
    </div>
  )
}
