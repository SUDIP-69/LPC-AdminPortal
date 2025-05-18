import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    media.addEventListener('change', listener)

    // Clean up
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// Example usage:
/*
// Common breakpoints
const isMobile = useMediaQuery('(max-width: 640px)')
const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
const isDesktop = useMediaQuery('(min-width: 1025px)')

// Custom queries
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const isHover = useMediaQuery('(hover: hover)')

// Component example
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}

// Hook for common breakpoints
function useBreakpoints() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)')

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  }
}

// Usage of breakpoints hook
function ResponsiveLayout() {
  const { isMobile, isTablet, isDesktop } = useBreakpoints()

  if (isMobile) return <MobileLayout />
  if (isTablet) return <TabletLayout />
  if (isDesktop) return <DesktopLayout />
  return <LargeDesktopLayout />
}
*/ 