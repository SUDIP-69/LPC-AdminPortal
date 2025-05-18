import { useCallback, useEffect, useRef, useState } from 'react'

interface UseKeyboardNavigationOptions {
  items: any[]
  onSelect?: (item: any, index: number) => void
  onNavigate?: (index: number) => void
  initialIndex?: number
  loop?: boolean
  orientation?: 'horizontal' | 'vertical' | 'grid'
  columns?: number
}

export function useKeyboardNavigation(options: UseKeyboardNavigationOptions) {
  const {
    items,
    onSelect,
    onNavigate,
    initialIndex = -1,
    loop = false,
    orientation = 'vertical',
    columns = 1,
  } = options

  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const containerRef = useRef<HTMLElement>(null)

  const navigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right' | 'home' | 'end') => {
      if (items.length === 0) return

      let newIndex = selectedIndex

      switch (direction) {
        case 'up':
          if (orientation === 'vertical') {
            newIndex = selectedIndex > 0 ? selectedIndex - 1 : loop ? items.length - 1 : 0
          } else if (orientation === 'grid') {
            newIndex = selectedIndex >= columns ? selectedIndex - columns : loop ? items.length - 1 : 0
          }
          break
        case 'down':
          if (orientation === 'vertical') {
            newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : loop ? 0 : items.length - 1
          } else if (orientation === 'grid') {
            newIndex = selectedIndex + columns < items.length ? selectedIndex + columns : loop ? 0 : items.length - 1
          }
          break
        case 'left':
          if (orientation === 'horizontal') {
            newIndex = selectedIndex > 0 ? selectedIndex - 1 : loop ? items.length - 1 : 0
          } else if (orientation === 'grid') {
            newIndex = selectedIndex % columns > 0 ? selectedIndex - 1 : loop ? selectedIndex + columns - 1 : selectedIndex
          }
          break
        case 'right':
          if (orientation === 'horizontal') {
            newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : loop ? 0 : items.length - 1
          } else if (orientation === 'grid') {
            newIndex = (selectedIndex + 1) % columns > 0 ? selectedIndex + 1 : loop ? selectedIndex - columns + 1 : selectedIndex
          }
          break
        case 'home':
          newIndex = 0
          break
        case 'end':
          newIndex = items.length - 1
          break
      }

      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex)
        onNavigate?.(newIndex)
      }
    },
    [items.length, selectedIndex, orientation, columns, loop, onNavigate]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          navigate('up')
          break
        case 'ArrowDown':
          e.preventDefault()
          navigate('down')
          break
        case 'ArrowLeft':
          e.preventDefault()
          navigate('left')
          break
        case 'ArrowRight':
          e.preventDefault()
          navigate('right')
          break
        case 'Home':
          e.preventDefault()
          navigate('home')
          break
        case 'End':
          e.preventDefault()
          navigate('end')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < items.length) {
            onSelect?.(items[selectedIndex], selectedIndex)
          }
          break
      }
    },
    [navigate, items, selectedIndex, onSelect]
  )

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    selectedIndex,
    containerRef,
    navigate,
  }
}

// Example usage:
/*
function ListExample() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
  const { selectedIndex, containerRef } = useKeyboardNavigation({
    items,
    onSelect: (item) => console.log('Selected:', item),
    orientation: 'vertical',
    loop: true,
  })

  return (
    <ul ref={containerRef} tabIndex={0} className="list">
      {items.map((item, index) => (
        <li
          key={item}
          className={index === selectedIndex ? 'selected' : ''}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

// Grid example
function GridExample() {
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
  const { selectedIndex, containerRef } = useKeyboardNavigation({
    items,
    onSelect: (item) => console.log('Selected:', item),
    orientation: 'grid',
    columns: 3,
    loop: true,
  })

  return (
    <div ref={containerRef} tabIndex={0} className="grid">
      {items.map((item, index) => (
        <div
          key={item}
          className={`grid-item ${index === selectedIndex ? 'selected' : ''}`}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

// Horizontal menu
function MenuExample() {
  const items = ['Home', 'About', 'Services', 'Contact']
  const { selectedIndex, containerRef } = useKeyboardNavigation({
    items,
    onSelect: (item) => console.log('Selected:', item),
    orientation: 'horizontal',
    loop: true,
  })

  return (
    <nav ref={containerRef} tabIndex={0} className="menu">
      {items.map((item, index) => (
        <a
          key={item}
          href="#"
          className={index === selectedIndex ? 'selected' : ''}
        >
          {item}
        </a>
      ))}
    </nav>
  )
}
*/ 