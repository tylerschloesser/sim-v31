import type { Updater } from 'use-immer'
import {
  isPlaceEntityCursor,
  type AppState,
} from '@/types/state'

export interface PlaceButtonProps {
  state: AppState
  updateState: Updater<AppState>
}
export function PlaceButton({
  state,
  updateState,
}: PlaceButtonProps) {
  void updateState
  if (!isPlaceEntityCursor(state.cursor)) {
    return null
  }
  return <button>Place</button>
}
