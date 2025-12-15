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
      <g
        transform={`translate(${[entity.x * TILE_SIZE, entity.y * TILE_SIZE].join(' ')})`}
      >
        <rect
          width={entity.width * TILE_SIZE}
          height={entity.height * TILE_SIZE}
          fill="green"
          stroke="brown"
          strokeWidth={2}
        />
      </g>
    )
  },
)
