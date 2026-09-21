import { Button } from '@/components/ui/button'
import { filters, type SkillCategory } from '@/data/skills'
import { cn } from '@/lib/utils'

type Filter = 'all' | SkillCategory

export function SkillFilters({
  value,
  onChange,
}: {
  value: Filter
  onChange: (value: Filter) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter skills by category">
      {filters.map((item) => {
        const id = item.id as Filter
        const active = value === id
        return (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={active ? 'secondary' : 'ghost'}
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={cn(
              'h-7 rounded-md px-2.5 font-mono text-[10px] tracking-[0.14em] uppercase',
              active && 'text-foreground',
            )}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
