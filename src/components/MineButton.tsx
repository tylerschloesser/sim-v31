import type { Updater } from 'use-immer'
import { MINE_RATE } from '@/constants'
import {
  isResourceEntity,
  isSelectEntityCursor,
  type AppState,
} from '@/types/state'
import { invariant } from '@/utils/invariant'

export interface MineButtonProps {
  state: AppState
  updateState: Updater<AppState>
}

export function MineButton({
  state,
  updateState,
}: MineButtonProps) {
  const selectedEntity = isSelectEntityCursor(state.cursor)
    ? state.entities[state.cursor.entityId]
    : null
  if (
    !selectedEntity ||
    !isResourceEntity(selectedEntity)
  ) {
    return null
  }
  return (
    <button
      className="pointer-events-auto py-2 px-4 border-white border relative"
      onClick={() => {
        updateState((draft) => {
          invariant(isSelectEntityCursor(draft.cursor))
          draft.cursor.mine += 1
        })
      }}
    >
      <span
        className="absolute inset-0 bg-green-400 origin-left opacity-50"
        style={{
          scale: `${selectedEntity.playerMineProgress / MINE_RATE} 1`,
        }}
      />
      <span className="relative">
        <span>Mine</span>
        {isSelectEntityCursor(state.cursor) &&
          state.cursor.mine > 1 && (
            <span> ({state.cursor.mine})</span>
          )}
      </span>
    </button>
  )
}
