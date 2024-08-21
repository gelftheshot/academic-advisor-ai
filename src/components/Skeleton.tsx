import { tv } from 'tailwind-variants'

interface SkeletonProps {
  className?: string
}

const skeleton = tv({
  base: 'block animate-pulse bg-black opacity-20 dark:bg-white'
})

export function Skeleton({ className }: SkeletonProps) {
  return <span className={skeleton({ className })} />
}
