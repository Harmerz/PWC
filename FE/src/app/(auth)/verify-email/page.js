'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useVerifyEmail } from '@/hooks/user'

export default function Home() {
  const searchParams = useSearchParams()
  const [verify, setVerify] = useState('')
  const emailToken = searchParams.get('emailToken')
  const { mutate: Verify, data } = useVerifyEmail()
  useEffect(() => {
    Verify({
      emailToken,
    })
    setVerify(data)
  }, [Verify, data, emailToken])

  return (
    <main
      className="flex h-[100vh] w-[100vw] justify-center pt-40"
      style={{
        backgroundImage: 'url("/assets/landing/bg_landing.png")',
        backgroundSize: 'cover, contain',
      }}
    >
      Verification is : {verify}
    </main>
  )
}
