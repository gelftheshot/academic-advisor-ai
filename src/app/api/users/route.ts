import { usersApi } from '@/server/prisma/users'
import { NextRequest, NextResponse } from 'next/server'

import { privateRoutesMiddleware } from '../middleware'

export async function GET() {
  const { users, error } = await usersApi.get()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const { error: invalidToken } = await privateRoutesMiddleware(req)
  if (invalidToken) return NextResponse.json({ error: invalidToken.message }, { status: 400 })

  const body = await req.json()
  const { user, error } = await usersApi.create({ payload: body })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}
