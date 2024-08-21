'use client'

import { CSSProperties, useEffect, useState } from 'react'

import { Clouds } from './Clouds'
import { Stars } from './Stars'
import { Side, SunMoon } from './SunMoon'

interface DayNightSwitchProps {
  day?: boolean
  onDay?(): void
  onNight?(): void
  size?: number
}

export function DayNightSwitch({ day = true, onDay, onNight, size = 1 }: DayNightSwitchProps) {
  const [side, setSide] = useState<Side>('day')
  const bgColor = side === 'day' ? 'rgb(2, 132, 199)' : 'rgb(0, 0, 0)'
  const cloudBottom = side === 'day' ? '0' : '-100%'
  const starsBottom = side === 'day' ? '100%' : '0'
  const outerStyle: CSSProperties = {
    width: `calc(3.25rem * ${size})`,
    height: `calc(1.5rem * ${size})`,
    boxShadow: '0.2px 1px 0.8px -0.85px rgb(255, 255, 255), 0 -0.5px 1px 0 rgba(0, 0, 0, 0.6)'
  }
  const innerStyle: CSSProperties = {
    backgroundColor: bgColor
  }

  useEffect(() => {
    setSide(day ? 'day' : 'night')
  }, [day])

  function handleChange(side: Side) {
    setSide(side)
    if (side === 'day') {
      onDay?.()
    } else {
      onNight?.()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-full" style={outerStyle}>
      <div className="absolute inset-0 transition-[background-color] duration-500" style={innerStyle}>
        <SunMoon side={side} size={`calc(1.25rem * ${size})`} onClick={handleChange} />
        <Stars bottom={starsBottom} />
        <Clouds bottom={cloudBottom} />
      </div>
    </div>
  )
}
