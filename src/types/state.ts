export interface AppState {
  player: {
    position: { x: number; y: number }
  }
  entities: Record<
    string,
    {
      id: string
      x: number
      y: number
      width: number
      height: number
    }
  >
  doubleTapDrag: { dx: number; dy: number } | null
}
