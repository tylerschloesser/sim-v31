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
import { type AppState } from './types/state'
import { MineButton } from '@/components/MineButton'

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
          &middot;
          <span>
            {Object.entries(state.player.inventory)
              .map(
                ([entityType, amount]) =>
                  `${entityType}:${amount}`,
              )
              .join(',')}
            {Object.keys(state.player.inventory).length ===
              0 && 'empty'}
          </span>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex justify-center p-2">
            <MineButton
              state={state}
              updateState={updateState}
            />
          </div>
        </div>
      </div>
    </>
  )
}
