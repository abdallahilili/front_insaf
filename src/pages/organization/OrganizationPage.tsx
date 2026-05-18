import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, MapPin, Building2, Layers, RefreshCw, AlertTriangle, Compass } from 'lucide-react'
import Badge from '../../components/shared/Badge'

interface Commune {
  id: string
  code: string
  nom: string
  moughataa_id: string
  type_commune: 'grande' | 'moyenne' | 'petite'
  latitude?: number
  longitude?: number
}

interface Moughataa {
  id: string
  code: string
  nom: string
  wilaya_id: string
  communes: Commune[]
}

interface Wilaya {
  id: string
  code: string
  nom: string
  moughataas: Moughataa[]
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="animate-pulse space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-48" />
        <div className="h-4 bg-gray-200 rounded-lg w-72" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 text-center animate-pulse border border-border">
            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-2" />
            <div className="h-3 bg-gray-200 rounded w-24 mx-auto" />
          </div>
        ))}
      </div>

      {/* List Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 animate-pulse border border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-8 text-center max-w-md mx-auto space-y-4 border border-red-100" dir="rtl">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">تعذر تحميل الهيكل التنظيمي</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold shadow-button hover:bg-primary/95 transition-all text-sm"
      >
        <RefreshCw className="w-4 h-4" />
        إعادة المحاولة
      </button>
    </div>
  )
}

function CommuneItem({ commune }: { commune: Commune }) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'grande':
        return { label: 'بلدية كبرى', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' }
      case 'moyenne':
        return { label: 'بلدية متوسطة', color: 'border-blue-200 bg-blue-50 text-blue-700' }
      default:
        return { label: 'بلدية صغرى', color: 'border-slate-200 bg-slate-50 text-slate-600' }
    }
  }
  const typeConfig = getTypeConfig(commune.type_commune)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-border bg-background gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
          <Compass className="w-4 h-4 text-primary" />
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-text-primary block">{commune.nom}</span>
          <span className="text-[10px] text-text-secondary">رمز: {commune.code}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 self-start sm:self-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${typeConfig.color}`}>
          {typeConfig.label}
        </span>
        {commune.latitude !== null && commune.longitude !== null && commune.latitude !== undefined && (
          <div className="inline-flex items-center gap-1 text-[10px] text-text-secondary bg-white border border-border px-2 py-0.5 rounded-full">
            <MapPin className="w-2.5 h-2.5 text-red-500" />
            <span>{Number(commune.latitude).toFixed(3)}، {Number(commune.longitude).toFixed(3)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function MoughataaItem({ moughataa }: { moughataa: Moughataa }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3.5 hover:bg-background transition-colors text-right"
      >
        <div className="flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-primary" />
          <div className="text-right">
            <span className="font-bold text-sm text-text-primary block">{moughataa.nom}</span>
            <span className="text-[10px] text-text-secondary">رمز: {moughataa.code}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">{moughataa.communes.length} بلدية</Badge>
          <ChevronLeft className={`w-4 h-4 text-text-secondary transition-transform ${open ? '-rotate-90' : ''}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-gray-50/50"
          >
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {moughataa.communes.length > 0 ? (
                moughataa.communes.map((c) => <CommuneItem key={c.id} commune={c} />)
              ) : (
                <div className="col-span-full text-center py-4 text-xs text-text-secondary">
                  لا توجد بلديات مسجلة لهذه المقاطعة
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function OrganizationPage() {
  const [wilayas, setWilayas] = useState<Wilaya[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openWilaya, setOpenWilaya] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = import.meta.env.VITE_SUPABASE_URL || 'https://qbvtewohvyzigmbnkdwr.supabase.co'
      const key = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidnRld29odnl6aWdtYm5rZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzYzOTcsImV4cCI6MjA5MjUxMjM5N30.ChxcEAJ80OVbwTPqE7QdRBXX7V7G-GA-f8mYNzRd8uA'

      const [wilayasRes, moughataasRes, communesRes] = await Promise.all([
        fetch(`${url}/rest/v1/wilayas?select=*&est_supprime=eq.false&order=nom.asc`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` }
        }),
        fetch(`${url}/rest/v1/moughataas?select=*&est_supprime=eq.false&order=nom.asc`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` }
        }),
        fetch(`${url}/rest/v1/communes?select=*&est_supprime=eq.false&order=nom.asc`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` }
        })
      ])

      if (!wilayasRes.ok || !moughataasRes.ok || !communesRes.ok) {
        throw new Error('فشل تحميل البيانات الجغرافية من خادم Supabase')
      }

      const rawWilayas = await wilayasRes.json()
      const rawMoughataas = await moughataasRes.json()
      const rawCommunes = await communesRes.json()

      const mappedWilayas: Wilaya[] = rawWilayas.map((w: any) => {
        const wilayaMoughataas = rawMoughataas
          .filter((m: any) => m.wilaya_id === w.id)
          .map((m: any) => {
            const moughataaCommunes = rawCommunes
              .filter((c: any) => c.moughataa_id === m.id)
              .map((c: any) => ({
                id: c.id,
                code: c.code,
                nom: c.nom,
                moughataa_id: c.moughataa_id,
                type_commune: c.type_commune,
                latitude: c.latitude,
                longitude: c.longitude
              }))

            return {
              id: m.id,
              code: m.code,
              nom: m.nom,
              wilaya_id: m.wilaya_id,
              communes: moughataaCommunes
            }
          })

        return {
          id: w.id,
          code: w.code,
          nom: w.nom,
          moughataas: wilayaMoughataas
        }
      })

      setWilayas(mappedWilayas)
    } catch (err: any) {
      console.error(err)
      setError('فشل جلب البيانات الجغرافية من Supabase. يرجى التحقق من مفاتيح الربط وتدفق البيانات.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalWilayas = wilayas.length
  const totalMoughataas = wilayas.reduce((acc, w) => acc + w.moughataas.length, 0)
  const totalCommunes = wilayas.reduce((acc, w) =>
    acc + w.moughataas.reduce((sum, m) => sum + m.communes.length, 0), 0
  )
  const totalGrandeCommunes = wilayas.reduce((acc, w) =>
    acc + w.moughataas.reduce((sum, m) =>
      sum + m.communes.filter((c) => c.type_commune === 'grande').length, 0), 0
  )

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState message={error} onRetry={fetchData} />

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-primary">الهيكل التنظيمي (البلديات والولايات)</h1>
          <p className="text-text-secondary mt-0.5">التقسيمات الجغرافية والبلديات المجلوبة مباشرة من قاعدة بيانات Supabase</p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-border hover:bg-background text-text-primary rounded-lg transition-colors shadow-sm self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          تحديث البيانات
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'الولايات الوطنية', value: totalWilayas, icon: MapPin, color: 'text-primary' },
          { label: 'المقاطعات الإدارية', value: totalMoughataas, icon: Building2, color: 'text-gold' },
          { label: 'البلديات الكلية', value: totalCommunes, icon: Layers, color: 'text-success' },
          { label: 'البلديات الكبرى', value: totalGrandeCommunes, icon: Compass, color: 'text-primary' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-card p-4 text-center card-hover border border-border/50">
            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
            <div className="text-2xl font-black text-text-primary">{value}</div>
            <div className="text-xs text-text-secondary mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Wilaya list */}
      <div className="space-y-3">
        {wilayas.length > 0 ? (
          wilayas.map((wilaya, i) => {
            const wilayaCommunesCount = wilaya.moughataas.reduce((sum, m) => sum + m.communes.length, 0)
            return (
              <motion.div
                key={wilaya.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl shadow-card overflow-hidden border border-border/60"
              >
                <button
                  onClick={() => setOpenWilaya(openWilaya === wilaya.id ? null : wilaya.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-background transition-colors text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm gradient-primary">
                      {i + 1}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-text-primary">{wilaya.nom}</div>
                      <div className="text-xs text-text-secondary">رمز: {wilaya.code}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-left hidden sm:block">
                      <div className="font-black text-primary text-base">{wilaya.moughataas.length} مقاطعة</div>
                      <div className="text-[10px] text-text-secondary">{wilayaCommunesCount} بلدية</div>
                    </div>
                    <Badge variant="success">
                      نشطة
                    </Badge>
                    <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${openWilaya === wilaya.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openWilaya === wilaya.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-border bg-gray-50/30"
                    >
                      <div className="p-4 space-y-3">
                        {wilaya.moughataas.length > 0 ? (
                          wilaya.moughataas.map((m) => <MoughataaItem key={m.id} moughataa={m} />)
                        ) : (
                          <div className="text-center py-6 text-sm text-text-secondary">
                            لا توجد مقاطعات مسجلة لهذه الولاية
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })
        ) : (
          <div className="bg-white rounded-2xl shadow-card p-12 text-center border border-border/50 text-text-secondary">
            لم يتم العثور على أي تقسيمات إدارية. يرجى التحقق من قاعدة بيانات Supabase.
          </div>
        )}
      </div>
    </div>
  )
}
