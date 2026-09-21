import { profile } from '@/data/profile'
import type { SocialLink } from '@/types'

export const socials: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.linkedin,
    hint: 'Work history and recommendations',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${profile.email}`,
    hint: profile.email,
    external: false,
  },
]
