'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { useMediaQuery } from './useMediaQuery'

type SystemTheme = 'light' | 'dark'
export type Theme = SystemTheme | 'system'

type ThemesContextProps = {
  theme: SystemTheme
  systemTheme: SystemTheme
  isSystem: boolean
  setTheme(theme: Theme): void
}

const ThemesContext = createContext({} as ThemesContextProps)

function getStoredTheme() {
  const { theme } = parseCookies()
  return (theme || 'system') as Theme
}

export function ThemesProvider({ children }: { children: ReactNode }) {
  const { systemTheme } = useMediaQuery()
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<Theme>(getStoredTheme())

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (theme === 'system') {
      destroyCookie(undefined, 'theme', { path: '/' })
    } else {
      setCookie(undefined, 'theme', theme, { path: '/', maxAge: 2147483647 })
    }
  }, [systemTheme, theme])

  const isSystem = theme === 'system'
  return (
    <ThemesContext.Provider
      value={{
        theme: isSystem ? systemTheme : theme,
        systemTheme,
        isSystem,
        setTheme
      }}
    >
      {!loading && children}
    </ThemesContext.Provider>
  )
}

export function useTheme(): ThemesContextProps {
  return useContext(ThemesContext)
}
