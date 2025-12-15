import { useEffect, useRef } from 'react'
import type { Updater } from 'use-immer'
import type { AppState } from '../types/state'

interface PointerState {
  getDirection: () => { dx: number; dy: number }
}

const DRAG_THRESHOLD = 20 // pixels before movement triggers
const TAP_MAX_DURATION = 200 // ms - max time for a "tap" (down→up)
const DOUBLE_TAP_WINDOW = 300 // ms - max time between first tap end and second tap start

export function usePointerInput(
  updateState: Updater<AppState>,
): PointerState {
  const startPos = useRef<{ x: number; y: number } | null>(
    null,
  )
  const currentPos = useRef<{
    x: number
    y: number
  } | null>(null)
  const lastTapTime = useRef<number | null>(null)
  const pointerDownTime = useRef<number | null>(null)
  const isDoubleTapDrag = useRef(false)

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const now = Date.now()
      pointerDownTime.current = now
      startPos.current = { x: e.clientX, y: e.clientY }
      currentPos.current = { x: e.clientX, y: e.clientY }

      // Check if this is the second tap of a double-tap
      if (
        lastTapTime.current &&
        now - lastTapTime.current < DOUBLE_TAP_WINDOW
      ) {
        isDoubleTapDrag.current = true
        updateState((draft) => {
          draft.doubleTapDrag = { dx: 0, dy: 0 }
        })
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (startPos.current) {
        const start = startPos.current
        currentPos.current = { x: e.clientX, y: e.clientY }

        if (isDoubleTapDrag.current) {
          updateState((draft) => {
            draft.doubleTapDrag = {
              dx: e.clientX - start.x,
              dy: e.clientY - start.y,
            }
          })
        }
      }
    }

    const handlePointerUp = () => {
      const now = Date.now()

      // Check if this was a tap (short press)
      if (
        pointerDownTime.current &&
        now - pointerDownTime.current < TAP_MAX_DURATION &&
        !isDoubleTapDrag.current
      ) {
        lastTapTime.current = now
      } else {
        lastTapTime.current = null
      }

      // Reset double-tap drag
      if (isDoubleTapDrag.current) {
        updateState((draft) => {
          draft.doubleTapDrag = null
        })
      }
      isDoubleTapDrag.current = false

      startPos.current = null
      currentPos.current = null
      pointerDownTime.current = null
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
    }

    document.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: false,
      },
    )
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
        'touchstart',
        handleTouchStart,
      )
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
  }, [updateState])

  const getDirection = () => {
    // No movement during double-tap drag
    if (isDoubleTapDrag.current) {
      return { dx: 0, dy: 0 }
    }

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
