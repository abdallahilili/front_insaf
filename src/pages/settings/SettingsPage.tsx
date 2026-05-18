import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Bell, Lock, Globe, Palette, Moon, Sun, Shield } from 'lucide-react'
import Card from '../../components/shared/Card'
import Button from '../../components/shared/Button'

interface ToggleProps { label: string; description?: string; value: boolean; onChange: (v: boolean) => void }
function Toggle({ label, description, value, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <div className="font-medium text-text-primary text-sm">{label}</div>
        {description && <div className="text-xs text-text-secondary mt-0.5">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-1 right-1' : 'right-5'}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ push: true, email: false, sms: true, alerts: true })
  const [prefs, setPrefs] = useState({ darkMode: false, rtl: true, compactView: false })

  const handleSave = () => toast.success('تم حفظ الإعدادات')

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-text-primary">الإعدادات</h1>
        <p className="text-text-secondary mt-0.5">تخصيص تجربة الاستخدام</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card title="الإشعارات" action={<Bell className="w-5 h-5 text-primary" />}>
          <Toggle label="إشعارات الدفع" description="تلقي إشعارات فورية في المتصفح" value={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} />
          <Toggle label="إشعارات SMS" description="تلقي إشعارات برسائل نصية" value={notifs.sms} onChange={(v) => setNotifs({ ...notifs, sms: v })} />
          <Toggle label="التنبيهات الذكية" description="تنبيهات عند اكتمال وحدات أو أحداث مهمة" value={notifs.alerts} onChange={(v) => setNotifs({ ...notifs, alerts: v })} />
          <Toggle label="التقارير بالبريد الإلكتروني" description="تلقي تقرير أسبوعي بالإحصائيات" value={notifs.email} onChange={(v) => setNotifs({ ...notifs, email: v })} />
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card title="المظهر والتفضيلات" action={<Palette className="w-5 h-5 text-primary" />}>
          <Toggle label="الوضع الداكن" description="استخدام السمة الداكنة" value={prefs.darkMode} onChange={(v) => setPrefs({ ...prefs, darkMode: v })} />
          <Toggle label="عرض مضغوط" description="تقليص المسافات لعرض محتوى أكثر" value={prefs.compactView} onChange={(v) => setPrefs({ ...prefs, compactView: v })} />
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card title="الأمان" action={<Shield className="w-5 h-5 text-primary" />}>
          <div className="space-y-3">
            <div className="p-4 bg-success/5 border border-success/20 rounded-xl flex items-center gap-3">
              <Lock className="w-5 h-5 text-success" />
              <div>
                <div className="font-semibold text-text-primary text-sm">المصادقة بـ OTP مفعّلة</div>
                <div className="text-xs text-text-secondary mt-0.5">حسابك محمي بمصادقة ثنائية عبر رقم الهاتف</div>
              </div>
            </div>
            <Button variant="secondary" fullWidth>تغيير رقم الهاتف</Button>
          </div>
        </Card>
      </motion.div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">حفظ الإعدادات</Button>
      </div>
    </div>
  )
}
