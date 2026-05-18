import { REFERRAL_THRESHOLDS } from './constants'
import { ReferralBadge } from '../models/referral.model'

export const getReferralBadge = (count: number): ReferralBadge | null => {
  if (count >= REFERRAL_THRESHOLDS.diamond) return 'diamond'
  if (count >= REFERRAL_THRESHOLDS.platinum) return 'platinum'
  if (count >= REFERRAL_THRESHOLDS.gold) return 'gold'
  if (count >= REFERRAL_THRESHOLDS.silver) return 'silver'
  if (count >= REFERRAL_THRESHOLDS.bronze) return 'bronze'
  return null
}

export const getBadgeLabel = (badge: ReferralBadge): string => {
  const labels: Record<ReferralBadge, string> = {
    bronze: 'برونزي',
    silver: 'فضي',
    gold: 'ذهبي',
    platinum: 'بلاتيني',
    diamond: 'ألماسي',
  }
  return labels[badge]
}

export const getBadgeColor = (badge: ReferralBadge): string => {
  const colors: Record<ReferralBadge, string> = {
    bronze: '#cd7f32',
    silver: '#a8a9ad',
    gold: '#d4af37',
    platinum: '#e5e4e2',
    diamond: '#b9f2ff',
  }
  return colors[badge]
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
}

export const downloadCSV = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const generateWhatsAppLink = (text: string): string => {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
