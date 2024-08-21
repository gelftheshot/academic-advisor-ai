import { env } from '@/env'
import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(env.TOKEN_SECRET)
const alg = 'HS256'

export async function generateToken(payload: any, expiresIn = '30d') {
  const token = await new SignJWT(payload).setProtectedHeader({ alg }).setExpirationTime(expiresIn).sign(secret)
  return token
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return { payload }
  } catch (error) {
    return { error }
  }
}

export function getTokenFromHeader(authHeader?: string) {
  if (!authHeader) {
    throw new Error('Authorization header was not provided')
  }

  const authParts = authHeader.split(' ')

  if (authParts.length !== 2) {
    throw new Error('Token malformed')
  }

  const [bearer, jwtToken] = authParts

  if (!/^Bearer$/i.test(bearer)) {
    throw new Error('Token malformed')
  }

  return jwtToken
}
