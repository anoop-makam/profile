import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { journey } from '@/data/journey'
import { getSkill } from '@/data/skills'
import { formatRange } from '@/lib/dates'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

export function JourneyPage() {
  const reduce = useReducedMotion()
  const location = useLocation()
  const [active, setActive] = useState(journey[0]?.id ?? '')
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const nodes = journey
      .map((event) => itemRefs.current[event.id])
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id.replace('journey-', ''))
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!location.hash) return
    const node = document.getElementById(location.hash.slice(1))
    node?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }, [location.hash, reduce])

  const activeIndex = Math.max(
    0,
    journey.findIndex((event) => event.id === active),
  )
  const progress = journey.length <= 1 ? 1 : activeIndex / (journey.length - 1)

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav
        className="sticky top-24 hidden h-fit w-40 shrink-0 flex-col gap-1 lg:flex"
        aria-label="Journey index"
      >
        {journey.map((event, index) => (
          <button
            key={event.id}
            type="button"
            onClick={() => {
              itemRefs.current[event.id]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
            }}
            className={cn(
              'rounded-md px-2 py-1.5 text-left font-mono text-[10px] tracking-[0.16em] uppercase transition-colors',
              active === event.id ? 'text-foreground' : 'text-faint hover:text-muted-foreground',
            )}
          >
            {String(index + 1).padStart(2, '0')} {event.indexLabel}
          </button>
        ))}
      </nav>

      <div className="min-w-0 flex-1">
        <p className="mono-kicker">The path</p>
        <h1 className="mt-3 max-w-xl text-4xl tracking-tight sm:text-5xl">
          No overnight story.
          <span className="mt-2 block text-muted-foreground">Just one thing leading to another.</span>
        </h1>

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-[11px] w-px bg-border sm:left-[15px]" aria-hidden="true" />
          <motion.div
            className="absolute top-0 left-[11px] w-px origin-top bg-primary sm:left-[15px]"
            aria-hidden="true"
            style={{ height: '100%' }}
            animate={{ scaleY: reduce ? 1 : Math.max(0.08, progress) }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="space-y-16 sm:space-y-24">
            {journey.map((event, index) => {
              const range = formatRange(event.start, event.end)
              const tech = event.skills.map((id) => getSkill(id)).filter(Boolean)
              const isActive = event.id === active
              return (
                <li
                  key={event.id}
                  id={`journey-${event.id}`}
                  ref={(node) => {
                    itemRefs.current[event.id] = node
                  }}
                  className={cn(
                    'relative grid gap-4 pl-10 transition-opacity duration-300 sm:pl-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12',
                    isActive ? 'opacity-100' : 'opacity-55',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1.5 left-0 size-6 rounded-full border bg-background sm:size-8',
                      isActive ? 'border-primary' : 'border-border',
                    )}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="mono-kicker">
                      {String(index + 1).padStart(2, '0')} · {event.milestone ?? event.type}
                      {range ? ` · ${range}` : ''}
                    </p>
                    <h2 className="mt-2 text-2xl tracking-tight sm:text-3xl">{event.organization}</h2>
                    <p className="mt-1 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      {event.title}
                      {event.location ? ` · ${event.location}` : ''}
                    </p>
                    <p className="mt-4 text-lg text-foreground">{event.headline}</p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{event.description}</p>
                    {tech.length > 0 ? (
                      <div className="mt-5">
                        <p className="mono-kicker">Tech acquired</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {tech.map((skill) =>
                            skill ? (
                              <li key={skill.id}>
                                <Link
                                  to={`/?skill=${skill.id}`}
                                  className="inline-flex rounded-md border border-border bg-raised px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground hover:border-primary/40"
                                >
                                  {skill.name}
                                </Link>
                              </li>
                            ) : null,
                          )}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
