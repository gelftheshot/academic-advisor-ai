import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

const button = tv({
  base: 'rounded px-4 py-2 font-bold focus:outline-none text-white',
  variants: {
    variant: {
      text: 'text-primary-light hover:bg-primary-light/20 dark:hover:bg-primary-dark/20',
      contained: 'bg-primary-light hover:brightness-90 dark:bg-primary-dark dark:hover:brightness-110',
      outlined:
        'border border-primary-light text-primary-light hover:bg-primary-light/20 dark:border-primary-dark dark:hover:bg-primary-dark/20'
    },
    readOnly: {
      true: 'text-gray-500 bg-gray-400 hover:bg-gray-400 dark:text-gray-500 dark:bg-gray-400 dark:hover:bg-gray-400'
    },
    loading: {
      true: 'text-transparent dark:text-transparent'
    }
  },
  compoundVariants: [
    {
      readOnly: true,
      variant: ['outlined', 'text'],
      class: 'border-gray-400 bg-gray-400/5 dark:border-gray-400 dark:bg-gray-400/5'
    },
    { readOnly: false, loading: false, class: 'active:shadow-lg' }
  ],
  defaultVariants: {
    readOnly: false,
    loading: false
  }
})

export function Button({ children, className, variant = 'contained', rippleColor = '#7dafff', ...rest }: ButtonProps) {
  return (
    <ButtonBase
      rippleColor={rippleColor}
      className={button({ variant, loading: rest.loading, readOnly: rest.readOnly, className })}
      {...rest}
    >
      {children}
    </ButtonBase>
  )
}
