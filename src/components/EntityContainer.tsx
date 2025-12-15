import React from 'react'
import { TILE_SIZE } from '../constants'
import type { Entity } from '../types/state'

export interface EntityContainerProps {
  entity: Entity
  selected: boolean
}

const PADDING = TILE_SIZE * 0.25

export const EntityContainer = React.memo(
  function EntityContainer({
    entity,
    selected,
  }: EntityContainerProps) {
    return (
      <g
        transform={`translate(${[entity.x * TILE_SIZE, entity.y * TILE_SIZE].join(' ')})`}
      >
        {selected && (
          <rect
            width={TILE_SIZE}
            height={TILE_SIZE}
            stroke="yellow"
            strokeWidth={2}
          />
        )}
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
