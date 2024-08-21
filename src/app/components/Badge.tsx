'use client'

import { useState } from 'react'
import { MdMail } from 'react-icons/md'

import { Badge } from '@/components/Badge'
import { IconButton } from '@/components/Buttons/IconButton'
import { Input } from '@/components/Input'

import { Component } from './Component'

export function BadgeComponent() {
  const [content, setContent] = useState<string>()
  const [max, setMax] = useState<number>(99)

  return (
    <Component title="Badge">
      <div>
        <div className="mb-4 flex gap-2">
          <Input
            label="badge content"
            wrapperClassName="w-2/3"
            onChange={e => setContent(e.target.value || undefined)}
          />
          <Input
            label="max"
            type="number"
            wrapperClassName="w-1/3"
            onChange={e => setMax(parseFloat(e.target.value) || 99)}
          />
        </div>
        <div className="flex items-center justify-center gap-4 rounded bg-indigo-200 py-2 text-black">
          <Badge variant="dot">
            <div className="h-10 w-10 rounded bg-slate-500"></div>
          </Badge>
          <div>
            <IconButton icon={MdMail} rippleColor="#2065D1" badge={{ content, max, className: 'text-white' }} />
          </div>
          <Badge variant="dot" overlap="circular">
            <div className="h-10 w-10 rounded-full bg-slate-500"></div>
          </Badge>
        </div>
      </div>
    </Component>
  )
}
