import { useEffect, useRef } from 'react'

interface PointerState {
  getDirection: () => { dx: number; dy: number }
}

const DRAG_THRESHOLD = 20 // pixels before movement triggers

export function usePointerInput(): PointerState {
  const startPos = useRef<{ x: number; y: number } | null>(
    null,
  )
  const currentPos = useRef<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      startPos.current = { x: e.clientX, y: e.clientY }
      currentPos.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (startPos.current) {
        currentPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handlePointerUp = () => {
      startPos.current = null
      currentPos.current = null
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown,
    )
    document.addEventListener(
      'pointermove',
      handlePointerMove,
    )
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener(
      'pointercancel',
      handlePointerUp,
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
      )
      document.removeEventListener(
        'pointermove',
        handlePointerMove,
      )
      document.removeEventListener(
        'pointerup',
        handlePointerUp,
      )
      document.removeEventListener(
        'pointercancel',
        handlePointerUp,
      )
    }
  }, [])

  const getDirection = () => {
    if (!startPos.current || !currentPos.current) {
      return { dx: 0, dy: 0 }
    }

    const deltaX = currentPos.current.x - startPos.current.x
    const deltaY = currentPos.current.y - startPos.current.y
    const distance = Math.sqrt(
      deltaX * deltaX + deltaY * deltaY,
    )

    if (distance < DRAG_THRESHOLD) {
      return { dx: 0, dy: 0 }
    }

    // Return normalized direction (same as WASD produces)
    return {
      dx: deltaX / distance,
      dy: deltaY / distance,
    }
  }

  return { getDirection }
}
