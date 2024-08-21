import { InputHTMLAttributes, forwardRef } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import { tv } from 'tailwind-variants'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  size?: number
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
}

const checkbox = tv({
  variants: {
    color: {
      primary: 'text-primary-light dark:text-primary-dark',
      secondary: 'text-secondary-light dark:text-secondary-dark',
      info: 'text-info-light dark:text-info-dark',
      success: 'text-success-light dark:text-success-dark',
      warning: 'text-warning-light dark:text-warning-dark',
      error: 'text-error-light dark:text-error-dark'
    }
  }
})

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = 24, color = 'primary', ...rest },
  ref
) {
  const CheckBox = rest.checked ? MdCheckBox : MdCheckBoxOutlineBlank

  return (
    <div className="relative w-fit">
      <CheckBox size={size} className={checkbox({ color })} />
      <input ref={ref} type="checkbox" className="absolute inset-0 cursor-pointer opacity-0" {...rest} />
    </div>
  )
})
