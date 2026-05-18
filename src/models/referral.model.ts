export interface Referral {
  id: string
  referrer_id: string
  referrer_name: string
  referred_id: string
  referred_name: string
  referred_phone: string
  created_at: string
  level: number
}

export interface ReferralStats {
  total_referrals: number
  direct_referrals: number
  indirect_referrals: number
  referral_code: string
  referral_link: string
  rank: number
}

export interface TopReferrer {
  id: string
  full_name: string
  referral_count: number
  wilaya: string
  rank: number
  avatar?: string
  badge?: ReferralBadge
}

export type ReferralBadge = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface ReferralTree {
  member: {
    id: string
    full_name: string
    referral_count: number
  }
  children: ReferralTree[]
}
