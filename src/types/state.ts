export type EntityType =
  | 'tree'
  | 'coal'
  | 'iron'
  | 'stone'
  | 'furnace-placeholder'

interface EntityBase<T extends EntityType> {
  id: string
  type: T
  x: number
  y: number
  width: number
  height: number
}

interface ResourceEntityBase<
  T extends EntityType,
> extends EntityBase<T> {
  playerMineProgress: number
}

export type TreeEntity = ResourceEntityBase<'tree'>
export type CoalEntity = ResourceEntityBase<'coal'>
export type IronEntity = ResourceEntityBase<'iron'>
export type StoneEntity = ResourceEntityBase<'stone'>

export interface FurnacePlaceholderEntity extends EntityBase<'furnace-placeholder'> {}

export type Entity =
  | TreeEntity
  | CoalEntity
  | IronEntity
  | StoneEntity
  | FurnacePlaceholderEntity

export function isResourceEntity(
  entity: Entity,
): entity is
  | TreeEntity
  | CoalEntity
  | IronEntity
  | StoneEntity {
  return (
    entity.type === 'tree' ||
    entity.type === 'coal' ||
    entity.type === 'iron' ||
    entity.type === 'stone'
  )
}

export interface DoubleTapDragPointer {
  type: 'double-tap-drag'
  dx: number
  dy: number
}

export interface SingleTapDragPointer {
  type: 'single-tap-drag'
  sx: number
  sy: number
  dx: number
  dy: number
}

export interface SelectEntityCursor {
  type: 'select-entity'
  entityId: string
  mine: number
}

export function isSelectEntityCursor(
  cursor: Cursor | null,
): cursor is SelectEntityCursor {
  return cursor?.type === 'select-entity'
}

export interface PlaceEntityCursor {
  type: 'place-entity'
  entityType: EntityType
}

export type Cursor = SelectEntityCursor | PlaceEntityCursor

export type MissionName =
  | 'mine-5-stone'
  | 'mine-1-iron'
  | 'mine-1-coal'
  | 'smelt-1-iron-plate'

export type Inventory = Partial<Record<EntityType, number>>

export interface AppState {
  tick: number
  player: {
    inventory: Inventory
    position: { x: number; y: number }
  }
  nextEntityId: number
  entities: Record<string, Entity>
  pointer:
    | SingleTapDragPointer
    | DoubleTapDragPointer
    | null
  cursor: Cursor | null
}
