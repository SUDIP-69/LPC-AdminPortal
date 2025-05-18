import { useState, useRef, useCallback, useEffect } from 'react'

interface TooltipOptions {
  delay?: number
  position?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  showArrow?: boolean
  onShow?: () => void
  onHide?: () => void
}

interface TooltipPosition {
  top: number
  left: number
  arrowPosition?: {
    top?: number
    left?: number
    transform?: string
  }
}

export function useTooltip(options: TooltipOptions = {}) {
  const {
    delay = 200,
    position = 'top',
    offset = 8,
    showArrow = true,
    onShow,
    onHide,
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
  })

  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>()

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    let top = 0
    let left = 0
    let arrowPosition = {}

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset + scrollTop
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2 + scrollLeft
        if (showArrow) {
          arrowPosition = {
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2 + scrollTop
        left = triggerRect.right + offset + scrollLeft
        if (showArrow) {
          arrowPosition = {
            left: -8,
            top: '50%',
            transform: 'translateY(-50%)',
          }
        }
        break
      case 'bottom':
        top = triggerRect.bottom + offset + scrollTop
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2 + scrollLeft
        if (showArrow) {
          arrowPosition = {
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2 + scrollTop
        left = triggerRect.left - tooltipRect.width - offset + scrollLeft
        if (showArrow) {
          arrowPosition = {
            right: -8,
            top: '50%',
            transform: 'translateY(-50%)',
          }
        }
        break
    }

    setTooltipPosition({ top, left, arrowPosition })
  }, [position, offset, showArrow])

  const show = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true)
      calculatePosition()
      onShow?.()
    }, delay)
  }, [delay, calculatePosition, onShow])

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
    onHide?.()
  }, [onHide])

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', calculatePosition)
      window.addEventListener('resize', calculatePosition)
    }
    return () => {
      window.removeEventListener('scroll', calculatePosition)
      window.removeEventListener('resize', calculatePosition)
    }
  }, [isVisible, calculatePosition])

  return {
    isVisible,
    tooltipPosition,
    triggerRef,
    tooltipRef,
    show,
    hide,
  }
}

// Example usage:
/*
function TooltipExample() {
  const { isVisible, tooltipPosition, triggerRef, tooltipRef, show, hide } = useTooltip({
    position: 'top',
    delay: 200,
    offset: 8,
    showArrow: true,
  })

  return (
    <div>
      <button ref={triggerRef} onMouseEnter={show} onMouseLeave={hide}>
        Hover me
      </button>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          className="tooltip"
        >
          Tooltip content
          {tooltipPosition.arrowPosition && (
            <div
              className="tooltip-arrow"
              style={tooltipPosition.arrowPosition}
            />
          )}
        </div>
      )}
    </div>
  )
}

// With custom content
function CustomTooltip() {
  const { isVisible, tooltipPosition, triggerRef, tooltipRef, show, hide } = useTooltip({
    position: 'right',
  })

  return (
    <div>
      <span ref={triggerRef} onMouseEnter={show} onMouseLeave={hide}>
        Help
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          className="tooltip"
        >
          <h3>Help Title</h3>
          <p>Detailed help content goes here</p>
          <button onClick={hide}>Got it</button>
        </div>
      )}
    </div>
  )
}

// With dynamic positioning
function DynamicTooltip() {
  const [position, setPosition] = useState<'top' | 'right' | 'bottom' | 'left'>('top')
  const { isVisible, tooltipPosition, triggerRef, tooltipRef, show, hide } = useTooltip({
    position,
  })

  const cyclePosition = () => {
    const positions: ('top' | 'right' | 'bottom' | 'left')[] = ['top', 'right', 'bottom', 'left']
    const currentIndex = positions.indexOf(position)
    const nextIndex = (currentIndex + 1) % positions.length
    setPosition(positions[nextIndex])
  }

  return (
    <div>
      <button ref={triggerRef} onMouseEnter={show} onMouseLeave={hide}>
        Hover me
      </button>
      <button onClick={cyclePosition}>Change Position</button>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          className="tooltip"
        >
          Tooltip on {position}
        </div>
      )}
    </div>
  )
}
*/ 