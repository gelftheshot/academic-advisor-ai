'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdTrash as Trash } from 'react-icons/io'

import { SignUpRequest, signUpSchema } from '@/@types/user'
import { Button } from '@/components/Buttons'
import { Snackbar } from '@/components/Feedback/Snackbar'
import { Input } from '@/components/Input'
import { useAxios } from '@/hooks/useAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

import Loading from '../loading'

interface UsersProps {
  users: User[]
}

export function Users({ users }: UsersProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpRequest>({ resolver: zodResolver(signUpSchema) })
  const [userList, setUserList] = useState<User[]>(users || [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit({ confirmPassword, ...user }: SignUpRequest) {
    setIsLoading(true)
    const { data, error } = await useAxios.post<User>('api/users', user)
    if (error) {
      setError(error.error)
    } else if (data) {
      setUserList(prev => [...prev, data])
    }
    setIsLoading(false)
  }

  async function handleDelete(id: string) {
    setIsLoading(true)
    const { error } = await useAxios.delete(`api/users/${id}`)
    if (error) {
      setError(error.error)
    } else {
      setUserList(prev => prev.filter(u => u.id !== id))
    }
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && <Loading />}
      <Snackbar open={!!error} message={error} type="error" onClose={() => setError('')} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input label="username" error={errors.username?.message} {...register('username')} />
          <div className="mt-4 flex gap-4">
            <Input
              type="password"
              label="password"
              wrapperClassName="w-1/2"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              type="password"
              label="confirm password"
              wrapperClassName="w-1/2"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4" loading={isLoading} readOnly={isLoading}>
          Create User
        </Button>
      </form>
      {userList.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {userList.map(user => (
            <div
              key={user.id}
              className="relative flex flex-col items-center overflow-hidden rounded bg-light p-4 text-dark shadow dark:bg-dark dark:text-light"
            >
              <p className="break-all font-semibold">{user.username}</p>
              <p className="break-all font-semibold">{user.roles.join(' | ')}</p>
              <Trash
                size={22}
                className="absolute right-1 top-1 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(user.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
