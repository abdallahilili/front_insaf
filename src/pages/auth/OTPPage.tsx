import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import Button from '../../components/shared/Button'
import AuthService from '../../services/AuthService'
import { useAuth } from '../../contexts/AuthContext'

export default function OTPPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const phone = (location.state as { phone?: string })?.phone || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!phone) navigate('/login')
  }, [phone, navigate])

  useEffect(() => {
    const timer = setInterval(() => setResendTimer((t) => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      refs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 6) return toast.error('أدخل رمز التحقق المكوّن من 6 أرقام')
    setIsLoading(true)
    try {
      const res = await AuthService.verifyOTP({ phone, otp: code })
      login(res.access_token, res.user)
      toast.success('تم تسجيل الدخول بنجاح')
      navigate('/dashboard')
    } catch {
      toast.error('رمز التحقق غير صحيح')
      setOtp(['', '', '', '', '', ''])
      refs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    try {
      await AuthService.sendOTP({ phone })
      setResendTimer(60)
      toast.success('تم إعادة إرسال الرمز')
    } catch {
      toast.error('تعذر إعادة الإرسال')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-modal w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-text-primary mb-2">رمز التحقق</h2>
          <p className="text-text-secondary text-sm">
            تم إرسال رمز مكوّن من 6 أرقام إلى
            <br />
            <span className="font-bold text-text-primary" dir="ltr">{phone}</span>
          </p>
        </div>

        {/* OTP boxes */}
        <div className="flex justify-center gap-3 mb-8" dir="ltr" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-2xl font-black rounded-xl border-2 outline-none transition-all
                ${digit ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-white text-text-primary'}
                focus:border-primary focus:bg-primary/5
              `}
            />
          ))}
        </div>

        <Button fullWidth size="lg" onClick={handleVerify} isLoading={isLoading}>
          تحقق وادخل
        </Button>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm mb-2">لم تستلم الرمز؟</p>
          {resendTimer > 0 ? (
            <p className="text-primary font-semibold text-sm">
              إعادة الإرسال بعد {resendTimer} ثانية
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary font-semibold text-sm hover:underline"
            >
              إعادة إرسال الرمز
            </button>
          )}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full flex items-center justify-center gap-2 text-text-secondary text-sm hover:text-primary transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          تغيير رقم الهاتف
        </button>
      </motion.div>
    </div>
  )
}
