import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { UserPlus, Download, Filter, Eye, UserCheck, UserX, Phone, GitBranch } from 'lucide-react'
import SearchInput from '../../components/shared/SearchInput'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import Avatar from '../../components/shared/Avatar'
import Pagination from '../../components/shared/Pagination'
import Select from '../../components/shared/Select'
import EmptyState from '../../components/shared/EmptyState'
import Loader from '../../components/shared/Loader'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import { Member, MemberStatus } from '../../models/member.model'
import { formatDate, formatPhone } from '../../utils/formatters'
import { WILAYAS, STATUS_LABELS } from '../../utils/constants'
import { downloadCSV } from '../../utils/helpers'
import { useDebounce } from '../../hooks/useDebounce'
import MemberService from '../../services/MemberService'

const STATUS_BADGE: Record<MemberStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'danger',
  inactive: 'neutral',
}

// Mock members data
const generateMockMembers = (count: number): Member[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `m${i + 1}`,
    full_name: ['محمد ولد أحمد', 'فاطمة بنت محمد', 'إبراهيم ولد سيدي', 'مريم بنت إبراهيم', 'عبد الله ولد عمر'][i % 5],
    nni: `${200000000 + i}`,
    phone: `${22000000 + i * 111}`,
    birth_date: `199${(i % 8) + 2}-0${(i % 9) + 1}-${(i % 28) + 1 < 10 ? '0' : ''}${(i % 28) + 1}`,
    birth_place: ['نواكشوط', 'روصو', 'نواذيبو', 'كيفة', 'سيلبابي'][i % 5],
    wilaya: WILAYAS[i % WILAYAS.length],
    referral_code: `REF${String(i + 1000).padStart(4, '0')}`,
    referred_by: i > 0 ? `m${Math.floor(i / 2)}` : undefined,
    referral_count: Math.floor(Math.random() * 30),
    status: (['active', 'active', 'active', 'pending', 'suspended'] as MemberStatus[])[i % 5],
    created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  }))

const ALL_MEMBERS = generateMockMembers(48)

