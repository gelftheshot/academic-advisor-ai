import { TextareaHTMLAttributes, forwardRef } from 'react'

import { tv } from 'tailwind-variants'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

const textarea = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none dark:bg-white'
})

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, wrapperClassName, className, ...rest },
  ref
) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <textarea ref={ref} className={textarea({ className })} {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
