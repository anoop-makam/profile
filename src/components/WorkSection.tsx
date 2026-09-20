import { projects } from '@/data/portfolio'

export function WorkSection() {
  return (
    <section
      id="work"
      className="snap-section mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-10"
    >
      <p className="stealth-kicker">Selected work</p>
      <h2 className="mt-3 max-w-xl text-4xl tracking-[0.06em] text-foreground/90 sm:text-5xl">
        GM by day. Hawaiian before that.
      </h2>
      <ol className="mt-12 divide-y divide-primary/15 border-y border-primary/15">
        {projects.map((project) => (
          <li
            key={project.id}
            className="grid gap-4 py-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-12"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {project.kicker}
              </p>
              <h3 className="mt-2 text-3xl tracking-[0.05em]">{project.title}</h3>
              <p className="mt-2 font-mono text-xs tracking-[0.12em] text-primary uppercase">
                {project.org}
              </p>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {project.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
