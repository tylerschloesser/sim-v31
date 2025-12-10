export interface AppState {
  player: {
    position: { x: number; y: number }
  }
  doubleTapDrag: { dx: number; dy: number } | null
}
