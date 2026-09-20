import { path } from '@/data/portfolio'

export function PathSection() {
  return (
    <section
      id="path"
      className="snap-section mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-10"
    >
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        Path
      </p>
      <h2 className="mt-3 max-w-lg text-4xl tracking-tight sm:text-5xl">
        ASU, a radio stack, then GM.
      </h2>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {path.map((stop, index) => (
          <li
            key={stop.id}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <span className="font-mono text-[11px] text-primary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 text-2xl tracking-tight">{stop.label}</h3>
            <p className="mt-1 text-sm text-primary">{stop.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {stop.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
