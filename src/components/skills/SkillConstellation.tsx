import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skills, type SkillCategory } from '@/data/skills'
import { layoutConstellation, wrapLabel } from '@/lib/constellation'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import type { Skill } from '@/types'

export function SkillConstellation({
  filter,
  selectedId,
  onSelect,
}: {
  filter: 'all' | SkillCategory
  selectedId: string | null
  onSelect: (id: string | null) => void
}) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 800, height: 640 })
  const [hovered, setHovered] = useState<string | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = fieldRef.current
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect
      if (!box) return
      setSize({ width: box.width, height: Math.max(box.height, 480) })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const layouts = useMemo(
    () => layoutConstellation(skills, size.width, size.height, filter),
    [size.width, size.height, filter],
  )

  const byId = useMemo(() => new Map(layouts.map((node) => [node.id, node])), [layouts])
  const skillMap = useMemo(() => new Map(skills.map((skill) => [skill.id, skill])), [])

  const activeId = hovered ?? selectedId
  const active = activeId ? skillMap.get(activeId) : undefined
  const related = new Set(active?.relatedSkills ?? [])
  if (active) related.add(active.id)

  const edges = useMemo(() => {
    if (!active) return []
    return active.relatedSkills
      .map((id) => {
        const from = byId.get(active.id)
        const to = byId.get(id)
        if (!from || !to) return null
        return { id, from, to }
      })
      .filter((edge): edge is { id: string; from: (typeof layouts)[number]; to: (typeof layouts)[number] } =>
        Boolean(edge),
      )
  }, [active, byId])

  return (
      <div
        ref={fieldRef}
        className="relative min-h-[32rem] w-full overflow-hidden border border-border bg-surface/70 lg:min-h-[calc(100svh-12rem)]"
      >
        <svg className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
          {edges.map((edge) => (
            <motion.line
              key={edge.id}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--primary)"
              strokeWidth="1"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </svg>
        {skills.map((skill) => {
          const layout = byId.get(skill.id)
          if (!layout) return null
          const isActive = activeId === skill.id
          const isRelated = !activeId || related.has(skill.id)
          const filteredOut = filter !== 'all' && skill.category !== filter
          const prominence = isActive ? 1 : isRelated && !filteredOut ? 0.92 : 0.28
          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              x={layout.x}
              y={layout.y}
              r={layout.r}
              prominence={prominence}
              selected={selectedId === skill.id}
              reduce={reduce}
              onHover={setHovered}
              onSelect={onSelect}
            />
          )
        })}
      </div>
  )
}

function SkillNode({
  skill,
  x,
  y,
  r,
  prominence,
  selected,
  reduce,
  onHover,
  onSelect,
}: {
  skill: Skill
  x: number
  y: number
  r: number
  prominence: number
  selected: boolean
  reduce: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string | null) => void
}) {
  const lines = wrapLabel(skill.name)
  const size = r * 2

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={`${skill.name}. ${skill.contexts[0]?.description ?? ''}`}
      className={cn(
        'absolute top-0 left-0 flex items-center justify-center rounded-full border border-border bg-raised font-mono text-[10px] leading-[1.15] text-foreground',
        'focus-visible:z-10',
      )}
      style={{ width: size, height: size }}
      initial={false}
      animate={{
        x: x - r,
        y: y - r,
        scale: selected ? 1.08 : 1,
        opacity: prominence,
        zIndex: selected ? 8 : 1,
      }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }
      }
      onPointerEnter={() => onHover(skill.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(skill.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(selected ? null : skill.id)}
    >
      <span className="flex flex-col items-center px-1">
        {lines.map((line) => (
          <span key={line} className="block max-w-full truncate">
            {line}
          </span>
        ))}
      </span>
    </motion.button>
  )
}
