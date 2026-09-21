export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="ambient-grid" />
      <div
        className="absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background: 'radial-gradient(closest-side, var(--glow), transparent 70%)',
        }}
      />
      <div className="grain" />
    </div>
  )
}
