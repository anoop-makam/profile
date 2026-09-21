import { NavLink } from 'react-router-dom'
import { Command } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
  { to: '/connect', label: 'Connect' },
]

export function SiteHeader({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="font-mono text-[11px] tracking-[0.28em] text-foreground uppercase"
        >
          AM
        </NavLink>
        <nav className="flex flex-1 items-center justify-center gap-0.5 sm:gap-1" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-2 py-1 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors sm:px-3',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="hidden font-mono text-[10px] tracking-[0.2em] text-faint uppercase md:block">
          {profile.location}
        </p>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Open command palette"
          onClick={onOpenCommand}
        >
          <Command />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
