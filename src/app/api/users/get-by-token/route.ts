import { usersApi } from '@/server/prisma/users'
import { NextRequest, NextResponse } from 'next/server'

import { privateRoutesMiddleware } from '../../middleware'

export async function GET(req: NextRequest) {
  const { payload, error } = await privateRoutesMiddleware(req)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const { user, error: error2 } = await usersApi.getById({ id: (payload as any).user.id })
  if (error2) return NextResponse.json({ error: error2.message }, { status: 400 })

  return NextResponse.json(user)
}
