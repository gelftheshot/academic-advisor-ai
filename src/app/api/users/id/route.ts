import { usersApi } from '@/server/prisma/users'
import { NextRequest, NextResponse } from 'next/server'

import { privateRoutesMiddleware } from '../../middleware'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params: { id } }: Params) {
  const { user, error } = await usersApi.getById({ id })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest, { params: { id } }: Params) {
  const { error: invalidToken } = await privateRoutesMiddleware(req)
  if (invalidToken) return NextResponse.json({ error: invalidToken.message }, { status: 400 })

  const { error } = await usersApi.delete({ id })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: 'User deleted successfully' })
}
