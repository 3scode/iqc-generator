import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-[--color-muted]">{label}</label>
      )}
      <input
        className={`neumorph-input w-full h-11 px-4 text-sm text-[--color-foreground] bg-[--color-surface] placeholder:text-[--color-muted]/50 ${error ? '!shadow-[inset_6px_6px_10px_rgb(239,68,68,0.3),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  )
}
