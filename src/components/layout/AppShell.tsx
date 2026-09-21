import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CommandPalette } from '@/components/command/CommandPalette'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { PageTransition } from '@/components/layout/PageTransition'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [palette, setPalette] = useState(false)
  const closePalette = useCallback(() => setPalette(false), [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey
      if (meta && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPalette((open) => !open)
        return
      }
      if (event.key === 'Escape') {
        setPalette(false)
        return
      }
      if (isTypingTarget(event.target) || palette) return
      if (event.key === '1') navigate('/')
      if (event.key === '2') navigate('/journey')
      if (event.key === '3') navigate('/connect')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, palette])

  return (
    <div className="relative flex min-h-svh flex-col">
      <AmbientBackground />
      <CursorGlow />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader onOpenCommand={() => setPalette(true)} />
      <main id="content" className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <CommandPalette open={palette} onClose={closePalette} />
    </div>
  )
}
