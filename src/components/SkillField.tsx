import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from 'cn'
import { eras, skills, type EraId } from '@/data/portfolio'
import { layoutBodies, stepBodies, type Body } from '@/lib/skill-physics'
import { Button } from '@/components/ui/button'

const eraColor: Record<EraId, string> = {
  asu: '#7dd3fc',
  gdms: '#fbbf24',
  gm: '#c8f542',
  now: '#e879f9',
}

type Filter = 'all' | EraId

export function SkillField() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const bodiesRef = useRef<Body[]>([])
  const mouseRef = useRef({ x: 0, y: 0, inside: false })
  const dragRef = useRef<{ id: string; moved: boolean } | null>(null)
  const ignoreClickRef = useRef(false)
  const selectedRef = useRef<string | null>(null)
  const filterRef = useRef<Filter>('all')
  const reduceRef = useRef(false)

  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selected) ?? null,
    [selected],
  )

  useEffect(() => {
    selectedRef.current = selected
  }, [selected])

  useEffect(() => {
    filterRef.current = filter
    for (const body of bodiesRef.current) {
      const skill = skills.find((item) => item.id === body.id)
      body.dim = filter !== 'all' && skill?.era !== filter
    }
  }, [filter])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      reduceRef.current = media.matches
      setReduceMotion(media.matches)
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    function seed() {
      const node = fieldRef.current
      if (!node) return
      const width = node.clientWidth
      const height = node.clientHeight
      if (width < 40 || height < 40) return
      const previous = new Map(bodiesRef.current.map((body) => [body.id, body]))
      const next = layoutBodies(
        skills.map((skill) => ({ id: skill.id, weight: skill.weight })),
        width,
        height,
      )
      bodiesRef.current = next.map((body) => {
        const old = previous.get(body.id)
        const skill = skills.find((item) => item.id === body.id)
        return {
          ...body,
          x: old?.x ?? body.x,
          y: old?.y ?? body.y,
          vx: old?.vx ?? 0,
          vy: old?.vy ?? 0,
          dim: filterRef.current !== 'all' && skill?.era !== filterRef.current,
        }
      })
      paint()
      setReady(true)
    }

    function paint() {
      const width = fieldRef.current?.clientWidth ?? 0
      const height = fieldRef.current?.clientHeight ?? 0
      for (const body of bodiesRef.current) {
        const node = nodeRefs.current[body.id]
        if (!node) continue
        const scale = body.dim ? 0.72 : selectedRef.current === body.id ? 1.12 : 1
        node.style.transform = `translate3d(${body.x - body.r}px, ${body.y - body.r}px, 0) scale(${scale})`
        node.style.width = `${body.r * 2}px`
        node.style.height = `${body.r * 2}px`
        node.style.opacity = body.dim ? '0.28' : '1'
        node.style.zIndex = selectedRef.current === body.id ? '5' : '1'
      }
      const svg = svgRef.current
      if (!svg) return
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      const lines = svg.querySelectorAll('line')
      let lineIndex = 0
      const bodies = bodiesRef.current
      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
          const a = bodies[i]
          const b = bodies[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          const max = 150
          const line = lines[lineIndex]
          lineIndex += 1
          if (!line) continue
          if (dist > max || a.dim || b.dim) {
            line.setAttribute('opacity', '0')
            continue
          }
          line.setAttribute('x1', String(a.x))
          line.setAttribute('y1', String(a.y))
          line.setAttribute('x2', String(b.x))
          line.setAttribute('y2', String(b.y))
          line.setAttribute('opacity', String((1 - dist / max) * 0.35))
        }
      }
    }

    seed()
    const observer = new ResizeObserver(seed)
    observer.observe(field)

    let frame = 0
    function tick() {
      const node = fieldRef.current
      if (node && !reduceRef.current) {
        stepBodies(
          bodiesRef.current,
          mouseRef.current,
          dragRef.current?.id ?? null,
          node.clientWidth,
          node.clientHeight,
        )
        paint()
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)

    function onMove(event: PointerEvent) {
      const node = fieldRef.current
      if (!node) return
      const bounds = node.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const inside =
        x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height
      mouseRef.current = { x, y, inside }
      const drag = dragRef.current
      if (!drag) return
      const body = bodiesRef.current.find((item) => item.id === drag.id)
      if (!body) return
      const dx = x - body.x
      const dy = y - body.y
      if (Math.hypot(dx, dy) > 3) drag.moved = true
      body.x = Math.min(Math.max(x, body.r), bounds.width - body.r)
      body.y = Math.min(Math.max(y, body.r), bounds.height - body.r)
      body.vx = dx * 0.35
      body.vy = dy * 0.35
    }

    function onUp() {
      if (dragRef.current?.moved) ignoreClickRef.current = true
      dragRef.current = null
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const pairCount = (skills.length * (skills.length - 1)) / 2

  return (
    <section
      id="skills"
      className="snap-section relative flex flex-col overflow-hidden px-4 pb-8 pt-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 lg:grid lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.4fr)] lg:gap-10">
        <div className="relative z-10 flex max-w-md flex-col justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
              {profileKicker}
            </p>
            <h1 className="mt-3 text-[clamp(3.4rem,12vw,7.5rem)] leading-[0.82] tracking-[-0.07em]">
              Anoop
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Software engineer at General Motors in Austin. Drag the field.
              Click a skill to pin where it showed up.
            </p>
            <div
              className="mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter skills by era"
            >
              <FilterChip
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All
              </FilterChip>
              {eras.map((era) => (
                <FilterChip
                  key={era.id}
                  active={filter === era.id}
                  color={eraColor[era.id]}
                  onClick={() => setFilter(era.id)}
                >
                  {era.label}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="min-h-[8.5rem] rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            {selectedSkill ? (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {selectedSkill.when}
                  </p>
                  <Button
                    type="button"
                    size="xs"
                    variant="ghost"
                    onClick={() => setSelected(null)}
                  >
                    Clear
                  </Button>
                </div>
                <h2 className="mt-1 text-2xl tracking-tight">{selectedSkill.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedSkill.blurb}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                  Career field
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reduceMotion
                    ? 'Motion is off. Tap a skill to read where it landed in the work.'
                    : 'Nothing pinned. Drag an orb. Click to lock it. Filter by ASU, GDMS, GM, or this site.'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          ref={fieldRef}
          className="relative min-h-[28rem] flex-1 touch-none overflow-hidden rounded-[2rem] border border-white/10 bg-[#07080d]/70 sm:min-h-[34rem] lg:min-h-[calc(100svh-8rem)]"
        >
          {!ready ? (
            <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
              Seeding the field…
            </p>
          ) : null}
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
          >
            {Array.from({ length: pairCount }, (_, index) => (
              <line
                key={index}
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1"
                opacity="0"
              />
            ))}
          </svg>
          {skills.map((skill) => (
            <button
              key={skill.id}
              ref={(node) => {
                nodeRefs.current[skill.id] = node
              }}
              type="button"
              aria-pressed={selected === skill.id}
              aria-label={`${skill.label}, ${skill.when}`}
              className={cn(
                'absolute top-0 left-0 flex cursor-grab items-center justify-center rounded-full border px-1 text-center text-[10px] leading-[1.05] font-semibold tracking-tight text-[#07080d] select-none will-change-transform active:cursor-grabbing sm:text-xs',
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080d]',
                !ready && 'invisible',
              )}
              style={{
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 42%), ${eraColor[skill.era]}`,
                boxShadow: `0 0 32px ${eraColor[skill.era]}55`,
                borderColor: 'rgba(255,255,255,0.28)',
              }}
              onPointerDown={() => {
                dragRef.current = { id: skill.id, moved: false }
                ignoreClickRef.current = false
              }}
              onClick={() => {
                if (ignoreClickRef.current) {
                  ignoreClickRef.current = false
                  return
                }
                setSelected((current) => (current === skill.id ? null : skill.id))
              }}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        Scroll for work
      </p>
    </section>
  )
}

const profileKicker = 'Software engineer · GM · Austin'

function FilterChip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  color?: string
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? 'default' : 'outline'}
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border-white/15"
      style={
        active && color
          ? { background: color, color: '#07080d', borderColor: color }
          : undefined
      }
    >
      {color ? (
        <span
          className="size-1.5 rounded-full"
          style={{ background: active ? '#07080d' : color }}
        />
      ) : null}
      {children}
    </Button>
  )
}
