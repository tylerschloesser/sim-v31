export interface Entity {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export interface AppState {
  player: {
    position: { x: number; y: number }
  }
  nextEntityId: number
  entities: Record<string, Entity>
  doubleTapDrag: { dx: number; dy: number } | null
}
