# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun` instead of `npm` for all commands
- `bun tsc -b` for type checking (project uses references, so `--noEmit` doesn't work)
- `bun run lint` / `bun run lint:fix` for ESLint
- `bun run format` to format with Prettier (run after code changes)
- Never run `bun run dev` yourself

## Architecture

SVG-based game with React 19, Vite, TypeScript, and Tailwind CSS 4.

**State**: Single `AppState` in `src/types/state.ts`, managed with `use-immer` in App.tsx. Hooks that need to trigger re-renders receive `updateState: Updater<AppState>`.

**Game Loop**: `useGameLoop` hook runs `requestAnimationFrame` loop, passes `deltaTime` (seconds) to callback.

**Input**:

- `useKeyboardInput`: tracks pressed keys via refs, returns `isPressed(key)`
- `usePointerInput`: handles touch/mouse drag for movement + double-tap detection, receives `updateState` to update `doubleTapDrag` state

**Rendering**: Player fixed at screen center, world grid translates around player. Positions stored in tile coordinates (not pixels).
