import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { categories, skills, type SkillCategory } from '@/data/skills'
import { SkillDetail } from '@/components/skills/SkillDetail'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import type { Skill } from '@/types'

export function SkillMobileList({
  filter,
  selectedId,
  onSelect,
  onClose,
}: {
  filter: 'all' | SkillCategory
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const grouped = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        items: skills.filter((skill) => skill.category === category.id),
      }))
      .filter((group) => group.items.length > 0)
      .filter((group) => filter === 'all' || group.id === filter)
  }, [filter])

  const [openId, setOpenId] = useState<string | null>(grouped[0]?.id ?? null)
  const selected = skills.find((skill) => skill.id === selectedId) ?? null

  return (
    <div className="space-y-2">
      {grouped.length === 0 ? (
        <p className="border border-border bg-surface px-4 py-8 text-sm text-muted-foreground">
          Nothing in this category yet.
        </p>
      ) : (
        grouped.map((group) => {
          const expanded = filter !== 'all' || openId === group.id
          return (
            <section key={group.id} className="overflow-hidden rounded-lg border border-border bg-surface">
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 font-mono text-[11px] tracking-[0.16em] uppercase"
                  aria-expanded={expanded}
                  onClick={() => setOpenId(openId === group.id ? null : group.id)}
                >
                  {group.label}
                  <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.ul
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden border-t border-border"
                  >
                    {group.items.map((skill) => (
                      <li key={skill.id} className="border-b border-border last:border-b-0">
                        <SkillRow skill={skill} selected={selectedId === skill.id} onSelect={onSelect} />
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </section>
          )
        })
      )}
      {selected ? (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <SkillDetail skill={selected} onClose={onClose} embedded />
        </div>
      ) : null}
    </div>
  )
}

function SkillRow({
  skill,
  selected,
  onSelect,
}: {
  skill: Skill
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(skill.id)}
      className={cn(
        'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm',
        selected ? 'bg-raised text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {skill.name}
      <span className="shrink-0 font-mono text-[10px] tracking-wide text-faint uppercase">
        {skill.contexts[0]?.organization}
      </span>
    </button>
  )
}
