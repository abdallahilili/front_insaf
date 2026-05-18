import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, CheckCircle, Clock, MapPin, Building2, Layers } from 'lucide-react'
import Card from '../../components/shared/Card'
import Badge from '../../components/shared/Badge'
import { WILAYAS } from '../../utils/constants'
import { formatNumber } from '../../utils/formatters'

interface UnitData { id: string; name: string; count: number; required: number; complete: boolean }
interface SectionData { id: string; name: string; count: number; units: UnitData[] }
interface MoughataaData { id: string; name: string; count: number; sections: SectionData[] }
interface WilayaData { id: string; name: string; count: number; moughataas: MoughataaData[]; active: boolean }

const generateWilayaData = (name: string, i: number): WilayaData => ({
  id: `w${i}`,
  name,
  count: Math.floor(Math.random() * 8000) + 500,
  active: Math.random() > 0.1,
  moughataas: Array.from({ length: 2 + (i % 3) }, (_, j) => ({
    id: `m${i}-${j}`,
    name: `مقاطعة ${j + 1}`,
    count: Math.floor(Math.random() * 2000) + 100,
    sections: Array.from({ length: 2 + (j % 2) }, (_, k) => ({
      id: `s${i}-${j}-${k}`,
      name: `قسم ${k + 1}`,
      count: Math.floor(Math.random() * 500) + 50,
      units: Array.from({ length: 3 + (k % 3) }, (_, u) => ({
        id: `u${i}-${j}-${k}-${u}`,
        name: `وحدة ${u + 1}`,
        count: Math.floor(Math.random() * 10) + 2,
        required: 10,
        complete: Math.random() > 0.4,
      })),
    })),
  })),
})

const WILAYAS_DATA: WilayaData[] = WILAYAS.map((name, i) => generateWilayaData(name, i))

function UnitItem({ unit }: { unit: UnitData }) {
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-xl border ${unit.complete ? 'border-success/30 bg-success/5' : 'border-border bg-background'}`}>
      <div className="flex items-center gap-2">
        {unit.complete
          ? <CheckCircle className="w-3.5 h-3.5 text-success" />
          : <Clock className="w-3.5 h-3.5 text-text-secondary" />
        }
        <span className="text-sm font-medium">{unit.name}</span>
      </div>
      <div className="text-xs text-text-secondary">
        <span className={unit.complete ? 'text-success font-bold' : 'text-text-primary font-semibold'}>{unit.count}</span>
        <span>/{unit.required}</span>
      </div>
    </div>
  )
}

function SectionItem({ section }: { section: SectionData }) {
  const [open, setOpen] = useState(false)
  const completeUnits = section.units.filter((u) => u.complete).length

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3 hover:bg-background transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-text-secondary" />
          <span className="font-semibold text-sm">{section.name}</span>
          <Badge variant="neutral">{formatNumber(section.count)} عضو</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{completeUnits}/{section.units.length} وحدة</span>
          <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="p-3 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2">
          {section.units.map((unit) => <UnitItem key={unit.id} unit={unit} />)}
        </div>
      )}
    </div>
  )
}

function MoughataaItem({ moughataa }: { moughataa: MoughataaData }) {
  const [open, setOpen] = useState(false)
  const completeSections = moughataa.sections.filter((s) => s.units.every((u) => u.complete)).length

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3.5 hover:bg-background transition-colors"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <span className="font-bold">{moughataa.name}</span>
          <Badge variant="primary">{formatNumber(moughataa.count)} عضو</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{completeSections}/{moughataa.sections.length} قسم</span>
          <ChevronLeft className={`w-4 h-4 text-text-secondary transition-transform ${open ? '-rotate-90' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="p-3 border-t border-border space-y-2">
          {moughataa.sections.map((s) => <SectionItem key={s.id} section={s} />)}
        </div>
      )}
    </div>
  )
}

export default function OrganizationPage() {
  const [openWilaya, setOpenWilaya] = useState<string | null>(null)
  const totalComplete = WILAYAS_DATA.reduce((acc, w) =>
    acc + w.moughataas.reduce((a, m) =>
      a + m.sections.reduce((b, s) => b + s.units.filter((u) => u.complete).length, 0), 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-primary">الهيكل التنظيمي</h1>
        <p className="text-text-secondary mt-0.5">البناء التنظيمي الوطني من الوحدات إلى الولايات</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ولايات مفعّلة', value: `${WILAYAS_DATA.filter((w) => w.active).length}/13`, icon: MapPin, color: 'text-primary' },
          { label: 'وحدات مكتملة', value: totalComplete, icon: CheckCircle, color: 'text-success' },
          { label: 'إجمالي الأعضاء', value: formatNumber(WILAYAS_DATA.reduce((a, w) => a + w.count, 0)), icon: Building2, color: 'text-gold' },
          { label: 'نسبة الاكتمال', value: '73%', icon: Layers, color: 'text-primary' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-card p-4 text-center card-hover">
            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
            <div className="text-2xl font-black text-text-primary">{value}</div>
            <div className="text-xs text-text-secondary mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Wilaya list */}
      <div className="space-y-3">
        {WILAYAS_DATA.map((wilaya, i) => (
          <motion.div
            key={wilaya.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
          >
            <button
              onClick={() => setOpenWilaya(openWilaya === wilaya.id ? null : wilaya.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-background transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm gradient-primary`}>
                  {i + 1}
                </div>
                <div className="text-right">
                  <div className="font-bold text-text-primary">{wilaya.name}</div>
                  <div className="text-xs text-text-secondary">{wilaya.moughataas.length} مقاطعة</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-left hidden sm:block">
                  <div className="font-black text-primary text-lg">{formatNumber(wilaya.count)}</div>
                  <div className="text-xs text-text-secondary">عضو</div>
                </div>
                <Badge variant={wilaya.active ? 'success' : 'neutral'}>
                  {wilaya.active ? 'مفعّلة' : 'غير مفعّلة'}
                </Badge>
                <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${openWilaya === wilaya.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {openWilaya === wilaya.id && (
              <div className="p-4 border-t border-border space-y-3">
                {wilaya.moughataas.map((m) => <MoughataaItem key={m.id} moughataa={m} />)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
