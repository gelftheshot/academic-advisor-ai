import '@testing-library/jest-dom/extend-expect'
import { configure } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

configure({ testIdAttribute: 'data-test' })
resizeScreenSize(1280)

export function createMatchMedia(width: number) {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    }
  }
}

export function resizeScreenSize(width: number) {
  window.matchMedia = createMatchMedia(width)
}
