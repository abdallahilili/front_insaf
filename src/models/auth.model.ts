export interface LoginRequest {
  phone: string
}

export interface OTPVerifyRequest {
  phone: string
  otp: string
}

export interface AuthResponse {
  access_token: string
  refresh_token?: string
  user: User
}

export interface User {
  id: string
  phone: string
  full_name: string
  role: UserRole
  wilaya?: string
  avatar?: string
  member_id?: string
  referral_code?: string
  created_at: string
}

export type UserRole = 'admin' | 'regional_manager' | 'local_manager' | 'member'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
