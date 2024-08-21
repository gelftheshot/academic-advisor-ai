'use client'

import { ConfirmationModal } from '@/components/Feedback/ConfirmationModal'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'

export function ConfirmationModalControl() {
  const { isOpen, title, question, onConfirm, onCancel } = useConfirmationModal()

  return <ConfirmationModal open={isOpen} title={title} question={question} onConfirm={onConfirm} onCancel={onCancel} />
}
