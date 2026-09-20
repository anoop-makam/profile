export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Anoop · software engineer</p>
        <p className="font-mono text-xs">
          Static build · GitHub Pages · Vite
        </p>
      </div>
    </footer>
  )
}
