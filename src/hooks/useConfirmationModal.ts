import { create } from 'zustand'

interface OpenConfirmationModalProps {
  title?: string
  question?: string
  onConfirm?(): void
  onCancel?(): void
}

interface ConfirmationModalState extends OpenConfirmationModalProps {
  isOpen: boolean
  open(props: OpenConfirmationModalProps): void
  close(): void
}

export const useConfirmationModal = create<ConfirmationModalState>(set => ({
  isOpen: false,
  open: (props: OpenConfirmationModalProps) => set(state => open(state, props)),
  close: () => set(() => ({ isOpen: false }))
}))

function open({ close }: ConfirmationModalState, { title, question, onConfirm, onCancel }: OpenConfirmationModalProps) {
  const handleAction = (action?: () => void) => () => {
    close()
    action?.()
  }

  return { isOpen: true, title, question, onConfirm: handleAction(onConfirm), onCancel: handleAction(onCancel) }
}
