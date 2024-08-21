'use client'

import { Skeleton } from '@/components/Skeleton'

import { Component } from './Component'

export function SkeletonComponent() {
  return (
    <Component title="Skeleton">
      <Skeleton className="h-20 w-full rounded" />
    </Component>
  )
}
