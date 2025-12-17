import { PLAYER_COLOR, TILE_SIZE } from '../constants'
import type { AppState } from '../types/state'
import { findClosestEntity } from '../utils/pointer'

interface TargetIndicatorProps {
  state: AppState
}

export function TargetIndicator({
  state,
}: TargetIndicatorProps) {
  if (state.pointer?.type !== 'double-tap-drag') {
    return null
  }

  // Target tile in world coordinates
  const targetPositionX =
    state.player.position.x + state.pointer.dx / TILE_SIZE
  const targetPositionY =
    state.player.position.y + state.pointer.dy / TILE_SIZE

  const closest = findClosestEntity(
    state.entities,
    targetPositionX,
    targetPositionY,
  )

  return (
    <>
      {closest && (
        <rect
          x={closest.entity.x * TILE_SIZE}
          y={closest.entity.y * TILE_SIZE}
          width={TILE_SIZE}
          height={TILE_SIZE}
          fill="none"
          stroke="yellow"
          strokeWidth={2}
        />
      )}
      <line
        x1={state.player.position.x * TILE_SIZE}
        y1={state.player.position.y * TILE_SIZE}
        x2={targetPositionX * TILE_SIZE}
        y2={targetPositionY * TILE_SIZE}
        stroke={PLAYER_COLOR}
        strokeWidth={2}
        opacity={0.5}
      />
    </>
  )
}
