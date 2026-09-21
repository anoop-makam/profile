import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Compass, Footprints, Mail, Search } from 'lucide-react'
import { journey } from '@/data/journey'
import { skills } from '@/data/skills'
import { socials } from '@/data/socials'
import { cn } from '@/lib/utils'

type CommandItem = {
  id: string
  label: string
  hint: string
  to?: string
  href?: string
}

const staticCommands: CommandItem[] = [
  { id: 'nav-skills', label: 'Skills', hint: 'Route', to: '/' },
  { id: 'nav-journey', label: 'Journey', hint: 'Route', to: '/journey' },
  { id: 'nav-connect', label: 'Connect', hint: 'Route', to: '/connect' },
]

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const items = useMemo(() => {
    const skillItems: CommandItem[] = skills.map((skill) => ({
      id: `skill-${skill.id}`,
      label: skill.name,
      hint: 'Skill',
      to: `/?skill=${skill.id}`,
    }))
    const journeyItems: CommandItem[] = journey.map((event) => ({
      id: `journey-${event.id}`,
      label: event.organization,
      hint: event.title,
      to: `/journey#journey-${event.id}`,
    }))
    const socialItems: CommandItem[] = socials.map((item) => ({
      id: `social-${item.id}`,
      label: item.label,
      hint: 'Profile',
      href: item.href,
    }))
    const all = [...staticCommands, ...skillItems, ...journeyItems, ...socialItems]
    const q = query.trim().toLowerCase()
    if (!q) return all.slice(0, 12)
    return all.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(q)).slice(0, 20)
  }, [query])

  useEffect(() => {
    setIndex(0)
  }, [query, open])

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (index >= items.length) setIndex(0)
  }, [index, items.length])

  function run(item: CommandItem) {
    if (item.to) navigate(item.to)
    else if (item.href) window.open(item.href, item.href.startsWith('mailto:') ? '_self' : '_blank', 'noreferrer')
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setIndex((current) => (current + 1) % Math.max(items.length, 1))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setIndex((current) => (current - 1 + items.length) % Math.max(items.length, 1))
              } else if (event.key === 'Enter' && items[index]) {
                event.preventDefault()
                run(items[index])
              } else if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
              }
            }}
            placeholder="Search skills, journey, routes…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-faint"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-1" role="listbox">
          {items.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches.</li>
          ) : (
            items.map((item, itemIndex) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={itemIndex === index}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm',
                    itemIndex === index ? 'bg-raised text-foreground' : 'text-muted-foreground',
                  )}
                  onMouseEnter={() => setIndex(itemIndex)}
                  onClick={() => run(item)}
                >
                  <span className="flex items-center gap-2">
                    <CommandIcon hint={item.hint} />
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-wide uppercase">{item.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function CommandIcon({ hint }: { hint: string }) {
  if (hint === 'Profile') return <Mail className="size-3.5" />
  if (hint === 'Route') return <Compass className="size-3.5" />
  if (hint === 'Skill') return <ArrowUpRight className="size-3.5" />
  return <Footprints className="size-3.5" />
}
