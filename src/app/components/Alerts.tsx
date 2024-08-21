'use client'

import { useState } from 'react'

import { Alert, AlertProps } from '@/components/Alert'
import { Input } from '@/components/Input'
import { Select } from '@/components/Input/Select'

import { Component } from './Component'

const classNames = { auto: '', sm: 'w-40', md: 'w-64', lg: 'w-96' }

export function Alerts() {
  const [size, setSize] = useState<keyof typeof classNames>('auto')
  const [type, setType] = useState<AlertProps['type']>('success')
  const [message, setMessage] = useState('')
  const sizes = ['auto', 'sm', 'md', 'lg']
  const types = ['success', 'error', 'alert', 'info']

  return (
    <Component title="Alerts">
      <div className="flex max-w-full flex-col gap-2">
        <Alert message={message} type={type} onClose={() => setMessage('')} className={classNames[size]} />
        <div className="flex gap-1">
          <Input label="message" value={message} onChange={e => setMessage(e.target.value)} wrapperClassName="grow" />
          <Select label="size" onChange={e => setSize(e.target.value as any)}>
            {sizes.map(s => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <Select label="type" onChange={e => setType(e.target.value as any)}>
          {types.map(t => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </div>
    </Component>
  )
}
