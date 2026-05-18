import GeneralService from './GeneralService'
import { OrganizationStats, Wilaya } from '../models/organization.model'

class OrganizationService extends GeneralService {
  async getWilayas(): Promise<Wilaya[]> {
    return this.getAll('/organization/wilayas')
  }

  async getWilaya(id: string): Promise<Wilaya> {
    return this.getById('/organization/wilayas', id)
  }

  async getStats(): Promise<OrganizationStats> {
    return this.getAll('/organization/stats')
  }
}

export default new OrganizationService()
