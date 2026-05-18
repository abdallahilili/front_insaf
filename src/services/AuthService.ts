import GeneralService from './GeneralService'
import { AuthResponse, LoginRequest, OTPVerifyRequest } from '../models/auth.model'

class AuthService extends GeneralService {
  private readonly BASE = '/auth'

  async sendOTP(data: LoginRequest): Promise<{ message: string }> {
    return this.save(`${this.BASE}/send-otp`, data)
  }

  async verifyOTP(data: OTPVerifyRequest): Promise<AuthResponse> {
    return this.save(`${this.BASE}/verify-otp`, data)
  }

  async logout(): Promise<void> {
    try {
      await this.save(`${this.BASE}/logout`, {})
    } catch {
      // ignore
    }
  }

  async getProfile(): Promise<AuthResponse['user']> {
    return this.getAll(`${this.BASE}/profile`)
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.save(`${this.BASE}/refresh`, { refresh_token: refreshToken })
  }
}

export default new AuthService()
