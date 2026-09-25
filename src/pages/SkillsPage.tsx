import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SkillConstellation } from '@/components/skills/SkillConstellation'
import { SkillDetail } from '@/components/skills/SkillDetail'
import { SkillFilters } from '@/components/skills/SkillFilters'
import { SkillHero } from '@/components/skills/SkillHero'
import { SkillMobileList } from '@/components/skills/SkillMobileList'
import { resolveSkillId } from '@/data/aliases'
import { getSkill, type SkillCategory } from '@/data/skills'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Filter = 'all' | SkillCategory

export function SkillsPage() {
  const [params, setParams] = useSearchParams()
  const desktop = useMediaQuery('(min-width: 960px)')
  const [filter, setFilter] = useState<Filter>('all')
  const requested = resolveSkillId(params.get('skill'))
  const selectedId = requested && getSkill(requested) ? requested : null

  const select = useCallback(
    (id: string | null) => {
      const next = new URLSearchParams(params)
      if (id) next.set('skill', id)
      else next.delete('skill')
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  useEffect(() => {
    if (requested && !getSkill(requested)) {
      const next = new URLSearchParams(params)
      next.delete('skill')
      setParams(next, { replace: true })
    }
  }, [requested, params, setParams])

  const selected = selectedId ? getSkill(selectedId) : undefined

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SkillHero />
        <SkillFilters value={filter} onChange={setFilter} />
      </div>

      {desktop ? (
        <div className="relative grid min-h-[32rem] grid-cols-1 overflow-hidden min-[960px]:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <SkillConstellation filter={filter} selectedId={selectedId} onSelect={select} />
          <div className="min-h-0 min-w-0">
            {selected ? <SkillDetail skill={selected} onClose={() => select(null)} /> : <EmptyHint />}
          </div>
        </div>
      ) : (
        <SkillMobileList
          filter={filter}
          selectedId={selectedId}
          onSelect={(id) => select(id)}
          onClose={() => select(null)}
        />
      )}
    </div>
  )
}

function EmptyHint() {
  return (
    <div className="hidden items-center border-l border-border px-6 text-sm text-muted-foreground min-[960px]:flex">
      Select a skill to see where it showed up.
    </div>
  )
}
