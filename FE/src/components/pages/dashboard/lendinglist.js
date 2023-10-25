import Link from 'next/link'
import { IoAddCircle } from 'react-icons/io5'

import { Button } from '@/components/elements'

export function LendingList() {
  return (
    <div className="flex w-2/3 flex-col rounded-xl bg-eneutral-100 p-6">
      <div className="flex flex-row justify-between">
        <p className="font-dmsans text-2xl font-bold text-neutral-700">Lending List</p>
        <Link href="/chat/lending">
          <Button type="button">
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <IoAddCircle className="h-5 w-5" />
              New Chat
            </div>
          </Button>
        </Link>
      </div>
      <div className="mt-5 flex w-full gap-5 rounded-t-xl bg-neutral-1000 px-6 py-5 font-inter text-sm font-bold">
        <div className="w-4" />
        <div className="flex grow flex-row justify-between">
          <div>Place Name</div>
          <div>Date Promted</div>
        </div>
      </div>
      <form className="flex grow flex-col rounded-b-xl border-2 border-neutral-1000 bg-eneutral-100">
        <div className="flex max-h-[48px] w-full flex-row items-center gap-5 px-6 py-3 text-sm text-neutral-300">
          <input type="radio" />
          <div className="flex grow flex-row justify-between">
            <div>Place Name</div>
            <div>Date Promted</div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LendingList
