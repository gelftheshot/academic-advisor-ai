import { ReactNode } from 'react'

import { tv } from 'tailwind-variants'

interface ModalContentProps {
  children: ReactNode
  className?: string
}

const modalContent = tv({
  base: 'grow overflow-auto px-6 pb-5 pt-0 scrollbar scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]'
})

export function ModalContent({ children, className }: ModalContentProps) {
  return <div className={modalContent({ className })}>{children}</div>
}
