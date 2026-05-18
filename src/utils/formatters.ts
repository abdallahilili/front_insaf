export const formatNumber = (n: number): string => {
  return new Intl.NumberFormat('ar-MR').format(n)
}

export const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('ar-MR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export const formatDateShort = (dateStr: string): string => {
  return new Intl.DateTimeFormat('ar-MR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateStr))
}

export const formatRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'الآن'
  if (minutes < 60) return `منذ ${minutes} دقيقة`
  if (hours < 24) return `منذ ${hours} ساعة`
  if (days < 7) return `منذ ${days} يوم`
  return formatDateShort(dateStr)
}

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')
}

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}
