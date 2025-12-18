import { useLatest } from 'ahooks'
import { useMemo } from 'react'
import { useImmer, type Updater } from 'use-immer'
import { AppCanvas } from './components/AppCanvas'
import { MINE_RATE } from './constants'
import { createGameLoopCallback } from './game/createGameLoopCallback'
import { useGameLoop } from './hooks/useGameLoop'
import { useInitialState } from './hooks/useInitialState'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { usePointerInput } from './hooks/usePointerInput'
import { useTicker } from './hooks/useTicker'
import {
  isResourceEntity,
  type AppState,
} from './types/state'
import { invariant } from './utils/invariant'

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

interface MineButtonProps {
  state: AppState
  updateState: Updater<AppState>
}

function MineButton({
  state,
  updateState,
}: MineButtonProps) {
  const selectedEntity = state.cursor
    ? state.entities[state.cursor.entityId]
    : null
  if (
    !selectedEntity ||
    !isResourceEntity(selectedEntity)
  ) {
    return null
  }
  return (
    <button
      className="pointer-events-auto py-2 px-4 border-white border relative"
      onClick={() => {
        updateState((draft) => {
          invariant(draft.cursor)
          draft.cursor.mine += 1
        })
      }}
    >
      <span
        className="absolute inset-0 bg-green-400 origin-left opacity-50"
        style={{
          scale: `${selectedEntity.playerMineProgress / MINE_RATE} 1`,
        }}
      />
      <span className="relative">
        <span>Mine</span>
        {state.cursor && state.cursor.mine > 1 && (
          <span> ({state.cursor.mine})</span>
        )}
      </span>
    </button>
  )
}
