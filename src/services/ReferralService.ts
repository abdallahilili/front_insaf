import GeneralService from './GeneralService'
import { ReferralStats, ReferralTree, TopReferrer } from '../models/referral.model'

class ReferralService extends GeneralService {
  async getMyStats(): Promise<ReferralStats> {
    return this.getAll('/referrals/my-stats')
  }

  async getMyTree(): Promise<ReferralTree> {
    return this.getAll('/referrals/my-tree')
  }

  async getTopReferrers(): Promise<TopReferrer[]> {
    return this.getAll('/referrals/leaderboard')
  }

  async validateCode(code: string): Promise<{ valid: boolean; member_name?: string }> {
    return this.getAll('/referrals/validate', { code })
  }
}

export default new ReferralService()
