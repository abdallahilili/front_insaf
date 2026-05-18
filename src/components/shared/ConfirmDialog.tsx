import Modal from './Modal'
import Button from './Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
  isLoading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد',
  message,
  confirmLabel = 'تأكيد',
  cancelLabel = 'إلغاء',
  variant = 'danger',
  isLoading,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
          variant === 'danger' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
        }`}>
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="font-bold text-text-primary text-lg mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} fullWidth>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} isLoading={isLoading} fullWidth>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
