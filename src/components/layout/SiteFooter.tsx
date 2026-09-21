import { NavLink } from 'react-router-dom'
import { profile } from '@/data/profile'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          {profile.name}
        </p>
        <nav className="flex gap-4" aria-label="Footer">
          <NavLink to="/" className="hover:text-foreground">
            Skills
          </NavLink>
          <NavLink to="/journey" className="hover:text-foreground">
            Journey
          </NavLink>
          <NavLink to="/connect" className="hover:text-foreground">
            Connect
          </NavLink>
        </nav>
      </div>
    </footer>
  )
}
