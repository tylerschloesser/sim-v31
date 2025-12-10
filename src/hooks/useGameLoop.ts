import { useEffect, useRef } from 'react'

export function useGameLoop(
  callback: (deltaTime: number) => void,
) {
  const callbackRef = useRef(callback)
  const previousTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const loop = (currentTime: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime =
          (currentTime - previousTimeRef.current) / 1000
        callbackRef.current(deltaTime)
      }
      previousTimeRef.current = currentTime
      animationFrameRef.current =
        requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
}
