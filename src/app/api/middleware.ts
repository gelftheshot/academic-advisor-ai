import { getTokenFromHeader, verifyToken } from '@/lib/jwt'
import { NextRequest } from 'next/server'

export async function privateRoutesMiddleware(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Unauthorized')
    }

    const token = getTokenFromHeader(authHeader)
    const { payload, error } = await verifyToken(token)

    if (error) throw new Error('Invalid Token')

    return { payload }
  } catch (error: any) {
    return { error }
  }
}
