import { NavLink } from 'react-router-dom'
import { Smartphone, LayoutPanelTop, Info } from 'lucide-react'

const links = [
  { to: '/', label: 'Creator', icon: Smartphone },
  { to: '/templates', label: 'Templates', icon: LayoutPanelTop },
  { to: '/about', label: 'About', icon: Info },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[--color-background]/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around h-14">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 text-[10px] font-medium transition-all duration-300 relative ${
                isActive
                  ? 'text-[--color-accent]'
                  : 'text-[--color-muted]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[--color-accent] rounded-full" />}
                <l.icon className="size-5" strokeWidth={2} />
                {l.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
