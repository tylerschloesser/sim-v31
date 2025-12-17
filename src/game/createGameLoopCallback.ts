import type { Updater } from 'use-immer'
import type { AppState } from '../types/state'
import { invariant } from '../utils/invariant'

const PLAYER_SPEED = 6 // tiles per second

interface GameLoopDeps {
  keyboard: { isPressed: (key: string) => boolean }
  stateRef: React.RefObject<AppState>
  updateState: Updater<AppState>
}

export function createGameLoopCallback(deps: GameLoopDeps) {
  const { keyboard, stateRef, updateState } = deps

  return (deltaTime: number) => {
    let dx = 0
    let dy = 0

    // Keyboard input
    if (keyboard.isPressed('w')) dy -= 1
    if (keyboard.isPressed('s')) dy += 1
    if (keyboard.isPressed('a')) dx -= 1
    if (keyboard.isPressed('d')) dx += 1

    let speed = 0
    if (
      dx === 0 &&
      dy === 0 &&
      stateRef.current.pointer?.type === 'single-tap-drag'
    ) {
      const { pointer } = stateRef.current
      const distance = Math.sqrt(
        pointer.dx * pointer.dx + pointer.dy * pointer.dy,
      )
      // Pointer/touch input (clamped to 8 directions)
      if (distance > 0) {
        const angle = Math.atan2(pointer.dy, pointer.dx)
        const snapped =
          Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
        dx = Math.cos(snapped)
        dy = Math.sin(snapped)

        speed = Math.min(
          Math.pow(distance * 0.05 + 1, 1.125) - 1,
          PLAYER_SPEED * 10,
        )
      }
    } else {
      speed = PLAYER_SPEED
    }

    invariant(speed >= 0, 'Speed must be non-negative')

    if ((dx === 0 && dy === 0) || speed === 0) return

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
