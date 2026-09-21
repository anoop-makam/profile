export const categories = [
  { id: 'languages', label: 'Languages' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'backend', label: 'Backend' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'data', label: 'Data' },
  { id: 'devops', label: 'DevOps' },
  { id: 'observability', label: 'Observability' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'ai', label: 'AI' },
  { id: 'tools', label: 'Tools' },
  { id: 'methods', label: 'Methods' },
] as const

export type SkillCategory = (typeof categories)[number]['id']

export type SkillContext = {
  organization: string
  role?: string
  description: string
  year?: string
}

export type Skill = {
  id: string
  name: string
  category: SkillCategory
  weight: number
  contexts: SkillContext[]
  relatedSkills: string[]
}

export type JourneyType = 'education' | 'internship' | 'work' | 'teaching'

export type JourneyEvent = {
  id: string
  type: JourneyType
  organization: string
  title: string
  start?: string
  end?: string
  location?: string
  headline: string
  description: string
  skills: string[]
  indexLabel: string
  milestone?: string
}

export type SocialLink = {
  id: string
  label: string
  href: string
  hint: string
  external?: boolean
}
