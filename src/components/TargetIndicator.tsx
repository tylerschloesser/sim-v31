const TILE_SIZE = 32
const PLAYER_COLOR = '#38bdf8'

interface TargetIndicatorProps {
  screenCenterX: number
  screenCenterY: number
  playerPosition: { x: number; y: number }
  doubleTapDrag: { dx: number; dy: number }
}

export function TargetIndicator({
  screenCenterX,
  screenCenterY,
  playerPosition,
  doubleTapDrag,
}: TargetIndicatorProps) {
  // Target tile in world coordinates
  const targetTileX = Math.round(
    playerPosition.x + doubleTapDrag.dx / TILE_SIZE,
  )
  const targetTileY = Math.round(
    playerPosition.y + doubleTapDrag.dy / TILE_SIZE,
  )
  // Convert to screen coordinates (tile center relative to player)
  const rectScreenX =
    screenCenterX +
    (targetTileX - playerPosition.x) * TILE_SIZE -
    TILE_SIZE / 2
  const rectScreenY =
    screenCenterY +
    (targetTileY - playerPosition.y) * TILE_SIZE -
    TILE_SIZE / 2

  return (
    <>
      <rect
        x={rectScreenX}
        y={rectScreenY}
        width={TILE_SIZE}
        height={TILE_SIZE}
        fill="none"
        stroke={PLAYER_COLOR}
        strokeWidth={2}
      />
      <line
        x1={screenCenterX}
        y1={screenCenterY}
        x2={screenCenterX + doubleTapDrag.dx}
        y2={screenCenterY + doubleTapDrag.dy}
        stroke={PLAYER_COLOR}
        strokeWidth={2}
      />
    </>
  )
}
