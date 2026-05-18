import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Share2, CheckCircle, Phone, User, MapPin, Network } from 'lucide-react'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import Select from '../../components/shared/Select'
import MemberService from '../../services/MemberService'
import { WILAYAS, REFERRAL_BASE_URL } from '../../utils/constants'
import { copyToClipboard, generateWhatsAppLink } from '../../utils/helpers'

// Schemas
const step1Schema = z.object({
  phone: z.string().min(8, 'رقم الهاتف يجب أن يكون 8 أرقام على الأقل').regex(/^\d+$/, 'أرقام فقط'),
  otp: z.string().length(6, 'يجب أن يكون الرمز 6 أرقام').regex(/^\d+$/, 'أرقام فقط'),
})
const step2Schema = z.object({
  full_name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  nni: z.string().min(9, 'رقم التعريف الوطني غير صحيح').max(12),
  birth_date: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  birth_place: z.string().min(2, 'مكان الميلاد مطلوب'),
  wilaya: z.string().min(1, 'اختر الولاية'),
})

type Step1 = z.infer<typeof step1Schema>
type Step2 = z.infer<typeof step2Schema>

const WILAYA_OPTIONS = WILAYAS.map((w) => ({ value: w, label: w }))

export default function JoinPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const refCode = searchParams.get('ref') || ''

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [phoneData, setPhoneData] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [referralLink, setReferralLink] = useState('')

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema) })
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema) })

  const sendOtp = async () => {
    const phone = form1.getValues('phone')
    if (!phone || phone.length < 8) {
      form1.setError('phone', { message: 'أدخل رقم هاتف صحيح' })
      return
    }
    setIsLoading(true)
    try {
      // await AuthService.sendOTP({ phone })
      setIsOtpSent(true)
      setPhoneData(phone)
      toast.success('تم إرسال رمز التحقق')
    } catch {
      toast.error('تعذر إرسال الرمز')
    } finally {
      setIsLoading(false)
    }
  }

  const onStep1 = async (_data: Step1) => {
    // OTP verified, move to step 2
    setStep(2)
  }

  const onStep2 = async (data: Step2) => {
    setIsLoading(true)
    try {
      const member = await MemberService.registerMember({
        ...data,
        phone: phoneData,
        otp: form1.getValues('otp'),
        referral_code: refCode,
      })
      setReferralCode(member.referral_code)
      setReferralLink(REFERRAL_BASE_URL + member.referral_code)
      setStep(3)
      toast.success('تم تسجيلك بنجاح 🎉')
    } catch {
      toast.error('تعذر إكمال التسجيل. حاول مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = async () => {
    await copyToClipboard(referralLink)
    toast.success('تم نسخ رابط التزكية')
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Network className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-primary text-xl">وشائج</span>
          </div>
          <Link to="/login" className="text-text-secondary text-sm hover:text-primary">
            تسجيل الدخول
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Progress */}
        {step < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {['معلومات التواصل', 'البيانات الشخصية', 'اكتمل التسجيل'].map((label, i) => (
                <div key={label} className={`flex items-center gap-1.5 ${i < step - 1 ? 'text-success' : i === step - 1 ? 'text-primary' : 'text-text-secondary'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${i < step - 1 ? 'bg-success text-white' : i === step - 1 ? 'bg-primary text-white' : 'bg-border text-text-secondary'}`}>
                    {i < step - 1 ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{label}</span>
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
              <div className="bg-white rounded-3xl shadow-card p-6">
                <h2 className="text-2xl font-black text-text-primary mb-1">الانضمام إلى وشائج</h2>
                <p className="text-text-secondary mb-6">أدخل رقم هاتفك للبدء</p>

                <form onSubmit={form1.handleSubmit(onStep1)} className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      label="رقم الهاتف"
                      type="tel"
                      placeholder="00 00 00 00"
                      rightIcon={<Phone className="w-4 h-4" />}
                      error={form1.formState.errors.phone?.message}
                      className="flex-1"
                      {...form1.register('phone')}
                    />
                    <div className="flex items-end">
                      <Button type="button" onClick={sendOtp} isLoading={isLoading && !isOtpSent} size="md">
                        إرسال
                      </Button>
                    </div>
                  </div>

                  {isOtpSent && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <Input
                        label="رمز التحقق"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        error={form1.formState.errors.otp?.message}
                        {...form1.register('otp')}
                      />
                      <p className="text-xs text-text-secondary mt-1">تم إرسال الرمز إلى {phoneData}</p>
                    </motion.div>
                  )}

                  {refCode && (
                    <div className="p-3 bg-success/10 rounded-xl border border-success/20 text-sm text-success font-medium">
                      ✓ لديك رمز تزكية: <span className="font-bold">{refCode}</span>
                    </div>
                  )}

                  {isOtpSent && (
                    <Button type="submit" fullWidth size="lg">
                      التالي
                    </Button>
                  )}
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
              <div className="bg-white rounded-3xl shadow-card p-6">
                <h2 className="text-2xl font-black text-text-primary mb-1">البيانات الشخصية</h2>
                <p className="text-text-secondary mb-6">أكمل بياناتك للتسجيل</p>

                <form onSubmit={form2.handleSubmit(onStep2)} className="space-y-4">
                  <Input
                    label="الاسم الكامل"
                    placeholder="ثلاثي أو رباعي"
                    rightIcon={<User className="w-4 h-4" />}
                    required
                    error={form2.formState.errors.full_name?.message}
                    {...form2.register('full_name')}
                  />
                  <Input
                    label="رقم التعريف الوطني (NNI)"
                    placeholder="000 000 000"
                    inputMode="numeric"
                    error={form2.formState.errors.nni?.message}
                    required
                    {...form2.register('nni')}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="تاريخ الميلاد"
                      type="date"
                      error={form2.formState.errors.birth_date?.message}
                      required
                      {...form2.register('birth_date')}
                    />
                    <Input
                      label="مكان الميلاد"
                      placeholder="المدينة"
                      error={form2.formState.errors.birth_place?.message}
                      required
                      {...form2.register('birth_place')}
                    />
                  </div>
                  <Select
                    label="الولاية"
                    placeholder="اختر الولاية"
                    rightIcon={<MapPin className="w-4 h-4" />}
                    options={WILAYA_OPTIONS}
                    error={form2.formState.errors.wilaya?.message}
                    required
                    {...form2.register('wilaya')}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="secondary" onClick={() => setStep(1)} fullWidth>
                      رجوع
                    </Button>
                    <Button type="submit" isLoading={isLoading} fullWidth>
                      تسجيل الانضمام
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 3 - Success */}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible">
              <div className="bg-white rounded-3xl shadow-card p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>

                <h2 className="text-2xl font-black text-text-primary mb-2">تم تسجيلك بنجاح 🎉</h2>
                <p className="text-text-secondary mb-6">مرحباً بك في وشائج! شارك رابط تزكيتك وساهم في بناء الحزب.</p>

                {/* QR Code */}
                <div className="bg-background rounded-2xl p-4 mb-4 inline-block">
                  <QRCodeSVG value={referralLink} size={140} level="H" />
                </div>

                <div className="bg-background rounded-xl p-3 mb-4 flex items-center gap-2">
                  <span className="text-sm text-text-secondary flex-1 text-right truncate" dir="ltr">
                    {referralLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-text-secondary mb-4">
                  رمز تزكيتك: <span className="font-bold text-primary">{referralCode}</span>
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    leftIcon={<Copy className="w-4 h-4" />}
                    onClick={handleCopyLink}
                  >
                    نسخ الرابط
                  </Button>
                  <Button
                    variant="gold"
                    fullWidth
                    leftIcon={<Share2 className="w-4 h-4" />}
                    onClick={() => window.open(generateWhatsAppLink(`انضم إلى وشائج - الحزب الوطني 🇲🇷\n${referralLink}`), '_blank')}
                  >
                    واتساب
                  </Button>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="mt-4 text-primary font-semibold text-sm hover:underline"
                >
                  الدخول إلى لوحة القيادة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
