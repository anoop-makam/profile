import { capabilities, type Capability } from '@/data/content'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Capabilities() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-border bg-card/40"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
          01 — What it hosts
        </p>
        <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
          A static site, a docs set, or a root homepage.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          GitHub Pages serves files. Use it when the page can be built ahead of
          time. Skip it when you need sessions, a database, or a running server.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <CapabilityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ item }: { item: Capability }) {
  return (
    <Card className="gap-4 py-5 shadow-none">
      <CardHeader className="gap-3">
        <CapabilityMark kind={item.mark} />
        <Badge variant="secondary" className="rounded-sm font-mono text-[10px] uppercase">
          {item.kicker}
        </Badge>
        <CardTitle className="font-serif text-xl font-medium tracking-tight">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-[15px] leading-relaxed">
          {item.body}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

function CapabilityMark({ kind }: { kind: Capability['mark'] }) {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-[4.5rem]" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="70"
        height="46"
        rx="8"
        className="fill-secondary stroke-border"
      />
      {kind === 'home' ? (
        <>
          <rect x="12" y="14" width="48" height="22" rx="3" className="fill-background" />
          <path d="M18 28h12M18 22h22" className="stroke-primary" strokeWidth="2" />
        </>
      ) : null}
      {kind === 'docs' ? (
        <>
          <rect x="16" y="10" width="22" height="28" rx="2" className="fill-background stroke-border" />
          <rect x="30" y="14" width="22" height="28" rx="2" className="fill-card stroke-primary/40" />
          <path d="M36 22h10M36 27h8" className="stroke-foreground/50" strokeWidth="1.5" />
        </>
      ) : null}
      {kind === 'user' ? (
        <>
          <circle cx="36" cy="24" r="12" className="fill-background stroke-primary/50" />
          <path d="M24 24h24" className="stroke-primary" strokeWidth="1.5" />
          <path d="M36 12c4 4 4 20 0 24M36 12c-4 4-4 20 0 24" className="stroke-border" />
        </>
      ) : null}
    </svg>
  )
}
