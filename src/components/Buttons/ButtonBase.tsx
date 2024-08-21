'use client'

import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode, useState } from 'react'

import { tv } from 'tailwind-variants'
import { v4 as uuid } from 'uuid'

import { Ripple, RippleProps } from '../Ripple'
import { Spinner } from '../Spinner'

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  readOnly?: boolean
  rippleColor?: CSSProperties['color']
  disableRipple?: boolean
}

const button = tv({
  slots: {
    base: 'relative select-none shadow',
    ripple: 'absolute inset-0 overflow-hidden rounded-[inherit]',
    spinner: 'absolute inset-0 z-[1] flex items-center justify-center rounded'
  }
})

export function ButtonBase({
  children,
  loading,
  readOnly,
  rippleColor,
  disableRipple,
  type = 'button',
  className,
  onClick,
  ...rest
}: ButtonBaseProps) {
  const [ripples, setRipples] = useState<(RippleProps & { id: string })[]>([])
  const { base, ripple, spinner } = button()

  function addRipple(e: MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget as HTMLButtonElement
    const buttonRect = button.getBoundingClientRect()
    const top = Math.abs(e.clientY - buttonRect.top)
    const right = Math.abs(e.clientX - buttonRect.right)
    const bottom = Math.abs(e.clientY - buttonRect.bottom)
    const left = Math.abs(e.clientX - buttonRect.left)
    const hypotenuse = Math.sqrt(Math.max(top, bottom) ** 2 + Math.max(right, left) ** 2)
    const size = Math.max(top, right, bottom, left, hypotenuse) * 2
    const ripple = { id: uuid(), top, left, size, color: rippleColor }

    setRipples(prev => [...prev, ripple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id))
    }, 550)
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!disableRipple) addRipple(e)
    onClick?.(e)
  }

  return (
    <button onClick={handleClick} className={base({ className })} disabled={readOnly || loading} type={type} {...rest}>
      {children}
      {loading && (
        <div className={spinner()}>
          <Spinner className="p-1 opacity-20" color="black" />
        </div>
      )}
      {ripples.length > 0 && (
        <div className={ripple()}>
          {ripples.map(({ id, ...rest }) => (
            <Ripple key={id} {...rest} />
          ))}
        </div>
      )}
    </button>
  )
}
