import { useLatest } from 'ahooks'
import { useMemo } from 'react'
import { useImmer } from 'use-immer'
import { AppCanvas } from './components/AppCanvas'
import { createGameLoopCallback } from './game/createGameLoopCallback'
import { useGameLoop } from './hooks/useGameLoop'
import { useInitialState } from './hooks/useInitialState'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { usePointerInput } from './hooks/usePointerInput'
import { useTicker } from './hooks/useTicker'
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
  useTicker(updateState)

  const width = window.innerWidth
  const height = window.innerHeight

  const selectedEntity = useMemo(
    () =>
      state.selectedEntityId
        ? state.entities[state.selectedEntityId]
        : null,
    [state],
  )

  return (
    <>
      <div className="absolute">
        <AppCanvas
          state={state}
          width={width}
          height={height}
        />
      </div>
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute top-0 font-mono text-xs">
          <span>{state.tick}</span>
          &middot;
          <span>
            {Math.floor(state.player.position.x)},
            {Math.floor(state.player.position.y)}
          </span>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex justify-center">
            {selectedEntity && (
              <button
                className="pointer-events-auto"
                onClick={() => {
                  console.log('TODO', selectedEntity.type)
                }}
              >
                Mine
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
