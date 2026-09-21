import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'am-theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void
  toggleTheme: (origin?: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f7f4' : '#050706')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  window.addEventListener('storage', onStoreChange)
  return () => {
    observer.disconnect()
    window.removeEventListener('storage', onStoreChange)
  }
}

function circleReveal(origin: { x: number; y: number }, next: Theme) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> }
  }
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme(next)
    return
  }
  const transition = doc.startViewTransition(() => applyTheme(next))
  void transition.ready.then(() => {
    const right = window.innerWidth - origin.x
    const bottom = window.innerHeight - origin.y
    const radius = Math.hypot(Math.max(origin.x, right), Math.max(origin.y, bottom))
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`],
      },
      {
        duration: 480,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme)

  const setTheme = useCallback((next: Theme, origin?: { x: number; y: number }) => {
    if (origin) circleReveal(origin, next)
    else applyTheme(next)
  }, [])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const current = readTheme()
      setTheme(current === 'dark' ? 'light' : 'dark', origin)
    },
    [setTheme],
  )

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
