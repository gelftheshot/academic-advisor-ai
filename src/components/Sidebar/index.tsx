import { ReactNode, useEffect, useRef } from 'react'

import { useScrollbar } from '@/hooks/useScrollbar'
import { handleClickOutside } from '@/utils/element'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { SidebarAccordion } from './SidebarAccordion'
import { SidebarBody } from './SidebarBody'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarRoute } from './SidebarRoute'

interface SidebarProps {
  children: ReactNode
  open: boolean
  onClose(): void
  className?: string
  position?: 'left' | 'right'
  title?: string
  logo?: string
}

const sidebar = tv({
  slots: {
    bg: 'fixed z-10 bg-black/50 select-none',
    menu: 'fixed bottom-0 top-0 flex w-[90%] flex-col bg-light/90 text-dark backdrop-blur transition-[inset] dark:bg-dark/90 dark:text-light sm:w-96'
  },
  variants: {
    open: {
      true: { bg: 'inset-0' },
      false: {}
    },
    position: {
      left: {},
      right: {}
    }
  },
  compoundVariants: [
    { open: true, position: 'left', className: { menu: 'left-0' } },
    { open: false, position: 'left', className: { bg: '-left-full', menu: '-left-full' } },
    { open: true, position: 'right', className: { menu: 'right-0' } },
    { open: false, position: 'right', className: { bg: '-right-full', menu: '-right-full' } }
  ],
  defaultVariants: {
    open: false
  }
})

export function Sidebar({ children, open, onClose, className, position = 'left', title, logo }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { bg, menu } = sidebar({ open, position })

  useScrollbar({ disable: open })

  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div onClick={handleClickOutside(sidebarRef, onClose)} className={bg()}>
      <div ref={sidebarRef} className={menu({ className })}>
        <SidebarHeader title={title} logo={logo} reverse={position === 'right'} onClose={onClose} />
        {children}
      </div>
    </div>
  )
}

Sidebar.Body = SidebarBody
Sidebar.Accordion = SidebarAccordion
Sidebar.Route = SidebarRoute
Sidebar.Footer = SidebarFooter
