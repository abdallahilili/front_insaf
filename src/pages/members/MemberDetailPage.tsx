import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MapPin, Calendar, GitBranch, Copy, Share2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import Card from '../../components/shared/Card'
import Avatar from '../../components/shared/Avatar'
import { formatDate, formatPhone } from '../../utils/formatters'
import { copyToClipboard, generateWhatsAppLink } from '../../utils/helpers'
import { REFERRAL_BASE_URL, STATUS_LABELS } from '../../utils/constants'
import toast from 'react-hot-toast'

// Mock single member
const MOCK_MEMBER = {
  id: 'm1',
  full_name: 'محمد ولد أحمد',
  nni: '200000001',
  phone: '22000001',
  birth_date: '1990-05-15',
  birth_place: 'نواكشوط',
  wilaya: 'نواكشوط الغربية',
  referral_code: 'REF1000',
  referral_count: 45,
  status: 'active' as const,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-03-01T12:00:00Z',
}

export default function MemberDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const member = { ...MOCK_MEMBER, id: id || 'm1' }
  const referralLink = REFERRAL_BASE_URL + member.referral_code

  const handleCopy = async () => {
    await copyToClipboard(referralLink)
    toast.success('تم نسخ رابط التزكية')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/members')} className="p-2 rounded-xl hover:bg-white text-text-secondary hover:text-primary transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-text-primary">{member.full_name}</h1>
          <p className="text-text-secondary text-sm mt-0.5">تفاصيل العضو</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <div className="text-center mb-6">
              <Avatar name={member.full_name} size="xl" />
              <h2 className="text-xl font-black text-text-primary mt-3">{member.full_name}</h2>
              <p className="text-text-secondary text-sm mt-1">NNI: {member.nni}</p>
              <div className="mt-2">
                <Badge variant="success">{STATUS_LABELS[member.status]}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-secondary">الهاتف</div>
                  <div className="font-semibold text-sm" dir="ltr">{formatPhone(member.phone)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-secondary">الولاية</div>
                  <div className="font-semibold text-sm">{member.wilaya}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-secondary">تاريخ الميلاد</div>
                  <div className="font-semibold text-sm">{formatDate(member.birth_date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                <Calendar className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-secondary">تاريخ التسجيل</div>
                  <div className="font-semibold text-sm">{formatDate(member.created_at)}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Referral card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card title="نظام التزكية" subtitle="رابط التزكية الخاص بالعضو">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR */}
              <div className="bg-background rounded-2xl p-4 flex-shrink-0">
                <QRCodeSVG value={referralLink} size={140} level="H" />
              </div>

              <div className="flex-1 w-full">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-primary/5 rounded-xl p-4 text-center">
                    <GitBranch className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-2xl font-black text-primary">{member.referral_count}</div>
                    <div className="text-xs text-text-secondary">إجمالي التزكيات</div>
                  </div>
                  <div className="bg-gold/5 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">🥇</div>
                    <div className="text-2xl font-black text-gold">#12</div>
                    <div className="text-xs text-text-secondary">الترتيب الوطني</div>
                  </div>
                </div>

                {/* Link */}
                <div className="bg-background rounded-xl p-3 mb-3 flex items-center gap-2">
                  <span className="text-xs text-text-secondary flex-1 truncate" dir="ltr">{referralLink}</span>
                  <button onClick={handleCopy} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" fullWidth leftIcon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
                    نسخ الرابط
                  </Button>
                  <Button variant="gold" size="sm" fullWidth leftIcon={<Share2 className="w-3.5 h-3.5" />}
                    onClick={() => window.open(generateWhatsAppLink(`انضم معنا في وشائج: ${referralLink}`), '_blank')}>
                    واتساب
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent referrals */}
          <Card title="آخر التزكيات" className="mt-4">
            <div className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-background rounded-xl">
                  <div className="flex items-center gap-2">
                    <Avatar name={`عضو ${i + 1}`} size="sm" />
                    <div>
                      <div className="text-sm font-semibold text-text-primary">عضو مُزكّى {i + 1}</div>
                      <div className="text-xs text-text-secondary">نواكشوط</div>
                    </div>
                  </div>
                  <div className="text-xs text-text-secondary">منذ {i + 1} يوم</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
