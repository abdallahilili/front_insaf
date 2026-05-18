import { useState } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Share2, Trophy, GitBranch, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '../../components/shared/Card'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import Avatar from '../../components/shared/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import { REFERRAL_BASE_URL } from '../../utils/constants'
import { copyToClipboard, generateWhatsAppLink, getBadgeColor, getBadgeLabel } from '../../utils/helpers'
import { MOCK_TOP_REFERRERS } from '../../utils/mockData'

export default function ReferralsPage() {
  const { user } = useAuth()
  const referralCode = user?.referral_code || 'REF0001'
  const referralLink = REFERRAL_BASE_URL + referralCode

  const handleCopy = async () => {
    await copyToClipboard(referralLink)
    toast.success('تم نسخ الرابط')
  }

  const MY_STATS = { total: 45, direct: 32, indirect: 13, rank: 12 }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-primary">نظام التزكيات</h1>
        <p className="text-text-secondary mt-0.5">تابع شبكة تزكياتك وأثّر في توسع الحزب</p>
      </div>

      {/* My referral card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <Card title="رابط تزكيتي" subtitle="شارك هذا الرابط لإضافة أعضاء جدد">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-background rounded-2xl p-4 flex-shrink-0">
                <QRCodeSVG value={referralLink} size={140} level="H" />
                <p className="text-center text-xs text-text-secondary mt-2 font-mono">{referralCode}</p>
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'إجمالي التزكيات', value: MY_STATS.total, icon: GitBranch, color: 'text-primary' },
                    { label: 'تزكيات مباشرة', value: MY_STATS.direct, icon: Users, color: 'text-success' },
                    { label: 'الترتيب الوطني', value: `#${MY_STATS.rank}`, icon: Trophy, color: 'text-gold' },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-background rounded-xl p-3 text-center">
                      <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                      <div className={`text-xl font-black ${color}`}>{value}</div>
                      <div className="text-xs text-text-secondary mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-background rounded-xl p-3 flex items-center gap-2">
                  <span className="text-xs text-text-secondary flex-1 truncate" dir="ltr">{referralLink}</span>
                  <button onClick={handleCopy} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" fullWidth leftIcon={<Copy className="w-4 h-4" />} onClick={handleCopy}>
                    نسخ الرابط
                  </Button>
                  <Button variant="gold" fullWidth leftIcon={<Share2 className="w-4 h-4" />}
                    onClick={() => window.open(generateWhatsAppLink(`انضم معنا في وشائج 🇲🇷\n${referralLink}`), '_blank')}>
                    مشاركة واتساب
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Badge info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card title="شارة التميّز">
            <div className="space-y-2">
              {[
                { badge: 'bronze' as const, min: 5, label: 'برونزي' },
                { badge: 'silver' as const, min: 15, label: 'فضي' },
                { badge: 'gold' as const, min: 30, label: 'ذهبي' },
                { badge: 'platinum' as const, min: 60, label: 'بلاتيني' },
                { badge: 'diamond' as const, min: 100, label: 'ألماسي' },
              ].map(({ badge, min, label }) => (
                <div
                  key={badge}
                  className={`flex items-center justify-between p-3 rounded-xl ${MY_STATS.total >= min ? 'bg-background' : 'opacity-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xl">
                      {badge === 'diamond' ? '💎' : badge === 'platinum' ? '🌟' : badge === 'gold' ? '🥇' : badge === 'silver' ? '🥈' : '🥉'}
                    </div>
                    <span className="font-semibold text-sm" style={{ color: getBadgeColor(badge) }}>{label}</span>
                  </div>
                  <div className="text-xs text-text-secondary">{min}+ تزكية</div>
                  {MY_STATS.total >= min && (
                    <div className="w-2 h-2 bg-success rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card
          title="لوحة الشرف"
          subtitle="أكثر الأعضاء تزكية على المستوى الوطني"
          action={<Trophy className="w-5 h-5 text-gold" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_TOP_REFERRERS.concat(MOCK_TOP_REFERRERS).slice(0, 10).map((member, i) => (
              <div key={`${member.id}-${i}`} className="flex items-center gap-3 p-3 bg-background rounded-xl hover:bg-primary/5 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  i === 0 ? 'bg-gold text-white' :
                  i === 1 ? 'bg-gray-300 text-gray-700' :
                  i === 2 ? 'bg-amber-600 text-white' :
                  'bg-border text-text-secondary'
                }`}>
                  {i + 1}
                </div>
                <Avatar name={member.full_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text-primary text-sm truncate">{member.full_name}</div>
                  <div className="text-xs text-text-secondary">{member.wilaya}</div>
                </div>
                <div className="text-left flex-shrink-0">
                  <div className="font-black text-primary text-lg">{member.referral_count}</div>
                  <div className="text-xs text-text-secondary">تزكية</div>
                </div>
                {member.badge && (
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: getBadgeColor(member.badge) + '22', color: getBadgeColor(member.badge) }}
                  >
                    {getBadgeLabel(member.badge)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
