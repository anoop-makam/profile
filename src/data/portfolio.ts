export const profile = {
  name: 'Anoop Makam',
  short: 'Anoop',
  title: 'Software engineer',
  location: 'Austin',
  company: 'General Motors',
  line: 'I build software that has to work after it ships — systems, real-time media, production code.',
  email: 'anoop1makam@gmail.com',
  github: 'https://github.com/anoop-makam',
  linkedin: 'https://www.linkedin.com/in/anoopnmakam',
}

export const eras = [
  { id: 'asu', label: 'ASU', years: 'CS' },
  { id: 'gdms', label: 'GDMS', years: 'Capstone' },
  { id: 'gm', label: 'GM', years: 'Now' },
  { id: 'now', label: 'Web', years: 'This site' },
] as const

export type EraId = (typeof eras)[number]['id']

export type Skill = {
  id: string
  label: string
  era: EraId
  weight: number
  when: string
  blurb: string
}

export const skills: Skill[] = [
  {
    id: 'cpp',
    label: 'C++',
    era: 'asu',
    weight: 1.15,
    when: 'ASU · systems',
    blurb:
      'Memory, data structures, and the kind of bugs you only get when you own the bytes. Still the language I reach for when the machine has to be explicit.',
  },
  {
    id: 'java',
    label: 'Java',
    era: 'gm',
    weight: 1.2,
    when: 'School → GM',
    blurb:
      'The workhorse across coursework and production. Services, tools, and the code that had to compile on Monday morning.',
  },
  {
    id: 'voip',
    label: 'VoIP',
    era: 'gdms',
    weight: 1.35,
    when: 'GDMS capstone',
    blurb:
      'Capstone with General Dynamics Mission Systems on Rescue 21. We rebuilt a media path with modern VoIP libraries so workstations, radios, and other endpoints could talk.',
  },
  {
    id: 'realtime',
    label: 'Real-time',
    era: 'gdms',
    weight: 1.2,
    when: 'GDMS capstone',
    blurb:
      'Recording, playback, conference control. Latency and dropouts are the product, not a ticket you file later.',
  },
  {
    id: 'media',
    label: 'Media',
    era: 'gdms',
    weight: 1.05,
    when: 'GDMS capstone',
    blurb:
      'A media services layer that had to slot into an existing radio communications system instead of living in a demo on a laptop.',
  },
  {
    id: 'testing',
    label: 'Test infra',
    era: 'gdms',
    weight: 0.95,
    when: 'GDMS capstone',
    blurb:
      'Operator workstation, radio simulator, recording and playback endpoints — enough harness to prove the media stack actually held.',
  },
  {
    id: 'systems',
    label: 'Systems',
    era: 'asu',
    weight: 1.1,
    when: 'ASU → GM',
    blurb:
      'How pieces fit: processes, protocols, failure modes. The interesting work is never one file.',
  },
  {
    id: 'gmprod',
    label: 'Production',
    era: 'gm',
    weight: 1.3,
    when: 'General Motors',
    blurb:
      'Software engineer at GM in Austin. The bar is it ships, it stays up, and it does not strand someone in a log file.',
  },
  {
    id: 'auto',
    label: 'Automotive',
    era: 'gm',
    weight: 1.15,
    when: 'General Motors',
    blurb:
      'Code adjacent to vehicles has a different gravity. Reliability is not a nice-to-have; it is the assignment.',
  },
  {
    id: 'react',
    label: 'React',
    era: 'now',
    weight: 1.05,
    when: 'This site',
    blurb:
      'This page. Interactive fields, not a PDF of a résumé. React, TypeScript, and a physics loop for the skill orbs.',
  },
  {
    id: 'ts',
    label: 'TypeScript',
    era: 'now',
    weight: 0.95,
    when: 'This site',
    blurb:
      'Types that keep a UI honest while it moves. The orbs, the scroll, the copy — one language across the surface.',
  },
  {
    id: 'git',
    label: 'Git',
    era: 'now',
    weight: 0.85,
    when: 'Always',
    blurb:
      'History you can ship. This site deploys from a push to main onto GitHub Pages.',
  },
]

export const projects = [
  {
    id: 'rescue21',
    kicker: '01 — Capstone',
    title: 'Rescue 21 media services',
    org: 'General Dynamics Mission Systems',
    body: 'ASU capstone with Colin Griffith, Matin Massoudi, Joshua Hula, and Preet Patel. We designed a VoIP media services layer for Rescue 21 — recording, playback, operator workstations, radio simulators, and a conference controller — and made it speak the existing system instead of replacing it wholesale.',
  },
  {
    id: 'gm',
    kicker: '02 — Now',
    title: 'Production software',
    org: 'General Motors · Austin',
    body: 'Software engineer at GM. Day-to-day is shipping code that has to survive the real world: reviews, failures, and the next release. Previously with the Arizona Innovation Center; I stayed with GM when that office closed.',
  },
  {
    id: 'site',
    kicker: '03 — This page',
    title: 'A site that moves',
    org: 'anoopmakam.com',
    body: 'A single-route React portfolio. Drag the skill field, scroll the rest. Static files, GitHub Pages, no server. The point is to show how I work, not to list every library I have ever imported.',
  },
]

export const path = [
  {
    id: 'asu',
    label: 'Arizona State',
    role: 'Computer Science',
    detail: 'Foundations, systems, and a capstone that had to talk to real radios.',
  },
  {
    id: 'gdms',
    label: 'GDMS',
    role: 'VoIP capstone',
    detail: 'Rescue 21 media path with General Dynamics Mission Systems.',
  },
  {
    id: 'az',
    label: 'GM Arizona',
    role: 'Innovation Center',
    detail: 'Office closed. The work did not — I continued with General Motors.',
  },
  {
    id: 'austin',
    label: 'GM Austin',
    role: 'Software engineer',
    detail: 'Production software. This is the current chapter.',
  },
]
