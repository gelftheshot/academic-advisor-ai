'use client'

import { Spinner } from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-dark dark:text-light">
      <Spinner />
    </div>
  )
}
