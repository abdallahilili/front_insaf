export interface DashboardKPIs {
  total_members: number
  today_registrations: number
  week_registrations: number
  month_registrations: number
  active_wilayas: number
  most_active_wilaya: string
  growth_rate: number
  total_referrals: number
}

export interface RegistrationTrend {
  date: string
  count: number
  cumulative: number
}

export interface WilayaActivity {
  wilaya: string
  code: string
  count: number
  percentage: number
  coordinates: [number, number]
}

export interface SmartAlert {
  id: string
  type: AlertType
  title: string
  description: string
  timestamp: string
  is_read: boolean
  related_id?: string
}

export type AlertType =
  | 'new_unit'
  | 'new_wilaya'
  | 'leader_detected'
  | 'goal_reached'
  | 'milestone'
  | 'anomaly'

export interface Notification {
  id: string
  title: string
  body: string
  type: string
  is_read: boolean
  created_at: string
}
