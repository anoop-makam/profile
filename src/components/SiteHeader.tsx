import { useEffect, useState } from 'react'
import { cn } from 'cn'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#contact', label: 'Contact' },
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#05060a]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <a href="#skills" className="font-mono text-xs tracking-[0.18em] uppercase">
          AM
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wide uppercase transition-colors sm:px-3',
                active === link.href.slice(1)
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
