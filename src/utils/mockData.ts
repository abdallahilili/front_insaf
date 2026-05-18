import { DashboardKPIs, RegistrationTrend, WilayaActivity, SmartAlert } from '../models/dashboard.model'
import { TopReferrer } from '../models/referral.model'

export const MOCK_KPIS: DashboardKPIs = {
  total_members: 48320,
  today_registrations: 143,
  week_registrations: 891,
  month_registrations: 3420,
  active_wilayas: 13,
  most_active_wilaya: 'نواكشوط الغربية',
  growth_rate: 12.4,
  total_referrals: 28950,
}

export const MOCK_TREND: RegistrationTrend[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const count = Math.floor(Math.random() * 180) + 40
  return {
    date: date.toISOString().split('T')[0],
    count,
    cumulative: 45000 + i * 150 + count,
  }
})

export const MOCK_WILAYA_ACTIVITY: WilayaActivity[] = [
  { wilaya: 'نواكشوط الغربية', code: 'NWG', count: 8420, percentage: 17.4, coordinates: [18.09, -15.98] },
  { wilaya: 'نواكشوط الشمالية', code: 'NWN', count: 6230, percentage: 12.9, coordinates: [18.12, -15.96] },
  { wilaya: 'نواكشوط الجنوبية', code: 'NWS', count: 5890, percentage: 12.2, coordinates: [18.06, -15.97] },
  { wilaya: 'الترارزة', code: 'TR', count: 4210, percentage: 8.7, coordinates: [18.0, -15.5] },
  { wilaya: 'الحوض الغربي', code: 'HG', count: 3980, percentage: 8.2, coordinates: [16.5, -10.5] },
  { wilaya: 'البراكنة', code: 'BR', count: 3540, percentage: 7.3, coordinates: [17.5, -14.5] },
  { wilaya: 'الگبلة', code: 'GB', count: 3120, percentage: 6.5, coordinates: [16.0, -12.0] },
  { wilaya: 'كوركول', code: 'KO', count: 2870, percentage: 5.9, coordinates: [17.0, -12.5] },
  { wilaya: 'الحوض الشرقي', code: 'HE', count: 2650, percentage: 5.5, coordinates: [16.0, -10.0] },
  { wilaya: 'آسابا', code: 'AS', count: 2340, percentage: 4.8, coordinates: [17.5, -12.0] },
  { wilaya: 'تگانت', code: 'TG', count: 1980, percentage: 4.1, coordinates: [18.5, -11.0] },
  { wilaya: 'الداخلة', code: 'DA', count: 1450, percentage: 3.0, coordinates: [23.0, -15.5] },
  { wilaya: 'تيرس زمور', code: 'TZ', count: 640, percentage: 1.3, coordinates: [23.5, -12.0] },
]

export const MOCK_TOP_REFERRERS: TopReferrer[] = [
  { id: '1', full_name: 'محمد ولد أحمد', referral_count: 245, wilaya: 'نواكشوط الغربية', rank: 1, badge: 'diamond' },
  { id: '2', full_name: 'إبراهيم ولد محمد', referral_count: 198, wilaya: 'الترارزة', rank: 2, badge: 'diamond' },
  { id: '3', full_name: 'عبد الرحمن ولد سيدي', referral_count: 167, wilaya: 'نواكشوط الشمالية', rank: 3, badge: 'platinum' },
  { id: '4', full_name: 'ميم ولد أعمر', referral_count: 134, wilaya: 'البراكنة', rank: 4, badge: 'platinum' },
  { id: '5', full_name: 'أحمدو ولد محمد الأمين', referral_count: 112, wilaya: 'الحوض الغربي', rank: 5, badge: 'gold' },
]

export const MOCK_ALERTS: SmartAlert[] = [
  { id: '1', type: 'new_unit', title: 'وحدة جديدة مكتملة', description: 'اكتملت وحدة رقم 47 في مقاطعة دار النعيم', timestamp: new Date(Date.now() - 3600000).toISOString(), is_read: false },
  { id: '2', type: 'leader_detected', title: 'قائد محتمل', description: 'محمد ولد إبراهيم سجّل 15 عضواً جديداً في أسبوع', timestamp: new Date(Date.now() - 7200000).toISOString(), is_read: false },
  { id: '3', type: 'milestone', title: 'هدف محقق', description: 'تجاوزنا 10,000 عضو في نواكشوط الغربية', timestamp: new Date(Date.now() - 14400000).toISOString(), is_read: true },
  { id: '4', type: 'new_wilaya', title: 'ولاية جديدة مفعّلة', description: 'تيرس زمور تسجل أول 100 عضو لتصبح مفعّلة', timestamp: new Date(Date.now() - 86400000).toISOString(), is_read: true },
]
