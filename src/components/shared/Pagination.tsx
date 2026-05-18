import { ChevronRight, ChevronLeft } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  total: number
  perPage: number
}

export default function Pagination({ page, totalPages, onPageChange, total, perPage }: PaginationProps) {
  const start = (page - 1) * perPage + 1
  const end = Math.min(page * perPage, total)

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (page <= 3) return i + 1
    if (page >= totalPages - 2) return totalPages - 4 + i
    return page - 2 + i
  })

  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <p className="text-sm text-text-secondary">
        عرض <span className="font-semibold text-text-primary">{start}–{end}</span> من {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed text-text-secondary hover:text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              p === page
                ? 'bg-primary text-white'
                : 'hover:bg-background text-text-secondary hover:text-primary'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed text-text-secondary hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
