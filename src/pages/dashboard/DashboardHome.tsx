import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserPlus, TrendingUp, MapPin, GitBranch,
  Building2, Bell, Trophy, Zap
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import StatCard from '../../components/shared/StatCard'
import Card from '../../components/shared/Card'
import Badge from '../../components/shared/Badge'
import Avatar from '../../components/shared/Avatar'
import { formatNumber, formatRelativeTime, formatDateShort } from '../../utils/formatters'
import { getBadgeColor, getBadgeLabel } from '../../utils/helpers'
import {
  MOCK_KPIS, MOCK_TREND, MOCK_TOP_REFERRERS,
  MOCK_ALERTS, MOCK_WILAYA_ACTIVITY
} from '../../utils/mockData'
import { DashboardKPIs, SmartAlert } from '../../models/dashboard.model'
import { TopReferrer } from '../../models/referral.model'

const ALERT_ICONS: Record<string, string> = {
  new_unit: '🏛️',
  leader_detected: '⭐',
  milestone: '🎯',
  new_wilaya: '📍',
  goal_reached: '✅',
  anomaly: '⚠️',
}

export default function DashboardHome() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null)
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([])
  const [alerts, setAlerts] = useState<SmartAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 800))
      setKpis(MOCK_KPIS)
      setTopReferrers(MOCK_TOP_REFERRERS)
      setAlerts(MOCK_ALERTS)
      setIsLoading(false)
    }
    load()
  }, [])

  const trendData = MOCK_TREND.slice(-14).map((d) => ({
    date: formatDateShort(d.date).slice(0, 5),
    تسجيل: d.count,
  }))

  const wilayaData = MOCK_WILAYA_ACTIVITY.slice(0, 7).map((w) => ({
    name: w.wilaya.split(' ').pop() || w.wilaya,
    أعضاء: w.count,
  }))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-text-primary">لوحة القيادة</h1>
        <p className="text-text-secondary mt-1">نظرة عامة على حالة الحزب</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatCard
            title="إجمالي الأعضاء"
            value={isLoading ? '...' : formatNumber(kpis?.total_members ?? 0)}
            icon={<Users className="w-5 h-5" />}
            trend={kpis?.growth_rate}
            trendLabel="هذا الشهر"
            color="primary"
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <StatCard
            title="تسجيلات اليوم"
            value={isLoading ? '...' : formatNumber(kpis?.today_registrations ?? 0)}
            icon={<UserPlus className="w-5 h-5" />}
            subtitle="عضو جديد اليوم"
            color="success"
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <StatCard
            title="تسجيلات الأسبوع"
            value={isLoading ? '...' : formatNumber(kpis?.week_registrations ?? 0)}
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="آخر 7 أيام"
            color="gold"
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <StatCard
            title="الولايات المفعّلة"
            value={isLoading ? '...' : `${kpis?.active_wilayas ?? 0}/13`}
            icon={<MapPin className="w-5 h-5" />}
            subtitle={kpis?.most_active_wilaya}
            color="primary"
            isLoading={isLoading}
          />
        </motion.div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card title="منحنى التسجيلات" subtitle="آخر 14 يوم">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#224d92" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#224d92" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Cairo' }} />
                  <Tooltip
                    contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    labelStyle={{ fontWeight: 700 }}
                  />
                  <Area type="monotone" dataKey="تسجيل" stroke="#224d92" strokeWidth={2.5} fill="url(#colorReg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Wilaya activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <Card title="أنشط الولايات">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wilayaData} layout="vertical" margin={{ top: 0, right: 4, bottom: 0, left: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'Cairo' }} width={45} />
                  <Tooltip
                    contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Bar dataKey="أعضاء" fill="#224d92" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top referrers */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
          <Card
            title="أبرز المزكّين"
            subtitle="الأعضاء الأكثر تأثيراً"
            action={<Trophy className="w-5 h-5 text-gold" />}
          >
            <div className="space-y-3">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="skeleton w-7 h-7 rounded-full" />
                      <div className="skeleton w-9 h-9 rounded-xl" />
                      <div className="flex-1 space-y-1.5">
                        <div className="skeleton h-3 w-32 rounded" />
                        <div className="skeleton h-2.5 w-20 rounded" />
                      </div>
                      <div className="skeleton h-6 w-16 rounded-full" />
                    </div>
                  ))
                : topReferrers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-background transition-colors">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 ${
                        member.rank === 1 ? 'bg-gold' : member.rank === 2 ? 'bg-gray-400' : member.rank === 3 ? 'bg-amber-600' : 'bg-border text-text-secondary'
                      }`}>
                        {member.rank}
                      </div>
                      <Avatar name={member.full_name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-text-primary text-sm truncate">{member.full_name}</div>
                        <div className="text-xs text-text-secondary">{member.wilaya}</div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <GitBranch className="w-3.5 h-3.5 text-text-secondary" />
                        <span className="font-bold text-text-primary text-sm">{member.referral_count}</span>
                        {member.badge && (
                          <span
                            className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: getBadgeColor(member.badge) + '22', color: getBadgeColor(member.badge) }}
                          >
                            {getBadgeLabel(member.badge)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </Card>
        </motion.div>

        {/* Smart alerts */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card
            title="التنبيهات الذكية"
            subtitle="آخر الأحداث المهمة"
            action={<Bell className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-3">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="skeleton w-9 h-9 rounded-xl" />
                      <div className="flex-1 space-y-1.5">
                        <div className="skeleton h-3 w-40 rounded" />
                        <div className="skeleton h-2.5 w-56 rounded" />
                      </div>
                    </div>
                  ))
                : alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex gap-3 p-2 rounded-xl transition-colors ${!alert.is_read ? 'bg-primary/5' : 'hover:bg-background'}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${!alert.is_read ? 'bg-primary/10' : 'bg-background'}`}>
                        {ALERT_ICONS[alert.type] || <Zap className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary text-sm">{alert.title}</span>
                          {!alert.is_read && <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{alert.description}</p>
                        <p className="text-xs text-text-secondary/60 mt-1">{formatRelativeTime(alert.timestamp)}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Organization summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}>
        <Card title="الهيكل التنظيمي" subtitle="حالة البناء التنظيمي الوطني">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'ولايات مفعّلة', value: '13/13', icon: MapPin, color: 'text-primary' },
              { label: 'وحدات مكتملة', value: '284', icon: Building2, color: 'text-success' },
              { label: 'أقسام نشطة', value: '67', icon: Building2, color: 'text-gold' },
              { label: 'نسبة الاكتمال', value: '73%', icon: TrendingUp, color: 'text-primary' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-background rounded-xl p-4 text-center">
                <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                <div className="text-2xl font-black text-text-primary">{value}</div>
                <div className="text-xs text-text-secondary mt-1">{label}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
