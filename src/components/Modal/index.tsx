'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { handleClickOutside } from '@/utils/element'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'
import { ModalActions } from './ModalActions'
import { ModalContent } from './ModalContent'

interface ModalProps {
  children: ReactNode
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'fixed-sm' | 'fixed-md' | 'fixed-lg'
  fullScreen?: boolean
  onClose?(): void
}

const modal = tv({
  slots: {
    wrapper:
      'fixed inset-0 z-20 flex items-center justify-center bg-black/50 transition-[opacity] duration-[225ms] ease-in-out',
    header: 'flex justify-between gap-4 pl-6 text-xl',
    content: 'flex flex-col bg-light text-dark dark:bg-dark dark:text-light'
  },
  variants: {
    opacity: {
      0: { wrapper: 'opacity-0' },
      1: { wrapper: 'opacity-100' }
    },
    size: {
      sm: { content: 'max-w-[min(600px,calc(100%-64px))]' },
      md: { content: 'max-w-[min(1000px,calc(100%-64px))]' },
      lg: { content: 'max-w-[calc(100%-64px)]' },
      'fixed-sm': { content: 'w-[600px] max-w-[calc(100%-64px)]' },
      'fixed-md': { content: 'w-[1000px] max-w-[calc(100%-64px)]' },
      'fixed-lg': { content: 'w-[calc(100%-64px)]' }
    },
    fullScreen: {
      true: { content: 'h-full max-w-none w-full' },
      false: { content: 'max-h-[calc(100%-64px)] rounded' }
    },
    title: {
      true: { header: 'p-4' },
      false: { header: 'p-2' }
    }
  }
})

export function Modal({ children, open, title, onClose, size = 'sm', fullScreen = true }: ModalProps) {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(0)
  const { matches: isSmallScreen } = useMediaQuery({ size: 'sm' })
  const modalContentRef = useRef<any>(null)
  const { wrapper, header, content } = modal({ size, opacity, fullScreen: fullScreen && isSmallScreen, title: !!title })

  useEffect(() => {
    if (open) setVisible(true)
    setOpacity(open ? 1 : 0)
  }, [open])

  function handleTransitionEnd() {
    if (!open) setVisible(false)
  }

  if (!visible) return null
  return (
    <div
      data-test="modal"
      className={wrapper()}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClickOutside(modalContentRef, onClose)}
    >
      <div ref={modalContentRef} className={content()}>
        <div className={header()}>
          <div className="grow">{title}</div>
          <div>
            <IconButton icon={IoClose} onClick={onClose} size={24} className="bg-transparent p-0 shadow-none" />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.Content = ModalContent
Modal.Actions = ModalActions
