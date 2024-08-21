import { ReactNode, useState } from 'react'
import { IconType } from 'react-icons/lib'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { tv } from 'tailwind-variants'

import { Collapse } from './Collapse'

interface AccordionProps {
  children: ReactNode
  title: string
  icon?: IconType
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  expanded?: boolean
  wrapperClassName?: string
  className?: string
  onChange?(open: boolean): void
}

const accordion = tv({
  base: 'flex items-center justify-between p-4 text-lg cursor-pointer',
  slots: {
    wrapper: 'h-fit overflow-hidden',
    arrow: 'transition-[transform] duration-300'
  },
  variants: {
    open: {
      true: { arrow: 'rotate-180' },
      false: {}
    },
    color: {
      primary: { base: 'bg-primary-light dark:bg-primary-dark' },
      secondary: { base: 'bg-secondary-light dark:bg-secondary-dark' },
      info: { base: 'bg-info-light dark:bg-info-dark' },
      success: { base: 'bg-success-light dark:bg-success-dark' },
      warning: { base: 'bg-warning-light dark:bg-warning-dark' },
      error: { base: 'bg-error-light dark:bg-error-dark' }
    }
  }
})

export function Accordion({
  children,
  title,
  icon: Icon,
  color,
  expanded = false,
  wrapperClassName,
  className,
  onChange
}: AccordionProps) {
  const [open, setOpen] = useState(expanded)
  const { wrapper, base, arrow } = accordion({ open, color })

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      <div className={base({ className })} onClick={() => setOpen(prev => !prev)}>
        <div className="mr-4 flex gap-4">
          {Icon && <Icon size={24} />}
          {title}
        </div>
        <MdOutlineKeyboardArrowDown size={24} className={arrow()} />
      </div>
      <Collapse open={open} onChange={onChange}>
        {children}
      </Collapse>
    </div>
  )
}
