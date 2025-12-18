import { TILE_SIZE } from '@/constants'
import {
  ENTITY_CONFIGS,
  isPlaceEntityCursor,
  type AppState,
} from '@/types/state'

interface PlaceIndicatorProps {
  state: AppState
}
export function PlaceIndicator({
  state,
}: PlaceIndicatorProps) {
  if (!isPlaceEntityCursor(state.cursor)) {
    return
  }
  const { fill, width, height } =
    ENTITY_CONFIGS[state.cursor.entityType]
  return (
    <rect
      x={state.cursor.position.x * TILE_SIZE}
      y={state.cursor.position.y * TILE_SIZE}
      width={width * TILE_SIZE}
      height={height * TILE_SIZE}
      fill={fill}
      opacity={0.5}
    />
  )
}
