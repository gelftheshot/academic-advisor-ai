'use client'

import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

export function Confetti() {
  const [confettiWidth, setConfettiWidth] = useState(0)
  const [confettiHeight, setConfettiHeight] = useState(0)

  useEffect(() => {
    function handleResize() {
      setConfettiWidth(document.body.clientWidth)
      setConfettiHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ReactConfetti
      width={confettiWidth}
      height={confettiHeight}
      recycle={false}
      numberOfPieces={800}
      tweenDuration={15000}
      gravity={0.15}
    />
  )
}
