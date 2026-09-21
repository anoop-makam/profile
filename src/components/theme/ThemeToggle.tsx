import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={(event) => toggleTheme({ x: event.clientX, y: event.clientY })}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
