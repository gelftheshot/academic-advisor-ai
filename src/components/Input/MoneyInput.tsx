'use client'

import { FocusEvent, forwardRef } from 'react'

import { formatMoney } from 'accounting'

import { Input, InputProps } from '.'

interface MoneyInputProps extends Omit<InputProps, 'type' | 'inputMode' | 'pattern'> {}

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { onBlur, placeholder = '$0.00', ...rest },
  ref
) {
  function formatCurrency(e: FocusEvent<HTMLInputElement>) {
    e.target.value = formatMoney(e.target.value)
    onBlur?.(e)
  }

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="decimal"
      pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
      placeholder={placeholder}
      onBlur={formatCurrency}
      {...rest}
    />
  )
})
