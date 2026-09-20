import { ArrowDown, GitBranch } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
      <div>
        <Badge variant="outline" className="rounded-sm font-mono text-[11px] tracking-wide uppercase">
          GitHub Pages
        </Badge>
        <h1 className="mt-5 max-w-xl text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-[3.4rem]">
          Yes. GitHub Pages can deploy a site.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          This page is the working example. A push to main builds static files.
          GitHub hosts them on HTTPS. No application server, no database — a
          public URL for anything that compiles to HTML.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#deploy">
              Turn Pages on
              <ArrowDown />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#domain">Use anoopmakam.com</a>
          </Button>
        </div>
      </div>
      <PipelineCard />
    </section>
  )
}

function PipelineCard() {
  const stages = [
    { n: '01', label: 'Push', detail: 'main branch' },
    { n: '02', label: 'Build', detail: 'npm run build' },
    { n: '03', label: 'Host', detail: 'GitHub Pages' },
  ]

  return (
    <div className="rounded-xl border border-border bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 border-b border-border pb-3 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-[#c96b4a]" />
        <span className="size-2.5 rounded-full bg-[#c9a04a]" />
        <span className="size-2.5 rounded-full bg-[#6a9a62]" />
        <span className="ml-2 font-mono">username.github.io/repo</span>
      </div>
      <div className="mt-5 space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.n} className="flex items-stretch gap-3">
            <div className="flex w-10 flex-col items-center">
              <span className="font-mono text-[11px] text-primary">{stage.n}</span>
              {index < stages.length - 1 ? (
                <span className="mt-1 w-px flex-1 bg-border" />
              ) : null}
            </div>
            <div className="mb-1 flex-1 rounded-lg border border-border bg-background px-3 py-2.5">
              <p className="font-serif text-lg leading-none">{stage.label}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {stage.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <GitBranch className="size-3.5" />
        .github/workflows/pages.yml
      </p>
    </div>
  )
}
