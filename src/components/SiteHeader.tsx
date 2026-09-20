import { useEffect, useState } from 'react'
import { cn } from 'cn'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#contact', label: 'Signal' },
]

export function SiteHeader() {
  const [active, setActive] = useState('skills')

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((node): node is Element => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4, 0.7] },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-primary/15 bg-[#060807]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 lg:px-10">
        <a
          href="#skills"
          className="font-mono text-[11px] tracking-[0.32em] text-primary/80 uppercase"
        >
          AM
        </a>
        <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'px-2 py-1 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors sm:px-3',
                active === link.href.slice(1)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="hidden font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:block">
          Austin
        </p>
      </div>
    </header>
  )
}
