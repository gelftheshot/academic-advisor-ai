'use client'

import { useState } from 'react'

import { Button } from '@/components/Buttons'
import { SnackbarProps } from '@/components/Feedback/Snackbar'
import { Select } from '@/components/Input/Select'
import { useSnackbar } from '@/hooks/useSnackbar'

import { Component } from './Component'

export function Snackbars() {
  const { open: openSnackbar } = useSnackbar()
  const [type, setType] = useState<SnackbarProps['type']>('success')
  const [position, setPosition] = useState<SnackbarProps['position']>('left-bottom')
  const positions = ['left-bottom', 'right-bottom', 'mid-bottom', 'left-top', 'right-top', 'mid-top']
  const types = ['success', 'error', 'alert', 'info']

  function handleOpenSnackbar() {
    openSnackbar({ message: 'Snackbar message!', type, position })
  }

  return (
    <Component title="Snackbars">
      <div className="flex flex-col gap-2">
        <Button onClick={handleOpenSnackbar}>Open Snackbars</Button>
        <div className="flex gap-2">
          <Select label="type" onChange={e => setType(e.target.value as any)}>
            {types.map(t => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Select label="position" onChange={e => setPosition(e.target.value as any)}>
            {positions.map(p => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </div>
      </div>
    </Component>
  )
}
