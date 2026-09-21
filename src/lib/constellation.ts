import type { Skill, SkillCategory } from '@/types'

export type NodeLayout = {
  id: string
  x: number
  y: number
  r: number
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5))

export function layoutConstellation(
  items: Pick<Skill, 'id' | 'category' | 'weight'>[],
  width: number,
  height: number,
  filter: 'all' | SkillCategory,
): NodeLayout[] {
  const cx = width * 0.5
  const cy = height * 0.5
  const ring = Math.min(width, height) * 0.34
  const groups = new Map<SkillCategory, Pick<Skill, 'id' | 'category' | 'weight'>[]>()
  for (const item of items) {
    const list = groups.get(item.category) ?? []
    list.push(item)
    groups.set(item.category, list)
  }
  const cats = [...groups.keys()]
  const layouts: NodeLayout[] = []

  cats.forEach((category, catIndex) => {
    const members = groups.get(category) ?? []
    const angle = (catIndex / cats.length) * Math.PI * 2 - Math.PI / 2
    const clusterX = cx + Math.cos(angle) * ring
    const clusterY = cy + Math.sin(angle) * ring * 0.88
    const matching = filter === 'all' || filter === category
    const spread = Math.min(110, 28 + members.length * 7)

    members.forEach((item, index) => {
      const t = (index + 0.5) / Math.max(members.length, 1)
      const localR = Math.sqrt(t) * spread
      const localA = index * GOLDEN
      let x = clusterX + Math.cos(localA) * localR
      let y = clusterY + Math.sin(localA) * localR * 0.86
      if (matching && filter !== 'all') {
        x = x * 0.72 + cx * 0.28
        y = y * 0.72 + cy * 0.28
      } else if (filter !== 'all') {
        x = x * 1.06 - cx * 0.06
        y = y * 1.06 - cy * 0.06
      }
      const base = matching ? 16 + item.weight * 7 : 11
      layouts.push({
        id: item.id,
        x: clamp(x, 28, width - 28),
        y: clamp(y, 28, height - 28),
        r: base,
      })
    })
  })

  return layouts
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function wrapLabel(name: string): string[] {
  if (name.includes(' ')) return name.split(/\s+/u)
  const camel = name
    .replaceAll(/([a-z])([A-Z])/gu, '$1 $2')
    .replaceAll(/([A-Za-z])(\d)/gu, '$1 $2')
  if (camel !== name) return camel.split(' ')
  return [name]
}
