import { boundedString } from '@/utils/zod'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: boundedString({ field: 'Username', min: 6 }).nonempty('Please enter an username.'),
    password: boundedString({ field: 'Password', min: 6, max: 30 }).nonempty('Please enter a password.'),
    confirmPassword: z.string().nonempty('Please confirm your password.')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const signInSchema = z.object({
  login: boundedString({ field: 'Username or email address', min: 6 }).nonempty(
    'Please enter a username or email address.'
  ),
  password: boundedString({ field: 'Password', min: 6, max: 30 }).nonempty('Please enter a password.')
})

export type SignUpRequest = z.infer<typeof signUpSchema>
export type SignInRequest = z.infer<typeof signInSchema>
