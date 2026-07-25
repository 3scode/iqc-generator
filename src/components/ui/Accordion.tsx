import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props {
  items: { question: string; answer: string }[]
}

export function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="flex flex-col divide-y divide-[--color-border-light] dark:divide-[--color-border-light-dark]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full py-4 text-left cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="font-medium text-[--color-text-primary] dark:text-[--color-text-primary-dark]">{item.question}</span>
            <ChevronDown className={`size-5 text-[--color-text-secondary] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-40 pb-4' : 'max-h-0'}`}>
            <p className="text-sm text-[--color-text-secondary] dark:text-[--color-text-secondary-dark]">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
