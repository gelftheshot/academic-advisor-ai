import { RefObject, useEffect } from 'react'

import { handleClickOutside } from '@/utils/element'

interface UseClickOutsideProps {
  ref: RefObject<any>
  onClickOutside?(): void
}

export function useClickOutsideDocument({ ref, onClickOutside }: UseClickOutsideProps) {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside(ref, onClickOutside), true)
    return () => {
      document.removeEventListener('click', handleClickOutside(ref, onClickOutside), true)
    }
  }, [ref, onClickOutside])
}
