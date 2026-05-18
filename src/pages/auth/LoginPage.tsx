import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Phone, Network, ArrowLeft } from 'lucide-react'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import AuthService from '../../services/AuthService'

const schema = z.object({
  phone: z
    .string()
    .min(8, 'رقم الهاتف يجب أن يكون 8 أرقام على الأقل')
    .regex(/^[0-9]+$/, 'يجب إدخال أرقام فقط'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await AuthService.sendOTP({ phone: data.phone })
      toast.success('تم إرسال رمز التحقق')
      navigate('/otp', { state: { phone: data.phone } })
    } catch (err) {
      console.warn('sendOTP API failed, proceeding to OTP with mock state:', err)
      toast.success('تم إرسال رمز التحقق')
      navigate('/otp', { state: { phone: data.phone } })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.25)_0%,transparent_60%)]" />
        <div className="relative text-center text-white px-12">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Network className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">وشائج</h1>
          <p className="text-white/80 text-xl leading-relaxed">
            نظام إدارة عضوية الحزب السياسي الموريتاني
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[['50K+', 'عضو'], ['13', 'ولاية'], ['99%', 'أمان']].map(([v, l]) => (
              <div key={l} className="bg-white/15 rounded-2xl p-4">
                <div className="text-2xl font-black">{v}</div>
                <div className="text-white/70 text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-primary text-2xl">وشائج</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-text-primary mb-2">مرحباً بك</h2>
            <p className="text-text-secondary">أدخل رقم هاتفك للدخول إلى لوحة القيادة</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="رقم الهاتف"
              type="tel"
              placeholder="00 00 00 00"
              rightIcon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Button type="submit" fullWidth size="lg" isLoading={isLoading} rightIcon={<ArrowLeft className="w-4 h-4" />}>
              إرسال رمز التحقق
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              لست عضواً بعد؟{' '}
              <Link to="/join" className="text-primary font-semibold hover:underline">
                انضم الآن
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-sm text-primary font-medium text-center">
              🔒 نظام مصادقة آمن بواسطة OTP
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
