import { getInitials } from '../../utils/helpers'

interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
}

export default function Avatar({ name, src, size = 'md' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-xl object-cover flex-shrink-0`}
      />
    )
  }
  return (
    <div className={`${sizes[size]} rounded-xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {getInitials(name)}
    </div>
  )
}
