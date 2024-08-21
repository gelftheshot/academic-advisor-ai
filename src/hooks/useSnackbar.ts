import { SnackbarProps } from '@/components/Feedback/Snackbar'
import { create } from 'zustand'

interface OpenSnackbarProps {
  message: string
  type: SnackbarProps['type']
  position?: SnackbarProps['position']
  duration?: number
}

interface SnackbarState extends OpenSnackbarProps {
  isOpen: boolean
  open(props: OpenSnackbarProps): void
  close(): void
}

export const useSnackbar = create<SnackbarState>(set => ({
  isOpen: false,
  message: '',
  type: 'success',
  open: (props: OpenSnackbarProps) => set(() => open(props)),
  close: () => set(() => ({ isOpen: false }))
}))

function open({ message, type, position, duration }: OpenSnackbarProps) {
  return { isOpen: true, message, type, position, duration }
}
