'use client'

import { ReactNode } from 'react'

import { useUser } from '@/hooks/useUser'
import { User } from '@prisma/client'
import { redirect as nextRedirect, usePathname } from 'next/navigation'

interface AuthorizeProps {
  children: ReactNode
  unauthorized?: ReactNode
  redirect?: boolean | string
  member?: boolean
  admin?: boolean
  role?: User['roles'][number]
}

export function Authorize({ children, unauthorized, redirect, member, admin, role }: AuthorizeProps) {
  const { user, isAuthenticated, isAdmin } = useUser()
  const pathname = usePathname()

  const validMember = member && isAuthenticated
  const validAdmin = admin && isAdmin
  const validRole = role && user?.roles.includes(role)
  const authorized = validMember || validAdmin || validRole

  if (redirect && !authorized) {
    const path =
      typeof redirect === 'string' ? redirect : `/login?${new URLSearchParams({ callbackUrl: pathname || '/' })}`
    nextRedirect(path)
  }

  return <>{authorized ? children : unauthorized}</>
}
