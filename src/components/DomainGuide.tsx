import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { customDomain } from '@/data/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DnsRow = {
  type: string
  name: string
  value: string
}

const records: DnsRow[] = [
  ...customDomain.aRecords.map((value) => ({
    type: 'A',
    name: '@',
    value,
  })),
  ...customDomain.aaaaRecords.map((value) => ({
    type: 'AAAA',
    name: '@',
    value,
  })),
  {
    type: 'CNAME',
    name: 'www',
    value: customDomain.wwwCname,
  },
]

export function DomainGuide() {
  return (
    <section id="domain" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
          04 — Custom domain
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl sm:text-4xl">
          Use {customDomain.apex}. Do not proxy this site.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          GitHub Pages already speaks custom domains. After you buy the name,
          point DNS at GitHub and type the domain into Pages settings. TLS is
          free. A reverse proxy in front is extra moving parts and often breaks
          the certificate.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <FactCard
            kicker="Not free"
            title="Buy the .com"
            body="A real anoopmakam.com costs about $10 a year at a registrar such as Cloudflare or Porkbun. Hosting this site stays free."
          />
          <FactCard
            kicker="Better than a proxy"
            title="DNS to GitHub"
            body="Add the domain in Settings → Pages first, then create the A and AAAA records below. GitHub issues HTTPS once DNS matches."
          />
          <FactCard
            kicker="Skip"
            title="Orange-cloud / reverse proxy"
            body="Cloudflare proxy (orange cloud) or nginx in front of Pages often hides GitHub from Let’s Encrypt. Use DNS-only records."
          />
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl">DNS records</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Replace USERNAME with your GitHub username. Remove any leftover
                registrar A or CNAME records on @ and www.
              </p>
            </div>
            <Badge variant="outline" className="w-fit rounded-sm font-mono text-[10px] uppercase">
              {customDomain.apex}
            </Badge>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {records.map((row) => (
                <DnsRecord key={`${row.type}-${row.name}-${row.value}`} row={row} />
              ))}
            </ul>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            This repo publishes with GitHub Actions, so you set the custom
            domain in the GitHub UI. A CNAME file in the repo is ignored.
          </p>
        </div>
      </div>
    </section>
  )
}

function FactCard({
  kicker,
  title,
  body,
}: {
  kicker: string
  title: string
  body: string
}) {
  return (
    <Card className="gap-3 py-5 shadow-none">
      <CardHeader>
        <Badge variant="secondary" className="rounded-sm font-mono text-[10px] uppercase">
          {kicker}
        </Badge>
        <CardTitle className="font-serif text-xl font-medium tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-[15px] leading-relaxed">
          {body}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

function DnsRecord({ row }: { row: DnsRow }) {
  return (
    <li className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-sm">
        <span className="w-12 shrink-0 text-primary">{row.type}</span>
        <span className="w-10 shrink-0 text-muted-foreground">{row.name}</span>
        <span className="min-w-0 break-all text-foreground">{row.value}</span>
      </div>
      <CopyButton value={row.value} />
    </li>
  )
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="shrink-0 self-start sm:self-center"
      onClick={() => {
        void copy()
      }}
      aria-label={`Copy ${value}`}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
