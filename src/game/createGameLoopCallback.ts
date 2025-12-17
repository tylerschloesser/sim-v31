import type { Updater } from 'use-immer'
import type { AppState } from '../types/state'
import { invariant } from '../utils/invariant'

const PLAYER_SPEED = 6 // tiles per second

interface GameLoopDeps {
  keyboard: { isPressed: (key: string) => boolean }
  pointer: {
    getDirection: () => {
      dx: number
      dy: number
      distance: number
    }
  }
  updateState: Updater<AppState>
}

export function createGameLoopCallback(deps: GameLoopDeps) {
  const { keyboard, pointer, updateState } = deps

  return (deltaTime: number) => {
    let dx = 0
    let dy = 0

    // Keyboard input
    if (keyboard.isPressed('w')) dy -= 1
    if (keyboard.isPressed('s')) dy += 1
    if (keyboard.isPressed('a')) dx -= 1
    if (keyboard.isPressed('d')) dx += 1

    let speed
    if (dx === 0 && dy === 0) {
      // Pointer/touch input (clamped to 8 directions)
      const pointerDir = pointer.getDirection()
      if (pointerDir.distance > 0) {
        const angle = Math.atan2(
          pointerDir.dy,
          pointerDir.dx,
        )
        const snapped =
          Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
        dx = Math.cos(snapped)
        dy = Math.sin(snapped)
      }
      speed =
        pointerDir.distance > 0
          ? Math.pow(
              pointerDir.distance * 0.05 + 1,
              1.125,
            ) - 1
          : 0
      speed = Math.min(speed, PLAYER_SPEED * 10)
      invariant(speed >= 0, 'speed < 0')
    } else {
      speed = PLAYER_SPEED
    }

    if (dx === 0 && dy === 0) return

    const magnitude = Math.sqrt(dx * dx + dy * dy)
    dx /= magnitude
    dy /= magnitude

    const distance = speed * deltaTime

    updateState((draft) => {
      draft.player.position.x += dx * distance
      draft.player.position.y += dy * distance
    })
  }
}
