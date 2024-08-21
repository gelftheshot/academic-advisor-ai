import { ReactNode } from 'react'

interface ModalActionsProps {
  children: ReactNode
}

export function ModalActions({ children }: ModalActionsProps) {
  return <div className="flex items-center justify-end gap-2 p-2">{children}</div>
}
