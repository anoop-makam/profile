import { profile } from '@/data/profile'

export function SkillHero() {
  return (
    <div className="max-w-xl">
      <p className="mono-kicker">{profile.kicker}</p>
      <h1 className="mt-4 text-[clamp(3.2rem,10vw,6.5rem)] leading-[0.86] tracking-[-0.05em]">
        {profile.short}
        <span className="mt-1 block text-[0.42em] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Makam
        </span>
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {profile.line} Hover a node to see what sits next to it. Click for how it was used.
      </p>
    </div>
  )
}
