import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/portfolio'
import { Button } from '@/components/ui/button'

const links = [
  { href: profile.linkedin, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, label: 'Email' },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section mx-auto flex w-full max-w-6xl flex-col justify-between px-4 py-24 sm:px-6 lg:px-10"
    >
      <div>
        <p className="stealth-kicker">Contact</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-[0.08em] text-foreground/90">
          Reach.
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          Austin. Software engineer at GM. MS in AI at UT Austin. LinkedIn or
          email.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {links.map((link) => (
            <Button
              key={link.href}
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-primary/25 font-mono text-xs tracking-[0.18em] uppercase"
            >
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight />
              </a>
            </Button>
          ))}
        </div>
      </div>
      <footer className="mt-24 flex flex-col gap-2 border-t border-primary/15 pt-6 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:flex-row sm:justify-between">
        <p>Anoop Makam</p>
        <p>Low signature · React · Pages</p>
      </footer>
    </section>
  )
}
