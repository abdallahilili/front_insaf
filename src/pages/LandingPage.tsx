import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, GitBranch, Building2, BarChart3, ArrowLeft,
  CheckCircle, Star, Shield, Zap, MapPin, ChevronDown
} from 'lucide-react'
import logo from '../assets/logo.png'
import Button from '../components/shared/Button'

const STATS = [
  { value: '13', label: 'ولاية مفعّلة' },
  { value: '50K+', label: 'عضو مسجّل' },
  { value: '98%', label: 'نسبة الرضا' },
  { value: '24/7', label: 'دعم فني' },
]

const FEATURES = [
  {
    icon: Users,
    title: 'إدارة الأعضاء',
    desc: 'تسجيل ومتابعة جميع أعضاء الحزب بشكل منظم وفعّال مع بيانات شاملة لكل عضو.',
  },
  {
    icon: GitBranch,
    title: 'نظام التزكية',
    desc: 'نظام إحالة ذكي يتيح تتبع شبكة التزكيات وتحديد أكثر الأعضاء نشاطاً وتأثيراً.',
  },
  {
    icon: Building2,
    title: 'الهيكل التنظيمي',
    desc: 'بناء تلقائي للهيكل التنظيمي من الوحدات والأقسام حتى المؤتمرات الجهوية.',
  },
  {
    icon: BarChart3,
    title: 'لوحة قيادة استراتيجية',
    desc: 'إحصائيات وتحليلات متقدمة تمنح القيادة رؤية واضحة لحالة الحزب.',
  },
  {
    icon: MapPin,
    title: 'خريطة التفاعل',
    desc: 'خريطة تفاعلية توضح توزيع الأعضاء ومستوى النشاط في كل ولاية.',
  },
  {
    icon: Shield,
    title: 'أمان متقدم',
    desc: 'نظام مصادقة آمن بالهاتف ورمز OTP مع إدارة متقدمة للصلاحيات.',
  },
]

const STEPS = [
  { num: '١', title: 'أدخل رقم هاتفك', desc: 'سنرسل لك رمز تحقق فوري' },
  { num: '٢', title: 'أكمل بياناتك', desc: 'بيانات شخصية بسيطة وسريعة' },
  { num: '٣', title: 'احصل على رابط التزكية', desc: 'شارك رابطك الخاص وابنِ شبكتك' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white font-cairo overflow-x-hidden" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="وشائج" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-primary text-xl">وشائج</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Button>
            <Button size="sm" onClick={() => navigate('/join')}>
              انضم الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(34,77,146,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            نظام إدارة عضوية الجيل الجديد
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-text-primary mb-6 leading-tight"
          >
            معاً نبني
            <br />
            <span className="text-gradient">وشائج المستقبل</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            منصة رقمية متكاملة لإدارة عضوية الحزب السياسي، تتبع شبكة التزكيات، وبناء الهيكل التنظيمي تلقائياً على المستوى الوطني.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Button size="lg" onClick={() => navigate('/join')} rightIcon={<ArrowLeft className="w-4 h-4" />}>
              انضم إلى الحزب الآن
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              دخول لوحة القيادة
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="flex items-center justify-center gap-6 mt-10 text-text-secondary text-sm flex-wrap"
          >
            {['آمن 100%', 'موريتاني 100%', 'سريع وموثوق'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-secondary"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl font-black mb-1">{s.value}</div>
                <div className="text-white/70 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-text-primary mb-3"
            >
              كل ما تحتاجه في منصة واحدة
            </motion.h2>
            <p className="text-text-secondary text-lg">أدوات قوية لبناء حزب منظم وفعّال</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-card card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-2">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-3">كيف يعمل النظام؟</h2>
            <p className="text-text-secondary text-lg">انضم خلال دقيقتين فقط</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 right-[16%] left-[16%] h-0.5 bg-gradient-to-l from-primary/30 via-gold/30 to-primary/30" />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 rounded-2xl gradient-primary text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {s.num}
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-2">{s.title}</h3>
                <p className="text-text-secondary text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.2)_0%,transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              كن جزءاً من التغيير
            </h2>
            <p className="text-white/80 text-xl mb-8">
              انضم إلى آلاف الأعضاء الذين يبنون موريتانيا الجديدة
            </p>
            <Button
              variant="gold"
              size="lg"
              onClick={() => navigate('/join')}
              rightIcon={<ArrowLeft className="w-4 h-4" />}
            >
              سجّل انضمامك الآن — مجاناً
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-text-primary text-center">
        <div className="flex items-center justify-center gap-2 text-white mb-2">
          <img src={logo} alt="وشائج" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg">وشائج</span>
        </div>
        <p className="text-white/40 text-sm">© 2026 وشائج — نظام إدارة عضوية الحزب</p>
      </footer>
    </div>
  )
}
