import { useMemo, useState } from 'react'
import { notes, type NoteTopic } from '@/data/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const filters: { id: 'all' | NoteTopic; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'setup', label: 'Setup' },
  { id: 'urls', label: 'URLs' },
  { id: 'limits', label: 'Limits' },
]

const topicLabel: Record<NoteTopic, string> = {
  setup: 'Setup',
  urls: 'URLs',
  limits: 'Limits',
}

export function Notes() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')

  const visible = useMemo(
    () => (filter === 'all' ? notes : notes.filter((note) => note.topic === filter)),
    [filter],
  )

  return (
    <section id="notes" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
          02 — Notes
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-lg text-3xl sm:text-4xl">
            What to know before you publish.
          </h2>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter notes"
          >
            {filters.map((item) => (
              <Button
                key={item.id}
                type="button"
                size="sm"
                variant={filter === item.id ? 'default' : 'outline'}
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <p className="font-serif text-2xl">No notes in this slice.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another filter, or reset to all notes.
            </p>
            <Button className="mt-5" variant="outline" onClick={() => setFilter('all')}>
              Show all notes
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {visible.map((note) => (
              <Card key={note.id} className="gap-3 py-5 shadow-none">
                <CardHeader>
                  <Badge
                    variant="outline"
                    className="rounded-sm font-mono text-[10px] uppercase"
                  >
                    {topicLabel[note.topic]}
                  </Badge>
                  <CardTitle className="font-serif text-xl font-medium tracking-tight">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[15px] leading-relaxed text-muted-foreground">
                  {note.body}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
