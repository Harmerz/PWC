import { signOut } from 'next-auth/react'

import { axios } from '@/lib/axios'

export async function HandleLogout(refreshToken) {
  signOut()
  await axios.delete('/auth/logout', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
}

export default HandleLogout
