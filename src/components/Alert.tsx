import { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamation, FaInfoCircle, FaTimes } from 'react-icons/fa'
import { MdError } from 'react-icons/md'

import { tv } from 'tailwind-variants'

import { Collapse } from './Collapse'

export interface AlertProps {
  message: string
  type: 'success' | 'error' | 'alert' | 'info'
  className?: string
  onClose?(): void
}

const alert = tv({
  base: 'flex items-center gap-3 rounded-md p-4',
  variants: {
    type: {
      success: 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light',
      error: 'bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light',
      alert: 'bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light',
      info: 'bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light'
    }
  }
})

const iconMap = {
  success: <FaCheckCircle size={20} className="text-green-500 dark:text-green-300" />,
  error: <MdError size={20} className="text-red-500 dark:text-red-300" />,
  alert: <FaExclamation size={20} className="text-yellow-500 dark:text-yellow-300" />,
  info: <FaInfoCircle size={20} className="text-blue-500 dark:text-blue-200" />
}

export function Alert({ message, type, className, onClose }: AlertProps) {
  const [open, setOpen] = useState(!!message)

  useEffect(() => {
    setOpen(!!message)
  }, [message])

  function handleTransitionEnd() {
    if (!open) onClose?.()
  }

  return (
    <Collapse open={open} className={alert({ type, className })} onTransitionEnd={handleTransitionEnd}>
      <div>{iconMap[type]}</div>
      <p className="grow break-all">{message}</p>
      {onClose && (
        <div>
          <FaTimes className="cursor-pointer text-inherit" onClick={() => setOpen(false)} />
        </div>
      )}
    </Collapse>
  )
}
