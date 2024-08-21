'use client'

import { useState } from 'react'

import { Button } from '@/components/Buttons'

import { Component } from './Component'

export function SpinnerAndButton() {
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Component title="Spinner & Buttons">
      <Button onClick={handleClick} loading={loading} variant="text">
        Click
      </Button>
      <Button onClick={handleClick} loading={loading}>
        Click
      </Button>
      <Button onClick={handleClick} loading={loading} variant="outlined">
        Click
      </Button>
    </Component>
  )
}
