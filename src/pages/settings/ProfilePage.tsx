import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Share2, LogOut, Phone, MapPin, Calendar, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '../../components/shared/Card'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import Avatar from '../../components/shared/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import { REFERRAL_BASE_URL, ROLE_LABELS } from '../../utils/constants'
import { copyToClipboard, generateWhatsAppLink } from '../../utils/helpers'
import AuthService from '../../services/AuthService'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const referralCode = user?.referral_code || 'REF0001'
  const referralLink = REFERRAL_BASE_URL + referralCode

  const handleLogout = async () => {
    await AuthService.logout()
    logout()
    navigate('/login')
  }

  const handleCopy = async () => {
    await copyToClipboard(referralLink)
    toast.success('تم نسخ رابط التزكية')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-text-primary">الملف الشخصي</h1>
        <p className="text-text-secondary mt-0.5">بياناتك الشخصية ورابط التزكية</p>
      </div>

      {/* Profile header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <div className="flex items-center gap-4">
            <Avatar name={user?.full_name || 'مستخدم'} size="xl" />
            <div>
              <h2 className="text-xl font-black text-text-primary">{user?.full_name || 'مستخدم'}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary">{user?.role ? ROLE_LABELS[user.role] : 'عضو'}</Badge>
                <Badge variant="success">نشط</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            <div className="flex items-center gap-2.5 p-3 bg-background rounded-xl">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">الهاتف</div>
                <div className="font-semibold text-sm" dir="ltr">{user?.phone || '—'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-background rounded-xl">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">الولاية</div>
                <div className="font-semibold text-sm">{user?.wilaya || '—'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-background rounded-xl">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">تاريخ الانضمام</div>
                <div className="font-semibold text-sm">{user?.created_at ? new Date(user.created_at).getFullYear() : '2024'}</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Referral */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card title="رابط تزكيتي">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="bg-background rounded-2xl p-4 flex-shrink-0">
              <QRCodeSVG value={referralLink} size={130} level="H" />
              <p className="text-center text-xs text-text-secondary mt-2 font-mono font-bold">{referralCode}</p>
            </div>
            <div className="flex-1 w-full">
              <p className="text-sm text-text-secondary mb-3">شارك رابطك الخاص لتزكية أعضاء جدد وتوسيع شبكتك</p>
              <div className="bg-background rounded-xl p-3 mb-3 flex items-center gap-2">
                <span className="text-xs text-text-secondary flex-1 truncate" dir="ltr">{referralLink}</span>
                <button onClick={handleCopy} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" fullWidth size="sm" leftIcon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
                  نسخ
                </Button>
                <Button variant="gold" fullWidth size="sm" leftIcon={<Share2 className="w-3.5 h-3.5" />}
                  onClick={() => window.open(generateWhatsAppLink(`انضم إلى وشائج: ${referralLink}`), '_blank')}>
                  واتساب
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card title="الأمان" action={<Shield className="w-5 h-5 text-success" />}>
          <div className="p-3 bg-success/5 rounded-xl flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm text-success font-medium">الحساب محمي بمصادقة OTP</span>
          </div>
          <Button variant="danger" fullWidth leftIcon={<LogOut className="w-4 h-4" />} onClick={handleLogout}>
            تسجيل الخروج
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}
