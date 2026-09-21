export function formatRange(start?: string, end?: string): string | undefined {
  if (!start && !end) return undefined
  const from = formatMonth(start)
  const to = end ? formatMonth(end) : start ? 'Present' : undefined
  if (from && to) return `${from} — ${to}`
  return from ?? to
}

function formatMonth(value?: string): string | undefined {
  if (!value) return undefined
  const [year, month] = value.split('-')
  if (!month) return year
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}
