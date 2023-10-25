import { Card } from 'antd'
import Image from 'next/image'

import { StepsRegister } from '@/components/elements'
import { Register } from '@/utils/const'

export function LayoutAuth({ children, step }) {
  return (
    <div
      className="flex h-[100vh] w-[100vw] flex-row justify-around"
      style={{
        backgroundImage: 'url("/assets/auth/bg_Auth.png")',
        backgroundSize: 'cover, contain',
      }}
    >
      <div className="flex w-2/3 items-center justify-center">
        {!step ? (
          <Image src="/assets/auth/Auth.png" alt="Auth Image" width={572} height={456} />
        ) : (
          <div>
            <StepsRegister items={Register} current={step ?? 0} />
          </div>
        )}
      </div>
      <div className="w-1/3">
        <Card className="absolute right-0 flex h-[100vh] w-1/3 items-center justify-center rounded-l-3xl">
          {children}
        </Card>
      </div>
    </div>
  )
}

export default LayoutAuth
