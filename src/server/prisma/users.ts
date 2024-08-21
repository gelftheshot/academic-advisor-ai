import { Prisma } from '@prisma/client'

import { prisma } from '.'
import { hashWord, isHashValid } from '../../lib/hash'
import { generateToken } from '../../lib/jwt'

class UsersApi {
  prisma: Prisma.UserDelegate

  constructor() {
    this.prisma = prisma.user
  }

  async create({ payload }: { payload: Prisma.UserCreateInput }) {
    try {
      const hashedPassword = await hashWord(payload.password)
      payload.password = hashedPassword

      const user = await this.prisma.create({ data: payload })

      return { user }
    } catch (error: any) {
      if (error?.code === 'P2002') {
        return { error: new Error('User with this username already exists!') }
      }
      return { error }
    }
  }

  async login({ login, password }: { login: string; password: string }) {
    try {
      const user = await this.prisma.findFirst({ where: { OR: [{ username: login }, { email: login }] } })

      if (!user) {
        throw new Error('Invalid username or password')
      }

      const validPass = await isHashValid(password, user.password)
      if (!validPass) {
        throw new Error('Invalid username or password')
      }

      const accessToken = await generateToken({ user })

      return { user, accessToken }
    } catch (error: any) {
      return { error }
    }
  }

  async get() {
    try {
      const users = await this.prisma.findMany()
      return { users }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const user = await this.prisma.findUnique({ where: { id } })
      return { user }
    } catch (error: any) {
      return { error }
    }
  }

  async delete({ id }: { id: string }) {
    try {
      await this.prisma.delete({ where: { id } })
      return {}
    } catch (error: any) {
      return { error }
    }
  }
}

export const usersApi = new UsersApi()
