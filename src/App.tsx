import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const SkillsPage = lazy(() =>
  import('@/pages/SkillsPage').then((module) => ({ default: module.SkillsPage })),
)
const JourneyPage = lazy(() =>
  import('@/pages/JourneyPage').then((module) => ({ default: module.JourneyPage })),
)
const ConnectPage = lazy(() =>
  import('@/pages/ConnectPage').then((module) => ({ default: module.ConnectPage })),
)

function Fallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
      Loading
    </div>
  )
}

const basename = import.meta.env.BASE_URL === './' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '')

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Fallback />}>
              <SkillsPage />
            </Suspense>
          ),
        },
        {
          path: 'journey',
          element: (
            <Suspense fallback={<Fallback />}>
              <JourneyPage />
            </Suspense>
          ),
        },
        {
          path: 'connect',
          element: (
            <Suspense fallback={<Fallback />}>
              <ConnectPage />
            </Suspense>
          ),
        },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: basename || '/' },
)

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
