import { useRef, type PointerEvent } from 'react'
import { ArrowUpRight, AtSign, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'
import type { SocialLink } from '@/types'

const icons = {
  email: AtSign,
  linkedin: UserRound,
}

export function ConnectPage() {
  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-between px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div>
        <p className="mono-kicker">Find me</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
          Let’s build something interesting.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          {profile.location}, Texas. {profile.title} at {profile.company}. MS AI · UT Austin.
        </p>
      </div>
      <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((item) => (
          <li key={item.id}>
            <SocialCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialCard({ item }: { item: SocialLink }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const Icon = item.id in icons ? icons[item.id as keyof typeof icons] : ArrowUpRight

  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    if (!fine || reduce) return
    const node = ref.current
    if (!node) return
    const box = node.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5
    node.style.transform = `perspective(800px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg) translate3d(${px * 6}px, ${py * 6}px, 0)`
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.16 }}
      className="group flex min-h-[9.5rem] flex-col justify-between rounded-lg border border-border bg-surface p-5 transition-[border-color] duration-150 hover:border-primary/35"
    >
      <div className="flex items-start justify-between">
        <Icon className="size-5 text-muted-foreground" />
        <ArrowUpRight className="size-4 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <div>
        <p className="text-xl tracking-tight">{item.label}</p>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground">{item.hint}</p>
      </div>
    </motion.a>
  )
}
