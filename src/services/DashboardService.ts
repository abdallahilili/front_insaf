import GeneralService from './GeneralService'
import {
  DashboardKPIs,
  Notification,
  RegistrationTrend,
  SmartAlert,
  WilayaActivity,
} from '../models/dashboard.model'
import { TopReferrer } from '../models/referral.model'

class DashboardService extends GeneralService {
  async getKPIs(): Promise<DashboardKPIs> {
    return this.getAll('/dashboard/kpis')
  }

  async getRegistrationTrend(days: number = 30): Promise<RegistrationTrend[]> {
    return this.getAll('/dashboard/trend', { days })
  }

  async getWilayaActivity(): Promise<WilayaActivity[]> {
    return this.getAll('/dashboard/wilaya-activity')
  }

  async getTopReferrers(limit: number = 10): Promise<TopReferrer[]> {
    return this.getAll('/dashboard/top-referrers', { limit })
  }

  async getSmartAlerts(): Promise<SmartAlert[]> {
    return this.getAll('/dashboard/alerts')
  }

  async markAlertRead(id: string): Promise<void> {
    return this.patch(`/dashboard/alerts/${id}/read`, {})
  }

  async getNotifications(): Promise<Notification[]> {
    return this.getAll('/notifications')
  }

  async markNotificationRead(id: string): Promise<void> {
    return this.patch(`/notifications/${id}/read`, {})
  }

  async markAllNotificationsRead(): Promise<void> {
    return this.patch('/notifications/mark-all-read', {})
  }
}

export default new DashboardService()
