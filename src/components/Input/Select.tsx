import { SelectHTMLAttributes, forwardRef } from 'react'

import { tv } from 'tailwind-variants'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

const select = tv({
  base: 'w-full cursor-pointer rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none dark:bg-white'
})

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, label, error, wrapperClassName, className, ...rest },
  ref
) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <select ref={ref} className={select({ className })} {...rest}>
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
