import type { Updater } from 'use-immer'
import type { AppState } from '../types/state'

const PLAYER_SPEED = 6 // tiles per second

interface GameLoopDeps {
  keyboard: { isPressed: (key: string) => boolean }
  pointer: {
    getDirection: () => { dx: number; dy: number }
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
      // Pointer/touch input
      const pointerDir = pointer.getDirection()
      dx += pointerDir.dx
      dy += pointerDir.dy
      speed = PLAYER_SPEED
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
