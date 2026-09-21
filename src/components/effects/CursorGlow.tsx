import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!fine || reduce) return
    const node = ref.current
    if (!node) return

    let frame = 0
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0

    function onMove(event: PointerEvent) {
      tx = event.clientX
      ty = event.clientY
    }

    function tick() {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      if (node) {
        node.style.transform = `translate3d(${x - 220}px, ${y - 220}px, 0)`
      }
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [fine, reduce])

  if (!fine || reduce) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] size-[440px] rounded-full opacity-60"
      style={{
        background: 'radial-gradient(circle, var(--glow), transparent 68%)',
      }}
    />
  )
}
