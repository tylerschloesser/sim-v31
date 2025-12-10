import { useCallback } from 'react'
import { useImmer } from 'use-immer'
import { useGameLoop } from './hooks/useGameLoop'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { usePointerInput } from './hooks/usePointerInput'

const TILE_SIZE = 32
const PLAYER_SPEED = 6 // tiles per second
const PLAYER_RADIUS = 16
const DOT_RADIUS = 2
const DOT_COLOR = '#475569'
const PLAYER_COLOR = '#38bdf8'
const BG_COLOR = '#0f172a'

interface AppState {
  player: {
    position: { x: number; y: number }
  }
}

export function App() {
  const [state, updateState] = useImmer<AppState>({
    player: {
      position: { x: 0, y: 0 },
    },
  })

  const keyboard = useKeyboardInput()
  const pointer = usePointerInput()

  const gameLoopCallback = useCallback(
    (deltaTime: number) => {
      let dx = 0
      let dy = 0

      // Keyboard input
      if (keyboard.isPressed('w')) dy -= 1
      if (keyboard.isPressed('s')) dy += 1
      if (keyboard.isPressed('a')) dx -= 1
      if (keyboard.isPressed('d')) dx += 1

      // Pointer/touch input
      const pointerDir = pointer.getDirection()
      dx += pointerDir.dx
      dy += pointerDir.dy

      if (dx === 0 && dy === 0) return

      const magnitude = Math.sqrt(dx * dx + dy * dy)
      dx /= magnitude
      dy /= magnitude

      const distance = PLAYER_SPEED * deltaTime

      updateState((draft) => {
        draft.player.position.x += dx * distance
        draft.player.position.y += dy * distance
      })
    },
    [keyboard, pointer, updateState],
  )

  useGameLoop(gameLoopCallback)

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
      <circle
        cx={screenCenterX}
        cy={screenCenterY}
        r={PLAYER_RADIUS}
        fill={PLAYER_COLOR}
      />
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
