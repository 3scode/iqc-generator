import type { LayoutRatio } from '../../types'
import { Smartphone, Square, Frame } from 'lucide-react'

interface Props {
  value: LayoutRatio
  onChange: (v: LayoutRatio) => void
}

const options: { value: LayoutRatio; label: string; icon: typeof Smartphone }[] = [
  { value: '9:16', label: 'Story', icon: Smartphone },
  { value: '1:1', label: 'Feed', icon: Square },
  { value: '4:5', label: 'Portrait', icon: Frame },
]

export function LayoutSwitcher({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => {
        const Icon = opt.icon
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-2 py-3 px-3 text-sm font-medium rounded-[var(--radius-base)] transition-all duration-300 cursor-pointer bg-[--color-surface] ${
              active
                ? 'text-[--color-accent] neumorph-inset-sm'
                : 'text-[--color-muted] neumorph-sm hover:neumorph'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]`}
          >
            <Icon className={`size-5 ${active ? 'text-[--color-accent]' : ''}`} strokeWidth={2} />
            <span className="font-display font-semibold">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
