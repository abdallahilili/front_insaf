export interface Member {
  id: string
  full_name: string
  nni: string
  phone: string
  birth_date: string
  birth_place: string
  wilaya: string
  moughataa?: string
  address?: string
  referral_code: string
  referred_by?: string
  referrer_name?: string
  referral_count: number
  status: MemberStatus
  created_at: string
  updated_at: string
  avatar?: string
  unit_id?: string
  section_id?: string
}

export type MemberStatus = 'active' | 'pending' | 'suspended' | 'inactive'

export interface MemberRegistration {
  phone: string
  otp: string
  full_name: string
  nni: string
  birth_date: string
  birth_place: string
  wilaya: string
  moughataa?: string
  referral_code?: string
}

export interface MembersResponse {
  data: Member[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface MemberFilters {
  search?: string
  wilaya?: string
  status?: MemberStatus
  page?: number
  per_page?: number
}
