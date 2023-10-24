import Image from 'next/image'
import Link from 'next/link'
import { IoArrowForwardOutline } from 'react-icons/io5'

import { Button } from '@/components/elements'

export default function Home() {
  return (
    <main
      className="flex h-[100vh] w-[100vw] justify-center"
      style={{
        backgroundImage: 'url("/assets/landing/bg_landing.png")',
        backgroundSize: 'cover, contain',
      }}
    >
      <div className="fixed top-0 flex w-full justify-around py-7">
        <div className="flex flex-row items-center gap-2">
          <Image src="/assets/logo.png" alt="logo" width={36} height={36} />
          <div className="grow font-inter text-xl text-white">
            <span className="font-bold">Len</span>Sight
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <Link href="/signin" className="px-6 py-2 text-sm font-semibold text-white">
            Login
          </Link>
          <Link
            href="/signup"
            className="font-sm rounded-full bg-white px-6 py-2 font-inter font-semibold text-bluez-850"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="flex w-4/5 flex-row items-center justify-center">
        <div className="flex flex-col gap-6">
          <h1 className="font-dmsans text-[60px] font-bold text-white">
            AI-Driven Credit Risk & Insurance Management
          </h1>
          <h2 className="font-inter text-base text-bluex-100">
            Elevate your credit risk & insurance management with our AI-powered solutions. Make
            informed, lightning-fast decisions with our enhanced policy templates and streamline
            your financial strategy.
          </h2>
          <Link href="/signup">
            <Button type="button">
              Get Started <IoArrowForwardOutline className=" inline-flex h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
