import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { categories, getSkill } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import type { Skill } from '@/types'

export function SkillDetail({
  skill,
  onClose,
  embedded = false,
}: {
  skill: Skill
  onClose: () => void
  embedded?: boolean
}) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const category = categories.find((item) => item.id === skill.category)?.label ?? skill.category
  const related = skill.relatedSkills.map((id) => getSkill(id)).filter((item): item is Skill => Boolean(item))

  useEffect(() => {
    closeRef.current?.focus()
  }, [skill.id])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.aside
        key={skill.id}
        role={embedded ? 'region' : 'dialog'}
        aria-modal={embedded ? undefined : true}
        aria-labelledby={titleId}
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduce ? undefined : { opacity: 0, x: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex h-full flex-col bg-surface/95 p-5 backdrop-blur-md sm:p-6',
          embedded ? 'border-0' : 'border-l border-border',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mono-kicker">
              {category}
              {skill.contexts[0] ? ` / ${skill.contexts[0].organization}` : ''}
            </p>
            <h2 id={titleId} className="mt-2 text-3xl tracking-tight sm:text-4xl">
              {skill.name}
            </h2>
          </div>
          <Button ref={closeRef} type="button" size="icon-sm" variant="ghost" onClick={onClose} aria-label="Close skill">
            <X />
          </Button>
        </div>

        <div className="mt-8 space-y-8 overflow-y-auto pr-1">
          <section>
            <h3 className="mono-kicker">How I used it</h3>
            <ul className="mt-3 space-y-4">
              {skill.contexts.map((context) => (
                <li key={`${context.organization}-${context.description}`}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{context.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 ? (
            <section>
              <h3 className="mono-kicker">Connected systems</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/?skill=${item.id}`}
                      className="inline-flex rounded-md border border-border bg-raised px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <h3 className="mono-kicker">Used at</h3>
            <ul className="mt-3 space-y-2">
              {skill.contexts.map((context) => (
                <li key={`${context.organization}-meta`} className="text-sm">
                  <p className="text-foreground">{context.organization}</p>
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {[context.role, context.year].filter(Boolean).join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
