import React, { InputHTMLAttributes } from 'react'

import { tv } from 'tailwind-variants'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

const input = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none dark:bg-white'
})

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, type, wrapperClassName, className, ...rest },
  ref
) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <input ref={ref} type={type || 'text'} className={input({ className })} {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
