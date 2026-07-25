import type { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const sizes: Record<string, string> = {
  sm: 'h-9 px-5 text-xs',
  md: 'h-11 px-7 text-sm',
  lg: 'h-12 px-9 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth,
  children,
  className = '',
  disabled,
  ...props
}: Props) {
  const base =
    'rounded-[var(--radius-base)] font-display font-bold tracking-tight transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-background]'

  const styles: Record<string, string> = {
    primary: `bg-[--color-accent] text-white shadow-[5px_5px_10px_var(--shadow-dark),-5px_-5px_10px_var(--shadow-light)] hover:shadow-[7px_7px_14px_var(--shadow-dark),-7px_-7px_14px_var(--shadow-light)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] active:translate-y-[0.5px]`,
    secondary: `bg-[--color-surface] neumorph hover:neumorph-hover active:neumorph-press text-[--color-foreground]`,
    ghost: `bg-transparent text-[--color-muted] hover:text-[--color-foreground] hover:bg-[--color-surface] hover:neumorph-sm active:neumorph-inset-sm`,
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${styles[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading && <Loader2 className="animate-spin size-4" />}
      {children}
    </button>
  )
}
