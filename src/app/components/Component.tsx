'use client'

import { ReactNode } from 'react'

import { Accordion } from '@/components/Accordion'

interface ComponentProps {
  title: string
  children: ReactNode
}

export function Component({ title, children }: ComponentProps) {
  return (
    <Accordion title={title} wrapperClassName="rounded bg-primary-light/20">
      <div className="rounded p-2">
        <div className="flex h-full w-full items-center justify-center gap-1 rounded bg-light p-2 dark:bg-dark">
          {children}
        </div>
      </div>
    </Accordion>
  )
}
