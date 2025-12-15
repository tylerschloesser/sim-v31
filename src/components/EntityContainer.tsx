import React from 'react'
import { TILE_SIZE } from '../constants'
import type { Entity } from '../types/state'

export interface EntityContainerProps {
  entity: Entity
}

export const EntityContainer = React.memo(
  function EntityContainer({
    entity,
  }: EntityContainerProps) {
    return (
      <rect
        x={entity.x * TILE_SIZE}
        y={entity.y * TILE_SIZE}
        width={entity.width * TILE_SIZE}
        height={entity.height * TILE_SIZE}
        fill="green"
      />
    )
  },
)
