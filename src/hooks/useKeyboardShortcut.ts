import { useEffect, useCallback } from 'react'

type KeyCombo = string | string[]
type Callback = (event: KeyboardEvent) => void

interface Options {
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useKeyboardShortcut(
  keyCombo: KeyCombo,
  callback: Callback,
  options: Options = {}
) {
  const {
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    preventDefault = true,
    stopPropagation = true,
  } = options

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(keyCombo) ? keyCombo : [keyCombo]
      const key = event.key.toLowerCase()

      const isKeyMatch = keys.some((k) => k.toLowerCase() === key)
      const isModifierMatch =
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.metaKey === metaKey

      if (isKeyMatch && isModifierMatch) {
        if (preventDefault) {
          event.preventDefault()
        }
        if (stopPropagation) {
          event.stopPropagation()
        }
        callback(event)
      }
    },
    [keyCombo, callback, ctrlKey, shiftKey, altKey, metaKey, preventDefault, stopPropagation]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

// Example usage:
/*
// Single key
useKeyboardShortcut('Escape', () => {
  console.log('Escape key pressed')
})

// Multiple keys
useKeyboardShortcut(['Enter', 'NumpadEnter'], () => {
  console.log('Enter key pressed')
})

// With modifiers
useKeyboardShortcut(
  's',
  () => {
    console.log('Save shortcut pressed')
  },
  {
    ctrlKey: true,
    preventDefault: true,
  }
)

// Complex shortcut
useKeyboardShortcut(
  'k',
  () => {
    console.log('Command + Shift + K pressed')
  },
  {
    metaKey: true,
    shiftKey: true,
  }
)

// Component example
function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false)

  useKeyboardShortcut(
    'k',
    () => {
      setIsOpen((prev) => !prev)
    },
    {
      metaKey: true,
    }
  )

  return (
    <div>
      {isOpen && (
        <div className="search-modal">
          <input type="text" placeholder="Search..." />
        </div>
      )}
    </div>
  )
}

// Multiple shortcuts in one component
function EditorComponent() {
  useKeyboardShortcut(
    's',
    () => {
      console.log('Save')
    },
    { ctrlKey: true }
  )

  useKeyboardShortcut(
    'z',
    () => {
      console.log('Undo')
    },
    { ctrlKey: true }
  )

  useKeyboardShortcut(
    'y',
    () => {
      console.log('Redo')
    },
    { ctrlKey: true }
  )

  return <div>Editor</div>
}
*/ 