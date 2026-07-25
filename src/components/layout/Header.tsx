import { NavLink } from 'react-router-dom'
import { MessageSquareText } from 'lucide-react'

const links = [
  { to: '/', label: 'Creator' },
  { to: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[--color-background]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-sm flex items-center justify-center">
            <MessageSquareText className="size-4 text-[--color-accent]" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold font-display tracking-tight text-[--color-foreground] hidden sm:block">
            IQC Generator
          </span>
        </NavLink>

        <nav className="flex items-center gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 text-sm font-medium rounded-[var(--radius-base)] transition-all duration-300 ${
                  isActive
                    ? 'text-[--color-accent] neumorph-inset-sm bg-[--color-surface]'
                    : 'text-[--color-muted] hover:text-[--color-foreground]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
