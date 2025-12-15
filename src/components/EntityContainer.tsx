import React from 'react'
import { TILE_SIZE } from '../constants'
import type { Entity } from '../types/state'

export interface EntityContainerProps {
  entity: Entity
}

const PADDING = TILE_SIZE * 0.25

export const EntityContainer = React.memo(
  function EntityContainer({
    entity,
  }: EntityContainerProps) {
    return (
      <g
        transform={`translate(${[entity.x * TILE_SIZE, entity.y * TILE_SIZE].join(' ')})`}
      >
        <rect
          x={PADDING}
          y={PADDING}
          width={entity.width * TILE_SIZE - PADDING * 2}
          height={entity.height * TILE_SIZE - PADDING * 2}
          fill="green"
          stroke="brown"
          strokeWidth={2}
        />
      </g>
    )
  },
)
