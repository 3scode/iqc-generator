import { useEffect } from 'react'
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react'
import { useUiStore } from '../../stores/uiStore'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const config: Record<string, string> = {
  success: 'text-[--color-accent-secondary]',
  error: 'text-red-500',
  warning: 'text-orange-500',
  info: 'text-[--color-accent]',
}

export function Toast() {
  const toast = useUiStore((s) => s.toast)
  const clearToast = useUiStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(clearToast, 3500)
    return () => clearTimeout(t)
  }, [toast, clearToast])

  if (!toast) return null

  const Icon = icons[toast.type]
  const color = config[toast.type]

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-50 animate-slide-in">
      <div className="neumorph rounded-[var(--radius-base)] bg-[--color-surface] px-5 py-3 flex items-center gap-3 min-w-[200px]">
        <Icon className={`size-5 shrink-0 ${color}`} strokeWidth={2} />
        <p className={`text-sm font-medium flex-1 ${color}`}>{toast.message}</p>
        <button onClick={clearToast} className="text-[--color-muted] hover:text-[--color-foreground] transition-colors cursor-pointer p-0.5">
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
