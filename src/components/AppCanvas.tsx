import {
  BG_COLOR,
  DOT_COLOR,
  DOT_RADIUS,
  PLAYER_COLOR,
  PLAYER_RADIUS,
  TILE_SIZE,
} from '../constants'
import type { AppState } from '../types/state'
import { EntityContainer } from './EntityContainer'
import { JoystickContainer } from './JoystickContainer'
import { TargetIndicator } from './TargetIndicator'

export interface AppCanvasProps {
  state: AppState
}

export function AppCanvas({ state }: AppCanvasProps) {
  const width = window.innerWidth
  const height = window.innerHeight
  const screenCenterX = width / 2
  const screenCenterY = height / 2

  const playerPixelX = state.player.position.x * TILE_SIZE
  const playerPixelY = state.player.position.y * TILE_SIZE

  const gridOffsetX =
    ((-playerPixelX + screenCenterX) % TILE_SIZE) -
    TILE_SIZE
  const gridOffsetY =
    ((-playerPixelY + screenCenterY) % TILE_SIZE) -
    TILE_SIZE

  const selectedEntity = state.selectedEntityId
    ? state.entities[state.selectedEntityId]
    : null

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: BG_COLOR }}
    >
      <defs>
        <pattern
          id="dot-grid"
          width={TILE_SIZE}
          height={TILE_SIZE}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${gridOffsetX}, ${gridOffsetY})`}
        >
          <circle
            cx={TILE_SIZE / 2}
            cy={TILE_SIZE / 2}
            r={DOT_RADIUS}
            fill={DOT_COLOR}
          />
        </pattern>
      </defs>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#dot-grid)"
      />
      <g
        transform={`translate(${
          screenCenterX +
          -state.player.position.x * TILE_SIZE
        } ${
          screenCenterY +
          -state.player.position.y * TILE_SIZE
        })`}
      >
        {Object.values(state.entities).map((entity) => (
          <EntityContainer
            key={entity.id}
            entity={entity}
            selected={state.selectedEntityId === entity.id}
          />
        ))}
        {selectedEntity && (
          <line
            x1={state.player.position.x * TILE_SIZE}
            y1={state.player.position.y * TILE_SIZE}
            x2={(selectedEntity.x + 0.5) * TILE_SIZE}
            y2={(selectedEntity.y + 0.5) * TILE_SIZE}
            stroke="yellow"
            strokeWidth={2}
          />
        )}
        <circle
          cx={state.player.position.x * TILE_SIZE}
          cy={state.player.position.y * TILE_SIZE}
          r={PLAYER_RADIUS}
          fill={PLAYER_COLOR}
        />
        {state.pointer?.type === 'double-tap-drag' && (
          <TargetIndicator
            playerPosition={state.player.position}
            pointer={state.pointer}
          />
        )}
      </g>
      {state.pointer?.type === 'single-tap-drag' && (
        <JoystickContainer pointer={state.pointer} />
      )}
      <text
        x={16}
        y={32}
        fill="#94a3b8"
        fontSize={14}
        fontFamily="monospace"
      >
        {Math.round(state.player.position.x)},{' '}
        {Math.round(state.player.position.y)}
      </text>
    </svg>
  )
}
