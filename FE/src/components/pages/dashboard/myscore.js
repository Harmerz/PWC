export function MyScore() {
  return (
    <div className="flex h-full w-1/3 flex-col rounded-xl bg-neutral-1000 p-6">
      <p className=" font-inter text-2xl font-bold text-neutral-700">My credit score</p>
      <div className="flex flex-row">
        <p className="font-dmsans text-[80px] text-neutral-100">760</p>
        <p className="text-xl font-bold text-credit-100 underline">Excellent</p>
      </div>
      <div className="mt-6 font-inter text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
        est a, mattis tellus. Sed dignissim, metus.
      </div>
      <div className="my-4 h-2 w-full rounded-full bg-neutral-700 bg-opacity-80" />
      <div className="grid w-full grid-cols-3 gap-5">
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-100" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Excellent</p>
            <p className="text-base text-neutral-100">800-850</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-200" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Very Good</p>
            <p className="text-base text-neutral-100">750-799</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-300" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Good</p>
            <p className="text-base text-neutral-100">700-749</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-400" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Fair</p>
            <p className="text-base text-neutral-100">650-699</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-500" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Poor</p>
            <p className="text-base text-neutral-100">600-649</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="h-full min-h-[48px] w-1 rounded-full bg-credit-600" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-700">Very Bad</p>
            <p className="text-base text-neutral-100">300-599</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyScore
