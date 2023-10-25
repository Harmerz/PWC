import { IoCheckmark } from 'react-icons/io5'

export function Steps({ items, current }) {
  return (
    <div className="flex w-full flex-col">
      {items.map((item, index) => (
        <div key={item.name + item.description} className="flex h-full w-full flex-row">
          <div className="min-h-16 flex w-fit flex-col items-start justify-start">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-center text-base font-bold  ${
                current === index ? 'border-[#1890FF] bg-[#1890FF] text-white' : 'text-neutral-700'
              } ${current > index ? 'border-[#1890FF] text-white' : 'text-neutral-700'}`}
            >
              {current > index ? <IoCheckmark className="text-[#1890FF]" /> : <p>{index + 1}</p>}
            </div>
            {index !== items.length - 1 && (
              <div className="my-2 flex w-full grow items-center justify-center">
                <div className="flex h-full min-h-[20px] w-[1px] items-center justify-center bg-neutral-50" />
              </div>
            )}
          </div>
          <div className="ml-[16px] flex grow flex-col">
            <h2 className="text-sm font-medium text-white">{item?.title}</h2>
            <p className="text-sm text-white">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Steps
