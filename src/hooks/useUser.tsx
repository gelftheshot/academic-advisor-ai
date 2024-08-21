'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { SignInRequest } from '@/@types/user'
import { api } from '@/services/axios'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { useAxios } from './useAxios'

interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login(props: SignInRequest): Promise<{ error?: string }>
  logout(): Promise<void>
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()
  const [firstFetch, setFirstFetch] = useState(true)
  const [loading, setLoading] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    async function retrieve() {
      const { accessToken } = parseCookies()
      if (accessToken) {
        const { data, error } = await useAxios.get('api/users/get-by-token')
        if (!error && data) {
          setUser(data)
        }
      }
    }
    retrieve().finally(() => setFirstFetch(false))
  }, [])

  async function login({ login, password }: SignInRequest) {
    setLoading(true)
    const { data, error } = await useAxios.post<{ user: User; accessToken: string }>('/api/users/login', {
      login,
      password
    })
    setLoading(false)

    if (error) {
      return error
    }

    if (data) {
      setUser(data.user)
      setCookie(undefined, 'accessToken', data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })

      api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
    }

    return {}
  }

  async function logout() {
    api.defaults.headers.Authorization = ''
    destroyCookie(undefined, 'accessToken')
    setUser(undefined)
    refresh()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user?.roles.includes('ADMIN'),
        loading,
        login,
        logout
      }}
    >
      {!firstFetch && children}
    </UserContext.Provider>
  )
}

export function useUser(): UserContextProps {
  return useContext(UserContext)
}
