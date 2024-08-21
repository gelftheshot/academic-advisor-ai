import { CSSProperties } from 'react'

export interface RippleProps {
  top: number
  left: number
  size: number
  color?: CSSProperties['color']
}

export function Ripple({ top, left, size, color = 'white' }: RippleProps) {
  const style: CSSProperties = {
    top: `${top - size / 2}px`,
    left: `${left - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color
  }

  return (
    <span data-test="ripple" className="absolute scale-100 animate-ripple rounded-[50%] opacity-0" style={style}></span>
  )
}
