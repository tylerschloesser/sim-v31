import type { SingleTapDragPointer } from '../types/state'

export interface JoystickContainerProps {
  pointer: SingleTapDragPointer
}

export function JoystickContainer({
  pointer,
}: JoystickContainerProps) {
  return (
    <>
      <circle
        cx={pointer.sx}
        cy={pointer.sy}
        r={32}
        fill="rgba(0, 0, 0, 0.5)"
      />
      <circle
        cx={pointer.sx + pointer.dx / 10}
        cy={pointer.sy + pointer.dy / 10}
        r={16}
        fill="rgba(255, 255, 255, 0.5)"
      />
    </>
  )
}
