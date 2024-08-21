import { RefObject, useEffect } from 'react'

interface useScrollbarProps {
  ref?: RefObject<any>
  disable?: boolean
}

export function useScrollbar({ ref, disable }: useScrollbarProps) {
  useEffect(() => {
    const element = ref?.current || document.getElementById('app')
    element.style.overflow = disable ? 'hidden' : ''
  }, [disable, ref])
}
