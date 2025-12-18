import { useLatest } from 'ahooks'
import { useEffect, useRef } from 'react'
import type { Updater } from 'use-immer'
import { MINE_RATE, TICK_DURATION } from '../constants'
import {
  isResourceEntity,
  type AppState,
} from '../types/state'
import { invariant } from '../utils/invariant'
import { inventoryAdd } from '@/utils/inventory'

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
        updateStateRef.current(tick)
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

function tick(draft: AppState): void {
  draft.tick += 1

  if (draft.selection?.mine) {
    const selectedEntity =
      draft.entities[draft.selection.entityId]

    invariant(isResourceEntity(selectedEntity))
    invariant(selectedEntity.playerMineProgress >= 0)
    invariant(selectedEntity.playerMineProgress < MINE_RATE)

    selectedEntity.playerMineProgress += 1

    if (selectedEntity.playerMineProgress === MINE_RATE) {
      inventoryAdd(
        draft.player.inventory,
        selectedEntity.type,
      )
      selectedEntity.playerMineProgress = 0
      draft.selection.mine = Math.max(
        draft.selection.mine - 1,
        0,
      )
    }
  }
}
