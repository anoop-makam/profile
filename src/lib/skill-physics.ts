export type Body = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  r: number
  restX: number
  restY: number
  dim: boolean
}

type Mouse = {
  x: number
  y: number
  inside: boolean
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5))

export function labelLines(label: string): string[] {
  if (label.includes(' ')) return label.split(/\s+/u)
  const camel = label
    .replaceAll(/([a-z])([A-Z])/gu, '$1 $2')
    .replaceAll(/([A-Za-z])(\d)/gu, '$1 $2')
  if (camel !== label) return camel.split(' ')
  return [label]
}

function radiusForLabel(label: string, weight: number, base: number): number {
  const lines = labelLines(label)
  const longest = Math.max(...lines.map((line) => line.length), 1)
  const char = Math.max(6.2, base * 0.34)
  const textW = longest * char
  const textH = lines.length * char * 1.45
  const inner = Math.max(textW, textH)
  const fromText = inner / 1.28 + 10
  return Math.max(base * 0.9 * weight, fromText / 2)
}

export function layoutBodies(
  items: { id: string; weight: number; label: string }[],
  width: number,
  height: number,
): Body[] {
  const cx = width * 0.52
  const cy = height * 0.5
  const maxR = Math.min(width, height) * 0.47
  const minDim = Math.min(width, height)
  const base = Math.max(18, Math.min(28, minDim * 0.036))

  return items.map((item, index) => {
    const t = (index + 0.4) / items.length
    const radius = Math.sqrt(t) * maxR
    const angle = index * GOLDEN
    const restX = cx + Math.cos(angle) * radius
    const restY = cy + Math.sin(angle) * radius * 0.86
    const r = radiusForLabel(item.label, item.weight, base)
    return {
      id: item.id,
      x: restX,
      y: restY,
      vx: 0,
      vy: 0,
      r,
      restX,
      restY,
      dim: false,
    }
  })
}

export function stepBodies(
  bodies: Body[],
  mouse: Mouse,
  dragId: string | null,
  width: number,
  height: number,
): void {
  const pad = 8

  for (let i = 0; i < bodies.length; i += 1) {
    const a = bodies[i]
    if (a.id === dragId) continue

    a.vx += (a.restX - a.x) * 0.018
    a.vy += (a.restY - a.y) * 0.018

    if (mouse.inside) {
      const dx = a.x - mouse.x
      const dy = a.y - mouse.y
      const distSq = dx * dx + dy * dy + 40
      const force = 1400 / distSq
      a.vx += (dx / Math.sqrt(distSq)) * force
      a.vy += (dy / Math.sqrt(distSq)) * force
    }

    for (let j = i + 1; j < bodies.length; j += 1) {
      const b = bodies[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const min = a.r + b.r + 8
      const dist = Math.hypot(dx, dy) || 0.001
      if (dist < min) {
        const overlap = (min - dist) / dist
        const nx = dx * overlap * 0.5
        const ny = dy * overlap * 0.5
        if (a.id !== dragId) {
          a.x -= nx
          a.y -= ny
          a.vx -= nx * 0.4
          a.vy -= ny * 0.4
        }
        if (b.id !== dragId) {
          b.x += nx
          b.y += ny
          b.vx += nx * 0.4
          b.vy += ny * 0.4
        }
      }
    }
  }

  for (const body of bodies) {
    if (body.id === dragId) {
      body.vx *= 0.4
      body.vy *= 0.4
      continue
    }
    body.vx *= 0.88
    body.vy *= 0.88
    const speed = Math.hypot(body.vx, body.vy)
    if (speed > 7) {
      body.vx = (body.vx / speed) * 7
      body.vy = (body.vy / speed) * 7
    }
    body.x += body.vx
    body.y += body.vy
    const minX = body.r + pad
    const maxX = width - body.r - pad
    const minY = body.r + pad
    const maxY = height - body.r - pad
    if (body.x < minX) {
      body.x = minX
      body.vx *= -0.55
    } else if (body.x > maxX) {
      body.x = maxX
      body.vx *= -0.55
    }
    if (body.y < minY) {
      body.y = minY
      body.vy *= -0.55
    } else if (body.y > maxY) {
      body.y = maxY
      body.vy *= -0.55
    }
  }
}
