import { Flex, Typography } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'

import { useResendEmail } from '@/hooks/user'

export function VerifyForm() {
  const [user, setUser] = useState(JSON?.parse(localStorage?.getItem('values') ?? '{}') ?? {})
  const { mutate: resedEmail } = useResendEmail({ user })
  useEffect(() => {
    setUser(JSON?.parse(localStorage?.getItem('values') ?? '{}') ?? {})
  }, [])

  const handleResend = () => {
    resedEmail({
      email: user?.email,
    })
  }

  return (
    <Flex vertical justify="center">
      <Typography.Title className=" font-dmsans">Verify your email</Typography.Title>
      <Typography.Text className="font-inter" type="secondary">
        We&apos;ve just sent an email &quot;{user?.email}&quot; to verify the authenticity of your
        account. Kindly check your email inbox.
      </Typography.Text>
      <div className="flex flex-row">
        <p className="text-base font-bold text-neutral-700">Didn&apos;t receive the email? </p>
        <button
          type="button"
          className="ml-1 text-base font-bold text-bluey-500"
          onClick={() => handleResend()}
        >
          {' '}
          Resend Email Verification
        </button>
      </div>
      <Link
        href="/signup"
        className="mt-20 flex flex-row gap-2 text-base font-bold text-neutral-700"
      >
        <IoArrowBack className="h-5 w-5" />
        Back To Register
      </Link>
    </Flex>
  )
}

export default VerifyForm
