import { useRef, useCallback, useEffect } from 'react'

interface AnimationOptions {
  duration?: number
  easing?: (t: number) => number
  onUpdate?: (progress: number) => void
  onComplete?: () => void
}

export function useAnimation(options: AnimationOptions = {}) {
  const {
    duration = 300,
    easing = (t) => t,
    onUpdate,
    onComplete,
  } = options

  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const isAnimatingRef = useRef(false)

  const animate = useCallback(
    (from: number, to: number) => {
      if (isAnimatingRef.current) {
        cancelAnimationFrame(animationRef.current!)
      }

      isAnimatingRef.current = true
      startTimeRef.current = performance.now()

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTimeRef.current!
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easing(progress)
        const currentValue = from + (to - from) * easedProgress

        onUpdate?.(currentValue)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(update)
        } else {
          isAnimatingRef.current = false
          onComplete?.()
        }
      }

      animationRef.current = requestAnimationFrame(update)
    },
    [duration, easing, onUpdate, onComplete]
  )

  const stop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      isAnimatingRef.current = false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    animate,
    stop,
    isAnimating: isAnimatingRef.current,
  }
}

// Example usage:
/*
function AnimatedComponent() {
  const [value, setValue] = useState(0)
  const { animate, stop } = useAnimation({
    duration: 1000,
    easing: (t) => t * t, // Quadratic easing
    onUpdate: (progress) => setValue(progress),
    onComplete: () => console.log('Animation complete'),
  })

  return (
    <div>
      <div style={{ width: `${value * 100}%`, height: '20px', background: 'blue' }} />
      <button onClick={() => animate(0, 1)}>Animate</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

// With spring animation
function SpringAnimation() {
  const [position, setPosition] = useState(0)
  const { animate } = useAnimation({
    duration: 1000,
    easing: (t) => {
      // Spring-like easing
      return 1 - Math.cos((t * Math.PI) / 2)
    },
    onUpdate: (progress) => setPosition(progress * 100),
  })

  return (
    <div>
      <div
        style={{
          transform: `translateX(${position}px)`,
          width: '50px',
          height: '50px',
          background: 'red',
        }}
      />
      <button onClick={() => animate(0, 1)}>Spring</button>
    </div>
  )
}

// With multiple properties
function MultiPropertyAnimation() {
  const [style, setStyle] = useState({
    width: 0,
    height: 0,
    opacity: 0,
  })

  const { animate } = useAnimation({
    duration: 500,
    onUpdate: (progress) => {
      setStyle({
        width: progress * 100,
        height: progress * 100,
        opacity: progress,
      })
    },
  })

  return (
    <div>
      <div
        style={{
          ...style,
          background: 'green',
        }}
      />
      <button onClick={() => animate(0, 1)}>Animate All</button>
    </div>
  )
}
*/ 