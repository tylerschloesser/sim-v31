import { useEffect, useRef } from 'react'
import type { Updater } from 'use-immer'
import { TILE_SIZE } from '../constants'
import type { AppState } from '../types/state'
import { findClosestEntity } from '../utils/pointer'

const DRAG_THRESHOLD = 20 // pixels before movement triggers
const TAP_MAX_DURATION = 200 // ms - max time for a "tap" (down→up)
const DOUBLE_TAP_WINDOW = 300 // ms - max time between first tap end and second tap start

export function usePointerInput(
  updateState: Updater<AppState>,
): void {
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
      if (
        e.target instanceof HTMLElement &&
        e.target.closest('button')
      ) {
        return
      }

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
          draft.cursor = null
        })
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (startPos.current) {
        const start = startPos.current
        currentPos.current = { x: e.clientX, y: e.clientY }

        const deltaX =
          currentPos.current.x - startPos.current.x
        const deltaY =
          currentPos.current.y - startPos.current.y
        const distance = Math.sqrt(
          deltaX * deltaX + deltaY * deltaY,
        )

        if (isDoubleTapDrag.current) {
          updateState((draft) => {
            if (
              distance >= DRAG_THRESHOLD ||
              draft.pointer?.type === 'double-tap-drag'
            ) {
              draft.pointer = {
                type: 'double-tap-drag',
                dx: deltaX,
                dy: deltaY,
              }
            } else {
              draft.pointer = null
            }
          })
        } else {
          updateState((draft) => {
            if (
              distance >= DRAG_THRESHOLD ||
              draft.pointer?.type === 'single-tap-drag'
            ) {
              draft.pointer = {
                sx: start.x,
                sy: start.y,
                dx: deltaX,
                dy: deltaY,
                type: 'single-tap-drag',
              }
            } else {
              draft.pointer = null
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

      updateState((draft) => {
        if (draft.pointer?.type === 'double-tap-drag') {
          const targetPositionX =
            draft.player.position.x +
            draft.pointer.dx / TILE_SIZE
          const targetPositionY =
            draft.player.position.y +
            draft.pointer.dy / TILE_SIZE

          const closest = findClosestEntity(
            draft.entities,
            targetPositionX,
            targetPositionY,
          )
          if (closest) {
            draft.cursor = {
              type: 'select-entity',
              entityId: closest.entity.id,
              mine: 0,
            }
          }
        }

        draft.pointer = null
      })

      isDoubleTapDrag.current = false
      startPos.current = null
      currentPos.current = null
      pointerDownTime.current = null
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest('button')
      ) {
        return
      }
      e.preventDefault()
    }

    // prettier-ignore
    {
      document.addEventListener('touchstart', handleTouchStart, { passive: false })
      document.addEventListener('pointerdown', handlePointerDown)
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
      document.addEventListener('pointercancel', handlePointerUp)
    }

    // prettier-ignore
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [updateState])
}
