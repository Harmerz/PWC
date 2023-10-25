import Image from 'next/image'
import { AiFillBank } from 'react-icons/ai'
import { IoCard, IoCash, IoLockClosed } from 'react-icons/io5'

import { LendingList, MyScore } from '@/components/pages/dashboard'

export function DashboardPage() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-row">
      <div className=" flex h-full w-64 flex-col gap-6 bg-eneutral-100 px-6 py-8">
        <div className="flex flex-row items-center gap-2">
          <Image src="/assets/logo.png" alt="logo" width={36} height={36} />
          <div className="grow font-inter text-xl text-white">
            <span className="font-bold">Len</span>Sight
          </div>
        </div>
        <button
          type="button"
          className="flex flex-row items-center gap-2 rounded-lg bg-bluex-400 px-4 py-3 font-inter text-base font-semibold text-white"
        >
          <AiFillBank className="h-5 w-5" />
          Lending
        </button>
        <button
          type="button"
          className="flex cursor-not-allowed flex-row items-center justify-between gap-2 rounded-lg px-4 py-3 font-inter text-base font-semibold text-neutral-700"
        >
          <div className="flex flex-row items-center gap-2">
            <IoCash className="h-5 w-5" />
            Investment
          </div>
          <IoLockClosed className="h-5 w-5 text-eneutral-300" />
        </button>
        <button
          type="button"
          className="flex cursor-not-allowed flex-row items-center justify-between gap-2 rounded-lg px-4 py-3 font-inter text-base font-semibold text-neutral-700"
        >
          <div className="flex flex-row items-center gap-2">
            <IoCard className="h-5 w-5" />
            Credit Card
          </div>
          <IoLockClosed className="h-5 w-5 text-eneutral-300" />
        </button>
      </div>
      <div className="flex h-[100vh] grow flex-col gap-5 bg-eneutral-200 px-6 py-8">
        <div className="flex h-[3/5] w-full flex-row gap-5">
          <MyScore />
          <LendingList />{' '}
        </div>
        <div className="flex h-[2/5] w-full flex-row gap-5">
          <div className="h-full w-1/3 rounded-xl bg-eneutral-100 p-6">
            <p className="text-2xl font-bold text-neutral-700">Maturiy Date</p>
            <p className="mt-4 font-dmsans text-[30px] text-neutral-100">21 October 2020</p>
            <div className="mt-20 self-end border-t-2 border-neutral-700 py-3 font-inter text-sm text-neutral-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
              dictum est a, mattis tellus. Sed dignissim, metus.
            </div>
          </div>
          <div className="h-full w-1/3 rounded-xl bg-eneutral-100 p-6">
            <p className="text-2xl font-bold text-neutral-700">Interest Rate</p>
            <p className="mt-4 font-dmsans text-[30px]  text-neutral-100">54%</p>
            <div className="mt-20 self-end border-t-2 border-neutral-700 py-3 font-inter text-sm text-neutral-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
              dictum est a, mattis tellus. Sed dignissim, metus.
            </div>
          </div>
          <div className="h-full w-1/3 rounded-xl bg-eneutral-100 p-6">
            <p className="text-2xl font-bold text-neutral-700">Payment Total</p>
            <p className="mt-4 font-dmsans text-[30px]  text-neutral-100">Rp 9.500.000,00</p>
            <div className="mt-20 self-end border-t-2 border-neutral-700 py-3 font-inter text-sm text-neutral-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
              dictum est a, mattis tellus. Sed dignissim, metus.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardPage
