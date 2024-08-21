import { MouseEvent as ReactMouseEvent, RefObject } from 'react'

// eslint-disable-next-line no-undef
export function getElementHeight(element?: HTMLElement | ChildNode | null): number {
  if (element instanceof HTMLElement) {
    const { marginTop, marginBottom } = getComputedStyle(element)
    return element.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom)
  }
  return 0
}

// eslint-disable-next-line no-undef
export function getElementWidth(element?: HTMLElement | ChildNode | null): number {
  if (element instanceof HTMLElement) {
    const { marginLeft, marginRight } = getComputedStyle(element)
    return element.offsetWidth + parseFloat(marginLeft) + parseFloat(marginRight)
  }
  return 0
}

// eslint-disable-next-line no-undef
export function getMaxElementHeight(elements?: NodeListOf<ChildNode> | null) {
  if (!elements) return 0

  return Array.from(elements).reduce((maxHeight, element) => {
    return Math.max(maxHeight, getElementHeight(element))
  }, 0)
}

export const handleClickOutside =
  (ref: RefObject<any>, onClickOutside?: () => void) => (e: MouseEvent | ReactMouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOutside?.()
    }
  }
