import { useLatest } from 'ahooks'
import { useEffect, useRef } from 'react'
import type { Updater } from 'use-immer'
import { TICK_DURATION } from '../constants'
import type { AppState } from '../types/state'

export function useTicker(updateState: Updater<AppState>) {
  const lastTickTime = useRef<number | null>(null)
  const updateStateRef = useLatest(updateState)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const callback = (currentTime: number) => {
      animationFrameRef.current =
        self.requestAnimationFrame(callback)

      if (lastTickTime.current === null) {
        lastTickTime.current = currentTime
        return
      }
      let deltaTime = currentTime - lastTickTime.current

      while (deltaTime >= TICK_DURATION) {
        deltaTime -= TICK_DURATION
        lastTickTime.current += TICK_DURATION
        updateStateRef.current((draft) => {
          draft.tick += 1
        })
      }
    }

    animationFrameRef.current =
      self.requestAnimationFrame(callback)

    return () => {
      if (animationFrameRef.current !== null) {
        self.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
}
