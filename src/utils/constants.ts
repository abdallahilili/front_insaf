export const WILAYAS = [
  'نواكشوط الغربية',
  'نواكشوط الشمالية',
  'نواكشوط الجنوبية',
  'الحوض الشرقي',
  'الحوض الغربي',
  'آسابا',
  'كوركول',
  'تگانت',
  'البراكنة',
  'الترارزة',
  'الداخلة',
  'إينشيري',
  'تيرس زمور',
  'لبراكنة',
  'الگبلة',
]

export const REFERRAL_THRESHOLDS = {
  bronze: 5,
  silver: 15,
  gold: 30,
  platinum: 60,
  diamond: 100,
}

export const UNIT_SIZE = 10
export const SECTION_SIZE = 10 // units per section
export const MOUGHATAA_SIZE = 5 // sections per moughataa

export const APP_NAME = 'وشائج'
export const APP_TAGLINE = 'نظام إدارة عضوية الحزب السياسي'

export const REFERRAL_BASE_URL = window.location.origin + '/join?ref='

export const STATUS_LABELS: Record<string, string> = {
  active: 'نشط',
  pending: 'قيد الانتظار',
  suspended: 'موقوف',
  inactive: 'غير نشط',
}

export const ROLE_LABELS: Record<string, string> = {
  admin: 'مدير عام',
  regional_manager: 'مدير جهوي',
  local_manager: 'مدير محلي',
  member: 'عضو',
}
