import type { AppState, Entity } from '../types/state'

export function useInitialState(): AppState {
  let nextEntityId = 0
  const entities: AppState['entities'] = {}

  function addEntity(entity: Omit<Entity, 'id'>) {
    const entityId = `${nextEntityId++}`
    entities[entityId] = { id: entityId, ...entity }
  }

  // prettier-ignore
  {
    addEntity({ type: 'tree', x: 2, y: 2, width: 1, height: 1, playerMineProgress: 0 })
    addEntity({ type: 'coal', x: -1, y: 3, width: 1, height: 1, playerMineProgress: 0 })
  }

  return {
    tick: 0,
    player: {
      position: { x: 0, y: 0 },
    },
    nextEntityId,
    entities,
    pointer: null,
    selection: null,
  }
}
