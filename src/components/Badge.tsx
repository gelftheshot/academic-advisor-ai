import { ReactNode } from 'react'

import { tv } from 'tailwind-variants'

export interface BadgeProps {
  children: ReactNode
  content?: string | number | ReactNode
  variant?: 'standard' | 'dot'
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  overlap?: 'standard' | 'circular'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  max?: number
  min?: number
  className?: string
  onClick?(): void
}

const badge = tv({
  base: 'absolute z-[2] flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full px-[4px]',
  variants: {
    size: {
      xs: 'h-[15px] min-w-[15px] text-[.7rem]',
      sm: 'h-[20px] min-w-[20px] text-xs',
      md: 'h-[25px] min-w-[25px] text-sm',
      lg: 'h-[30px] min-w-[30px] text-md'
    },
    color: {
      primary: 'bg-primary-light dark:bg-primary-dark',
      secondary: 'bg-secondary-light dark:bg-secondary-dark',
      info: 'bg-info-light dark:bg-info-dark',
      success: 'bg-success-light dark:bg-success-dark',
      warning: 'bg-warning-light dark:bg-warning-dark',
      error: 'bg-error-light dark:bg-error-dark'
    },
    variant: {
      standard: '',
      dot: 'h-2 w-2 min-w-0'
    },
    overlap: {
      standard: 'right-0 top-0',
      circular: 'right-[14%] top-[14%]'
    }
  },
  defaultVariants: {
    variant: 'standard',
    color: 'primary',
    overlap: 'standard',
    size: 'sm'
  }
})

export function Badge({ children, content, variant, color, overlap, size, min, max, className, onClick }: BadgeProps) {
  let show = (content !== undefined && content !== null) || variant === 'dot'
  const contentAsNumber = Number(content)
  const isNumber = !isNaN(contentAsNumber)

  if (isNumber && contentAsNumber < (min ?? -Infinity)) {
    show = false
  } else if (isNumber && contentAsNumber > (max ?? Infinity)) {
    content = max + '+'
  }

  return (
    <div className="relative">
      {children}
      {show && (
        <span className={badge({ variant, color, overlap, size, className })} onClick={onClick}>
          {variant !== 'dot' && content}
        </span>
      )}
    </div>
  )
}
