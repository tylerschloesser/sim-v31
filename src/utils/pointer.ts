import type { AppState, Entity } from '../types/state'

export function findClosestEntity(
  entities: AppState['entities'],
  x: number,
  y: number,
): { entity: Entity; distance: number } | null {
  let closest: ReturnType<typeof findClosestEntity> = null

  for (const entity of Object.values(entities)) {
    const dx = entity.x + entity.width / 2 - x
    const dy = entity.y + entity.height / 2 - y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (closest === null || distance < closest.distance) {
      closest = { entity, distance }
    }
  }

  return closest
}
