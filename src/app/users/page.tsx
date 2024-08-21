import { Authorize } from '@/components/Authorize'
import { usersApi } from '@/server/prisma/users'

import { Users } from '.'

export const metadata = {
  title: 'Users'
}

export default async function Page() {
  const { users } = await usersApi.get()

  return (
    <div className="px-4 py-10 sm:px-20">
      <Authorize admin redirect>
        <Users users={users || []} />
      </Authorize>
    </div>
  )
}
