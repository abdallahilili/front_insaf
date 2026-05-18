import GeneralService from './GeneralService'
import { Member, MemberFilters, MemberRegistration, MembersResponse } from '../models/member.model'

class MemberService extends GeneralService {
  private readonly BASE = '/members'

  async getMembers(filters?: MemberFilters): Promise<MembersResponse> {
    return this.getAll(this.BASE, filters as Record<string, unknown>)
  }

  async getMember(id: string): Promise<Member> {
    return this.getById(this.BASE, id)
  }

  async registerMember(data: MemberRegistration): Promise<Member> {
    return this.save(`${this.BASE}/register`, data)
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    return this.update(`${this.BASE}/${id}`, data)
  }

  async suspendMember(id: string): Promise<Member> {
    return this.patch(`${this.BASE}/${id}/suspend`, {})
  }

  async activateMember(id: string): Promise<Member> {
    return this.patch(`${this.BASE}/${id}/activate`, {})
  }

  async exportCSV(filters?: MemberFilters): Promise<Blob> {
    const response = await this.api.get(`${this.BASE}/export`, {
      params: filters,
      responseType: 'blob',
    })
    return response.data
  }

  async getReferralStats(memberId: string) {
    return this.getAll(`${this.BASE}/${memberId}/referral-stats`)
  }
}

export default new MemberService()
