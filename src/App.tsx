import { Capabilities } from '@/components/Capabilities'
import { DomainGuide } from '@/components/DomainGuide'
import { Hero } from '@/components/Hero'
import { LaunchChecklist } from '@/components/LaunchChecklist'
import { Notes } from '@/components/Notes'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export default function App() {
  return (
    <div id="top" className="min-h-svh">
      <SiteHeader />
      <main id="main">
        <Hero />
        <Capabilities />
        <Notes />
        <LaunchChecklist />
        <DomainGuide />
      </main>
      <SiteFooter />
    </div>
  )
}
