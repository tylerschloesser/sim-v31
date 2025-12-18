import type { Updater } from 'use-immer'
import type { AppState } from '@/types/state'

export interface PlaceButtonProps {
  state: AppState
  updateState: Updater<AppState>
}
export function PlaceButton({
  state,
  updateState,
}: PlaceButtonProps) {
  void state
  void updateState
  return <button>Place</button>
}
