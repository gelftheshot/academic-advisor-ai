import { usersApi } from '@/server/prisma/users'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { login, password } = await req.json()
  const { user, accessToken, error } = await usersApi.login({ login, password })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ user, accessToken })
}
