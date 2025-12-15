import type { AppState, Entity } from '../types/state'

export function useInitialState(): AppState {
  let nextEntityId = 0
  const entities: AppState['entities'] = {}

  function addEntity(entity: Omit<Entity, 'id'>) {
    const entityId = `${nextEntityId++}`
    entities[entityId] = { id: entityId, ...entity }
  }

  addEntity({
    x: 2,
    y: 2,
    width: 1,
    height: 1,
  })

  return {
    player: {
      position: { x: 0, y: 0 },
    },
    nextEntityId,
    entities,
    doubleTapDrag: null,
  }
}
