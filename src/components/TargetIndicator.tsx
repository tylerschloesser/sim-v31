import { PLAYER_COLOR, TILE_SIZE } from '../constants'
import type { AppState } from '../types/state'

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

  const targetTileX = Math.floor(targetPositionX)
  const targetTileY = Math.floor(targetPositionY)

  return (
    <>
      <rect
        x={targetTileX * TILE_SIZE}
        y={targetTileY * TILE_SIZE}
        width={TILE_SIZE}
        height={TILE_SIZE}
        fill="none"
        stroke={PLAYER_COLOR}
        strokeWidth={2}
      />
      <line
        x1={state.player.position.x * TILE_SIZE}
        y1={state.player.position.y * TILE_SIZE}
        x2={targetPositionX * TILE_SIZE}
        y2={targetPositionY * TILE_SIZE}
        stroke={PLAYER_COLOR}
        strokeWidth={2}
      />
    </>
  )
}
