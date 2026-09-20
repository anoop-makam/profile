import { cn } from 'cn'
import { Check, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { launchSteps, type StepId } from '@/data/content'

const STORAGE_KEY = 'pages-launch-checklist'

const emptyState = Object.fromEntries(
  launchSteps.map((step) => [step.id, false]),
) as Record<StepId, boolean>

function readChecklist(): Record<StepId, boolean> {
  if (typeof window === 'undefined') return { ...emptyState }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...emptyState }
    const parsed = JSON.parse(raw) as Partial<Record<StepId, boolean>>
    return { ...emptyState, ...parsed }
  } catch {
    return { ...emptyState }
  }
}

export function LaunchChecklist() {
  const [done, setDone] = useState<Record<StepId, boolean>>(readChecklist)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
  }, [done])

  const completed = launchSteps.filter((step) => done[step.id]).length
  const total = launchSteps.length
  const allDone = completed === total
  const noneDone = completed === 0

  function toggle(id: StepId) {
    setDone((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <section
      id="deploy"
      className="scroll-mt-20 border-t border-border bg-[#231f1a] text-[#f3ece1]"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#e0a07a] uppercase">
          03 — Deploy
        </p>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl text-[#f6f0e6] sm:text-4xl">
              Five steps from this repo to a live URL.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#cfc4b4] sm:text-base">
              Check them off here. Progress stays in this browser so you can
              come back after the workflow finishes.
            </p>
          </div>
          <p className="font-mono text-sm text-[#e0a07a]" aria-live="polite">
            {completed} / {total} complete
          </p>
        </div>

        {noneDone ? (
          <p className="mt-6 rounded-lg border border-dashed border-[#4a433a] bg-[#2b261f] px-4 py-3 text-sm text-[#cfc4b4]">
            Nothing checked yet. Start by creating the GitHub repository, then
            point Pages at GitHub Actions.
          </p>
        ) : null}

        {allDone ? (
          <p className="mt-6 rounded-lg border border-[#6a9a62]/50 bg-[#2f3a2c] px-4 py-3 text-sm text-[#dce8d4]">
            Pages is on from this side. Open the workflow run for the public
            URL, then share it.
          </p>
        ) : null}

        <ol className="mt-8 divide-y divide-[#3b342c] overflow-hidden rounded-xl border border-[#3b342c] bg-[#2b261f]">
          {launchSteps.map((step, index) => {
            const checked = done[step.id]
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  className="flex w-full items-start gap-4 px-4 py-4 text-left transition-colors hover:bg-[#322c24] sm:px-5"
                  aria-pressed={checked}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border',
                      checked
                        ? 'border-[#6a9a62] bg-[#6a9a62] text-[#1c2418]'
                        : 'border-[#6b6358] text-transparent',
                    )}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[11px] text-[#e0a07a]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-serif text-lg',
                          checked ? 'text-[#cfc4b4] line-through' : 'text-[#f6f0e6]',
                        )}
                      >
                        {step.title}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#b9ae9e]">
                      {step.detail}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className="border-[#5a5146] bg-transparent text-[#f3ece1] hover:bg-[#322c24] hover:text-[#f6f0e6]"
            onClick={() => setDone({ ...emptyState })}
            disabled={noneDone}
          >
            <RotateCcw />
            Reset checklist
          </Button>
        </div>
      </div>
    </section>
  )
}
