/** URL aliases for `/?skill=` — maps common names onto stable IDs. */
export const skillAliases: Record<string, string> = {
  opentelemetry: 'otel',
  csharp: 'csharp',
  'c#': 'csharp',
  postgresql: 'postgres',
  'github-actions': 'gha',
  actions: 'gha',
  'open-telemetry': 'otel',
  'synthetic-monitors': 'synthetics',
  synthetics: 'synthetics',
  slos: 'slo',
  'service-level-objectives': 'slo',
  'webhook-alerts': 'webhooks',
  'on-call': 'oncall',
  pagerduty: 'pagerduty',
  'hugging-face': 'huggingface',
  huggingface: 'huggingface',
  'deep-learning': 'deeplearning',
  'natural-language-processing': 'nlp',
  'neural-networks': 'neuralnets',
  'machine-learning': 'ml',
}

export function resolveSkillId(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  return skillAliases[key] ?? key
}
