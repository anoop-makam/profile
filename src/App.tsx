import { ContactSection } from '@/components/ContactSection'
import { PathSection } from '@/components/PathSection'
import { SiteHeader } from '@/components/SiteHeader'
import { SkillField } from '@/components/SkillField'
import { WorkSection } from '@/components/WorkSection'

export default function App() {
  return (
    <div className="relative">
      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <SiteHeader />
      <main>
        <SkillField />
        <WorkSection />
        <PathSection />
        <ContactSection />
      </main>
    </div>
  )
}
