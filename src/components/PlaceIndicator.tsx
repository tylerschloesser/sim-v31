import type { AppState } from '@/types/state'

interface PlaceIndicatorProps {
  state: AppState
}
export function PlaceIndicator({
  state,
}: PlaceIndicatorProps) {
  void state
  return null
}
