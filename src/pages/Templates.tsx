import { useNavigate } from 'react-router-dom'
import { Sparkles, MessageSquare, Quote, Zap } from 'lucide-react'
import { templates } from '../data/templates'
import { useFormStore } from '../stores/formStore'
import { useUiStore } from '../stores/uiStore'
import { Button } from '../components/ui/Button'

export function Templates() {
  const navigate = useNavigate()
  const applyTemplate = useFormStore((s) => s.applyTemplate)
  const showToast = useUiStore((s) => s.showToast)

  const handleApply = (slug: string) => {
    const tpl = templates.find((t) => t.id === slug)
    if (!tpl) return
    applyTemplate(tpl)
    showToast('success', `Template "${tpl.name}" diterapkan`)
    navigate('/')
  }

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto">
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-sm flex items-center justify-center mx-auto mb-4">
          <Sparkles className="size-5 text-[--color-accent]" strokeWidth={2} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[--color-foreground]">Templates</h1>
        <p className="text-sm text-[--color-muted] mt-1">Mulai cepat dari template siap pakai.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => {
          const p = tpl.preset
          return (
            <div
              key={tpl.id}
              className="neumorph-card bg-[--color-surface] overflow-hidden"
            >
              <div className="p-5 space-y-3" style={{ backgroundColor: p.bgType === 'gradient' ? undefined : p.bgColor, background: p.bgType === 'gradient' ? `linear-gradient(135deg, ${p.bgColor}, ${p.bgGradientEnd})` : undefined }}>
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-3.5" strokeWidth={2} style={{ color: p.bgType === 'gradient' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }} />
                  <p className="text-xs font-medium" style={{ color: p.bgType === 'gradient' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }}>
                    {p.messages.length} pesan
                  </p>
                  {p.quoteMessageIndex !== undefined && <Quote className="size-3" strokeWidth={2} style={{ color: p.bgType === 'gradient' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }} />}
                </div>
                <div className="space-y-1">
                  {p.messages.slice(0, 3).map((m, i) => (
                    <p key={i} className="text-xs truncate" style={{ color: p.bgType === 'gradient' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }}>
                      <span className="font-semibold">{m.sender === 'you' ? (p.senderName || 'You') : 'Other'}:</span> {m.text}
                    </p>
                  ))}
                  {p.messages.length > 3 && (
                    <p className="text-[10px] opacity-50" style={{ color: p.bgType === 'gradient' ? '#fff' : '#000' }}>+{p.messages.length - 3} lainnya</p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-[#D5DCE6]/50">
                <h3 className="text-sm font-bold font-display tracking-tight text-[--color-foreground]">{tpl.name}</h3>
                <Button variant="primary" size="sm" fullWidth onClick={() => handleApply(tpl.id)} className="mt-3">
                  <Zap className="size-4" strokeWidth={2} /> Pakai
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
