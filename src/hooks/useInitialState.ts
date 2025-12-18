import type { AppState, Entity } from '../types/state'

export function useInitialState(): AppState {
  let nextEntityId = 0
  const entities: AppState['entities'] = {}

  function addEntity(
    callback: (entityId: string) => Entity,
  ) {
    const entityId = `${nextEntityId++}`
    entities[entityId] = callback(entityId)
  }

  addEntity((id) => ({
    id,
    type: 'tree',
    x: 2,
    y: 2,
    width: 1,
    height: 1,
    playerMineProgress: 0,
  }))
  addEntity((id) => ({
    id,
    type: 'coal',
    x: -1,
    y: 3,
    width: 1,
    height: 1,
    playerMineProgress: 0,
  }))
  addEntity((id) => ({
    id,
    type: 'stone',
    x: -2,
    y: -3,
    width: 1,
    height: 1,
    playerMineProgress: 0,
  }))
  addEntity((id) => ({
    id,
    type: 'iron',
    x: 4,
    y: -3,
    width: 1,
    height: 1,
    playerMineProgress: 0,
  }))

  return {
    tick: 0,
    player: {
      inventory: {},
      position: { x: 0, y: 0 },
    },
    nextEntityId,
    entities,
    pointer: null,
    selection: null,
  }
}
