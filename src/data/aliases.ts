/** URL aliases for `/?skill=` — maps common names onto stable IDs. */
export const skillAliases: Record<string, string> = {
  opentelemetry: 'otel',
  csharp: 'csharp',
  'c#': 'csharp',
  postgresql: 'postgres',
  'github-actions': 'gha',
  actions: 'gha',
  'open-telemetry': 'otel',
}

export function resolveSkillId(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  return skillAliases[key] ?? key
}
