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
    </>
  )
}
