import React from 'react'
import { TILE_SIZE } from '../constants'
import { ENTITY_CONFIGS, type Entity } from '../types/state'

export interface EntityContainerProps {
  entity: Entity
  selected: boolean
}

const PADDING = 4

export const EntityContainer = React.memo(
  function EntityContainer({
    entity,
    selected,
  }: EntityContainerProps) {
    const { fill, width, height } =
      ENTITY_CONFIGS[entity.type]
    return (
      <g
        transform={`translate(${[entity.x * TILE_SIZE, entity.y * TILE_SIZE].join(' ')})`}
      >
        {selected && (
          <rect
            width={TILE_SIZE * width}
            height={TILE_SIZE * height}
            stroke="yellow"
            strokeWidth={2}
          />
        )}
        <rect
          x={PADDING}
          y={PADDING}
          width={width * TILE_SIZE - PADDING * 2}
          height={height * TILE_SIZE - PADDING * 2}
          fill={fill}
          stroke="rgba(255, 255, 255, .5)"
          strokeWidth={2}
        />
      </g>
    )
  },
)
