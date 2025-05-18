import { useCallback, useEffect } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }, [resolvedTheme, setTheme])

  const setSystemTheme = useCallback(() => {
    setTheme('system')
  }, [setTheme])

  useEffect(() => {
    // Add a class to the document element when the theme changes
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme || 'light')
  }, [resolvedTheme])

  return {
    theme: resolvedTheme as Theme,
    setTheme,
    toggleTheme,
    setSystemTheme,
    isSystemTheme: theme === 'system',
  }
}

// Example usage:
/*
const { theme, toggleTheme, setSystemTheme, isSystemTheme } = useTheme()

return (
  <div>
    <button onClick={toggleTheme}>
      Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
    <button onClick={setSystemTheme}>
      Use System Theme
    </button>
    <p>Current theme: {theme}</p>
    <p>Using system theme: {isSystemTheme ? 'Yes' : 'No'}</p>
  </div>
)
*/ 