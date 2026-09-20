import { cn } from 'cn'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const links = [
  { href: '#work', label: 'What it hosts' },
  { href: '#notes', label: 'Notes' },
  { href: '#deploy', label: 'Deploy' },
  { href: '#domain', label: 'Domain' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-foreground">
          <SiteMark />
          <span className="font-serif text-lg tracking-tight">Anoop</span>
        </a>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <nav
        id="mobile-nav"
        className={cn(
          'border-t border-border sm:hidden',
          open ? 'block' : 'hidden',
        )}
        aria-label="Mobile"
      >
        <div className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2.5 text-sm text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

function SiteMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-7"
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="7" className="fill-primary" />
      <path
        d="M10 9.5h8.2L22 13.2V22.5H10V9.5Z"
        className="fill-primary-foreground/95"
      />
      <path d="M18.2 9.5V13.2H22" className="stroke-primary" strokeWidth="1.4" />
    </svg>
  )
}
