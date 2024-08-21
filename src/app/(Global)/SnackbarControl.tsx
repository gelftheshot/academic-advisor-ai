'use client'

import { Snackbar } from '@/components/Feedback/Snackbar'
import { useSnackbar } from '@/hooks/useSnackbar'

export function SnackbarControl() {
  const { isOpen, message, type, position, duration, close } = useSnackbar()

  return (
    <Snackbar open={isOpen} message={message} type={type} onClose={close} position={position} duration={duration} />
  )
}
