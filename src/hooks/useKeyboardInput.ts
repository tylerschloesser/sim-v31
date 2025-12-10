import { useEffect, useRef } from 'react'

interface KeyboardState {
  isPressed: (key: string) => boolean
}

export function useKeyboardInput(): KeyboardState {
  const pressedKeys = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key.toLowerCase())
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return {
    isPressed: (key: string) =>
      pressedKeys.current.has(key.toLowerCase()),
  }
}