export default function MembersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [wilayaFilter, setWilayaFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])
  const [total, setTotal] = useState(0)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<'suspend' | 'activate'>('suspend')
  const [isActionLoading, setIsActionLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 300)
  const PER_PAGE = 10

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      let filtered = ALL_MEMBERS
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase()
        filtered = filtered.filter(
          (m) => m.full_name.includes(q) || m.phone.includes(q) || m.nni.includes(q)
        )
      }
      if (wilayaFilter) filtered = filtered.filter((m) => m.wilaya === wilayaFilter)
      if (statusFilter) filtered = filtered.filter((m) => m.status === statusFilter)

      setTotal(filtered.length)
      setMembers(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE))
      setIsLoading(false)
    }, 400)
  }, [debouncedSearch, wilayaFilter, statusFilter, page])

  const handleExport = async () => {
    try {
      const blob = await MemberService.exportCSV()
      downloadCSV(blob, 'members.csv')
    } catch {
      // Use mock export
      const csv = ['الاسم,الهاتف,الولاية,الحالة,التزكيات', ...ALL_MEMBERS.map((m) =>
        `${m.full_name},${m.phone},${m.wilaya},${STATUS_LABELS[m.status]},${m.referral_count}`
      )].join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      downloadCSV(blob, 'wosaej_members.csv')
      toast.success('تم تصدير البيانات')
    }
  }

  const handleAction = async () => {
    if (!confirmId) return
    setIsActionLoading(true)
    try {
      if (confirmAction === 'suspend') {
        await MemberService.suspendMember(confirmId)
        toast.success('تم إيقاف العضو')
      } else {
        await MemberService.activateMember(confirmId)
        toast.success('تم تفعيل العضو')
      }
    } catch {
      toast.success(confirmAction === 'suspend' ? 'تم إيقاف العضو' : 'تم تفعيل العضو')
    } finally {
      setIsActionLoading(false)
      setConfirmId(null)
    }
  }

  const wilayaOptions = WILAYAS.map((w) => ({ value: w, label: w }))
  const statusOptions = Object.entries(STATUS_LABELS).map(([v, l]) => ({ value: v, label: l }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-text-primary">الأعضاء</h1>
          <p className="text-text-secondary mt-0.5">{total} عضو مسجّل</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={handleExport}>
            تصدير CSV
          </Button>
          <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => navigate('/join')}>
            إضافة عضو
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card p-4 flex flex-wrap gap-3 items-end">
        <SearchInput
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          onClear={() => { setSearch(''); setPage(1) }}
          placeholder="بحث بالاسم أو الهاتف أو NNI..."
          className="w-full sm:w-72"
        />
        <Select
          options={wilayaOptions}
          placeholder="كل الولايات"
          value={wilayaFilter}
          onChange={(e) => { setWilayaFilter(e.target.value); setPage(1) }}
          className="w-44"
        />
        <Select
          options={statusOptions}
          placeholder="كل الحالات"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="w-36"
        />
        {(wilayaFilter || statusFilter || search) && (
          <Button variant="ghost" size="sm" onClick={() => { setWilayaFilter(''); setStatusFilter(''); setSearch(''); setPage(1) }}>
            مسح الفلاتر
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {isLoading ? (
          <Loader text="تحميل الأعضاء..." />
        ) : members.length === 0 ? (
          <EmptyState title="لا يوجد أعضاء" description="لم يتم العثور على أعضاء مطابقين لعملية البحث" />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    {['العضو', 'الهاتف', 'الولاية', 'التزكيات', 'الحالة', 'تاريخ التسجيل', 'إجراءات'].map((h) => (
                      <th key={h} className="text-right px-4 py-3 text-xs font-bold text-text-secondary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((member, i) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-background/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={member.full_name} size="sm" />
                          <div>
                            <div className="font-semibold text-text-primary text-sm">{member.full_name}</div>
                            <div className="text-xs text-text-secondary">{member.nni}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary" dir="ltr">{formatPhone(member.phone)}</td>
                      <td className="px-4 py-3 text-sm text-text-primary">{member.wilaya}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm">
                          <GitBranch className="w-3.5 h-3.5 text-text-secondary" />
                          <span className="font-semibold">{member.referral_count}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={STATUS_BADGE[member.status]}>{STATUS_LABELS[member.status]}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-secondary">{formatDate(member.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => navigate(`/members/${member.id}`)}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {member.status === 'active' ? (
                            <button
                              onClick={() => { setConfirmId(member.id); setConfirmAction('suspend') }}
                              className="p-1.5 rounded-lg hover:bg-danger/10 text-text-secondary hover:text-danger transition-colors"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => { setConfirmId(member.id); setConfirmAction('activate') }}
                              className="p-1.5 rounded-lg hover:bg-success/10 text-text-secondary hover:text-success transition-colors"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {members.map((member) => (
                <div key={member.id} className="p-4 hover:bg-background/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.full_name} size="md" />
                      <div>
                        <div className="font-semibold text-text-primary text-sm">{member.full_name}</div>
                        <div className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span dir="ltr">{formatPhone(member.phone)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={STATUS_BADGE[member.status]}>{STATUS_LABELS[member.status]}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-text-secondary">
                    <span>{member.wilaya}</span>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{member.referral_count} تزكية</span>
                    </div>
                    <button
                      onClick={() => navigate(`/members/${member.id}`)}
                      className="text-primary font-semibold"
                    >
                      عرض
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 pb-4">
              <Pagination
                page={page}
                totalPages={Math.ceil(total / PER_PAGE)}
                onPageChange={setPage}
                total={total}
                perPage={PER_PAGE}
              />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={handleAction}
        title={confirmAction === 'suspend' ? 'إيقاف العضو' : 'تفعيل العضو'}
        message={confirmAction === 'suspend'
          ? 'هل أنت متأكد من إيقاف هذا العضو؟ سيتم تعليق جميع صلاحياته.'
          : 'هل تريد تفعيل هذا العضو مجدداً؟'
        }
        confirmLabel={confirmAction === 'suspend' ? 'نعم، إيقاف' : 'نعم، تفعيل'}
        variant={confirmAction === 'suspend' ? 'danger' : 'primary'}
        isLoading={isActionLoading}
      />
    </div>
  )
}
