import { Sun, Moon } from 'lucide-react'

interface Props {
  checked: boolean
  onChange: (v: boolean) => void
}

export function Toggle({ checked, onChange }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative size-10 flex items-center justify-center rounded-full hover:bg-[--color-background] dark:hover:bg-[--color-bubble-received-dark] transition-colors cursor-pointer"
    >
      {checked ? <Moon className="size-5 text-[--color-primary]" /> : <Sun className="size-5 text-[--color-warning]" />}
    </button>
  )
}
