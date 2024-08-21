'use client'

import { CSSProperties, ReactNode, useEffect, useState } from 'react'

export type Side = 'day' | 'night'

interface Positions {
  sun: {
    day: string
    night: string
  }
  moon: {
    day: string
    night: string
  }
}

interface SunMoonProps {
  side: Side
  size: string
  onClick?: (side: Side) => void
}

function getPositions(size: string) {
  return {
    sun: {
      day: '4.81%',
      night: `calc(95.19% - ${size})`
    },
    moon: {
      day: '105%',
      night: '0'
    }
  }
}

export function SunMoon({ side, size, onClick }: SunMoonProps) {
  const innerSunMoonStyle: CSSProperties = { boxShadow: 'inset 0.5px 0.8px 1.5px 0.8px rgba(0, 0, 0, 0.6)' }
  const [positions, setPositions] = useState<Positions>(getPositions(size))

  useEffect(() => {
    setPositions(getPositions(size))
  }, [size])

  function handleClick() {
    onClick?.(positions.moon[side] === '0' ? 'day' : 'night')
  }

  return (
    <div className="relative z-[2] flex h-full w-full items-center">
      <span className="absolute inset-0 rounded-full" style={innerSunMoonStyle}></span>
      <BaseSunMoon
        size={size}
        left={positions['sun'][side]}
        className="z-[1] flex cursor-pointer items-center justify-center overflow-hidden bg-yellow-400"
        onClick={handleClick}
      >
        <BaseSunMoon size={size} left={positions['moon'][side]} className="bg-gray-400">
          <MoonCircle size="35%" left="20%" bottom="24%" />
          <MoonCircle size="20%" left="44%" bottom="64%" />
          <MoonCircle size="20%" left="64%" bottom="24%" />
        </BaseSunMoon>
      </BaseSunMoon>
      <BaseSunMoon
        size={size}
        left={positions['sun'][side]}
        className="flex items-center justify-center"
        shadow={false}
      >
        <Light size="155%" />
        <Light size="225%" />
        <Light size="290%" />
      </BaseSunMoon>
    </div>
  )
}

interface BaseSunMoonProps {
  children: ReactNode
  size: string
  left: string
  className?: string
  onClick?: () => void
  shadow?: boolean
}

function BaseSunMoon({ children, size, left, className, onClick, shadow = true }: BaseSunMoonProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    left,
    boxShadow: shadow
      ? 'inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0.6px 0.6px 0.8px -0.3px rgb(255, 255, 255), 0.5px 1px 2px 0 rgba(0, 0, 0, 0.5)'
      : ''
  }

  return (
    <div
      className={`absolute rounded-[50%] transition-[left] duration-500 ease-in-out ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface MoonCircleProps {
  left: string
  bottom: string
  size: string
}

function MoonCircle({ size, left, bottom }: MoonCircleProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    left,
    bottom,
    boxShadow: 'inset -0.3px 0.5px 1px 0 rgba(0, 0, 0, 0.4)'
  }

  return <span className="absolute rounded-[50%] bg-[#6b7280]" style={style}></span>
}

interface LightProps {
  size: string
}

function Light({ size }: LightProps) {
  const style: CSSProperties = { width: size, height: size }

  return <span className="absolute -z-[2] rounded-[50%] bg-white bg-opacity-10" style={style}></span>
}
