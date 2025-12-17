export type EntityType = 'tree' | 'coal' | 'iron' | 'stone'

export interface Entity {
  id: string
  type: EntityType
  x: number
  y: number
  width: number
  height: number
  playerMineProgress: number
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

export interface EntitySelection {
  entityId: string
  mine: boolean
}

export interface AppState {
  tick: number
  player: {
    position: { x: number; y: number }
  }
  nextEntityId: number
  entities: Record<string, Entity>
  pointer:
    | SingleTapDragPointer
    | DoubleTapDragPointer
    | null
  selection: EntitySelection | null
}
