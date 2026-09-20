export const site = {
  name: 'Anoop',
  title: 'GitHub Pages can deploy a site.',
  description:
    'A static homepage that builds on every push and publishes to GitHub Pages.',
}

export type Capability = {
  id: string
  kicker: string
  title: string
  body: string
  mark: 'home' | 'docs' | 'user'
}

export const capabilities: Capability[] = [
  {
    id: 'project',
    kicker: 'Project site',
    title: 'A repo becomes a URL',
    body: 'This homepage is the usual case: a project site at username.github.io/repo. GitHub Actions builds the files, then Pages serves them.',
    mark: 'home',
  },
  {
    id: 'docs',
    kicker: 'Docs & notes',
    title: 'Anything that compiles to HTML',
    body: 'Vite, Next static export, Astro, Eleventy, or a folder of handwritten pages. Pages does not care how you built it — only that the artifact is static.',
    mark: 'docs',
  },
  {
    id: 'user',
    kicker: 'User or org site',
    title: 'A site at the root domain',
    body: 'A repository named username.github.io publishes at the root. Same workflow, no extra path. Custom domains point here too.',
    mark: 'user',
  },
]

export type NoteTopic = 'limits' | 'setup' | 'urls'

export type Note = {
  id: string
  topic: NoteTopic
  title: string
  body: string
}

export const notes: Note[] = [
  {
    id: 'static',
    topic: 'limits',
    title: 'Pages hosts files, not a server',
    body: 'HTML, CSS, JavaScript, images, and fonts. No Node process, no database, no API routes. If the page needs a backend, Pages is the wrong host.',
  },
  {
    id: 'actions',
    topic: 'setup',
    title: 'GitHub Actions is the deploy',
    body: 'The workflow in this repo installs, builds, and uploads dist/. In the repository, set Pages to “GitHub Actions” once. After that, a push to main is the release.',
  },
  {
    id: 'paths',
    topic: 'urls',
    title: 'Project sites live under a subpath',
    body: 'Assets in this build use relative URLs so they work at / and at /repo-name/. That is why the Vite base is set to ./ instead of a hardcoded repository name.',
  },
  {
    id: 'plans',
    topic: 'limits',
    title: 'Public is free; private needs a paid plan',
    body: 'GitHub Pages is included for public repositories. Publishing a private repo requires GitHub Pro, Team, or Enterprise.',
  },
  {
    id: 'domain',
    topic: 'urls',
    title: 'Custom domains are first-class',
    body: 'Point a DNS record at GitHub, then add the domain in Pages settings. HTTPS certificates are issued automatically.',
  },
  {
    id: 'jekyll',
    topic: 'setup',
    title: 'You do not have to use Jekyll',
    body: 'The classic branch-based publisher still runs Jekyll. This repo skips that path: Actions uploads a finished static build, and a .nojekyll file keeps GitHub from re-processing it.',
  },
]

export const launchSteps = [
  {
    id: 'repo',
    title: 'Create the GitHub repository',
    detail:
      'If this project is still local-only, create the repo from the Create repo control, then push.',
  },
  {
    id: 'source',
    title: 'Set Pages to GitHub Actions',
    detail:
      'Repository Settings → Pages → Build and deployment → Source: GitHub Actions.',
  },
  {
    id: 'push',
    title: 'Push to main',
    detail:
      'The workflow file lives at .github/workflows/pages.yml and runs on every push to main.',
  },
  {
    id: 'workflow',
    title: 'Wait for the workflow',
    detail:
      'Actions → Deploy to GitHub Pages. The build job produces dist/; the deploy job publishes it.',
  },
  {
    id: 'url',
    title: 'Open the Pages URL',
    detail:
      'GitHub prints the live URL on the workflow run. Project sites use https://<user>.github.io/<repo>/.',
  },
] as const

export type StepId = (typeof launchSteps)[number]['id']
