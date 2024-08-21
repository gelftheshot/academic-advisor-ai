import { Button } from '../Buttons'
import { Modal } from '../Modal'

interface ConfirmationModalProps {
  open: boolean
  title?: string
  question?: string
  onConfirm?(): void
  onCancel?(): void
}

export function ConfirmationModal({ open, title, question, onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <Modal open={open} title={title} onClose={onCancel} fullScreen={false}>
      <Modal.Content>
        <p>{question}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </Modal.Actions>
    </Modal>
  )
}
