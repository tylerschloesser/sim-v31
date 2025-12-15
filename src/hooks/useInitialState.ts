import type { AppState } from '../types/state'

export function useInitialState(): AppState {
  let nextEntityId = 0
  const entities: AppState['entities'] = {}
  return {
    player: {
      position: { x: 0, y: 0 },
    },
    nextEntityId,
    entities,
    doubleTapDrag: null,
  }
}
