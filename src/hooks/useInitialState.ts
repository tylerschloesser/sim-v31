import type { AppState } from '../types/state'

export function useInitialState(): AppState {
  const entities: AppState['entities'] = {}
  return {
    player: {
      position: { x: 0, y: 0 },
    },
    entities,
    doubleTapDrag: null,
  }
}
