import type { DoubleTapDragPointer } from '../types/state'

const TILE_SIZE = 32
const PLAYER_COLOR = '#38bdf8'

interface TargetIndicatorProps {
  playerPosition: { x: number; y: number }
  pointer: DoubleTapDragPointer
}

export function TargetIndicator({
  playerPosition,
  pointer,
}: TargetIndicatorProps) {
  // Target tile in world coordinates
  const targetPositionX =
    playerPosition.x + pointer.dx / TILE_SIZE
  const targetPositionY =
    playerPosition.y + pointer.dy / TILE_SIZE

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
        x1={playerPosition.x * TILE_SIZE}
        y1={playerPosition.y * TILE_SIZE}
        x2={targetPositionX * TILE_SIZE}
        y2={targetPositionY * TILE_SIZE}
        stroke={PLAYER_COLOR}
        strokeWidth={2}
      />
    </>
  )
}
