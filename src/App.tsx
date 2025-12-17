import { useLatest } from 'ahooks'
import { useMemo } from 'react'
import { useImmer } from 'use-immer'
import { AppCanvas } from './components/AppCanvas'
import { createGameLoopCallback } from './game/createGameLoopCallback'
import { useGameLoop } from './hooks/useGameLoop'
import { useInitialState } from './hooks/useInitialState'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { usePointerInput } from './hooks/usePointerInput'
import type { AppState } from './types/state'

export function App() {
  const initialState = useInitialState()
  const [state, updateState] =
    useImmer<AppState>(initialState)
  const stateRef = useLatest(state)

  const keyboard = useKeyboardInput()
  usePointerInput(updateState)

  const gameLoopCallback = useMemo(
    () =>
      createGameLoopCallback({
        keyboard,
        stateRef,
        updateState,
      }),
    [keyboard, stateRef, updateState],
  )

  useGameLoop(gameLoopCallback)

  return <AppCanvas state={state} />
}
