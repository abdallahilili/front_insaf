import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import Card from '../../components/shared/Card'
import { MOCK_TREND, MOCK_WILAYA_ACTIVITY } from '../../utils/mockData'
import { formatDateShort, formatNumber } from '../../utils/formatters'

const COLORS = ['#224d92', '#d4af37', '#16a34a', '#dc2626', '#7c3aed', '#0891b2', '#ea580c']

const trendData = MOCK_TREND.map((d) => ({
  date: formatDateShort(d.date).slice(0, 5),
  تسجيل: d.count,
  تراكمي: Math.floor(d.cumulative / 100),
}))

const pieData = MOCK_WILAYA_ACTIVITY.slice(0, 6).map((w) => ({
  name: w.wilaya.split(' ').pop() || w.wilaya,
  value: w.count,
}))

const weekData = [
  { day: 'الأحد', count: 89 },
  { day: 'الاثنين', count: 134 },
  { day: 'الثلاثاء', count: 167 },
  { day: 'الأربعاء', count: 142 },
  { day: 'الخميس', count: 198 },
  { day: 'الجمعة', count: 76 },
  { day: 'السبت', count: 54 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-primary">الإحصائيات والتحليلات</h1>
        <p className="text-text-secondary mt-0.5">رؤية تفصيلية لأداء الحزب وتوسعه</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'متوسط التسجيل اليومي', value: '143', sub: 'عضو/يوم' },
          { label: 'معدل النمو الشهري', value: '+12.4%', sub: 'مقارنة بالشهر الماضي' },
          { label: 'أعلى يوم تسجيل', value: '312', sub: 'عضو في يوم واحد' },
          { label: 'نسبة التزكية', value: '59%', sub: 'أعضاء جاؤوا بتزكية' },
        ].map(({ label, value, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl shadow-card p-5"
          >
            <div className="text-2xl font-black text-primary mb-1">{value}</div>
            <div className="font-semibold text-text-primary text-sm">{label}</div>
            <div className="text-xs text-text-secondary mt-0.5">{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card title="منحنى التسجيل — آخر 30 يوم">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#224d92" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#224d92" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'Cairo' }} interval={4} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="تسجيل" stroke="#224d92" strokeWidth={2.5} fill="url(#c1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <Card title="توزيع حسب الولاية">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', fontSize: '12px' }} formatter={(v) => formatNumber(v as number)} />
                  <Legend
                    formatter={(v) => <span style={{ fontFamily: 'Cairo', fontSize: '11px' }}>{v}</span>}
                    iconSize={8}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
          <Card title="توزيع التسجيلات حسب يوم الأسبوع">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="count" name="تسجيل" fill="#224d92" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
          <Card title="أنشط الولايات — مقارنة تفصيلية">
            <div className="space-y-3">
              {MOCK_WILAYA_ACTIVITY.slice(0, 6).map((w, i) => (
                <div key={w.wilaya} className="flex items-center gap-3">
                  <div className="w-5 text-xs text-text-secondary text-left flex-shrink-0">{i + 1}</div>
                  <div className="font-medium text-sm text-text-primary w-32 flex-shrink-0 truncate">{w.wilaya}</div>
                  <div className="flex-1 bg-background rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${w.percentage}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                  <div className="text-xs font-bold text-text-primary w-16 text-left">{formatNumber(w.count)}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
