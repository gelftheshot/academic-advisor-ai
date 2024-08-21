import { Login } from '.'

export const metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <div className="flex h-full w-full items-start justify-center pt-10">
      <Login />
    </div>
  )
}
