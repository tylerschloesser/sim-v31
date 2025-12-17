import React from 'react'
import { TILE_SIZE } from '../constants'
import type { Entity } from '../types/state'

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
    let fill: string
    switch (entity.type) {
      case 'tree': {
        fill = 'green'
        break
      }
      case 'coal': {
        fill = 'black'
        break
      }
      case 'iron': {
        fill = 'cyan'
        break
      }
      case 'stone': {
        fill = 'silver'
        break
      }
    }

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
          fill={fill}
          stroke="rgba(255, 255, 255, .5)"
          strokeWidth={2}
        />
      </g>
    )
  },
)
