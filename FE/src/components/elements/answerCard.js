import { IoPersonCircleSharp } from 'react-icons/io5'

export function AnswerCard({ answer }) {
  return (
    <div className="flex flex-row gap-5 rounded-2xl bg-eneutral-200 p-4">
      <IoPersonCircleSharp className="h-6 w-6 text-neutral-700" />
      <p className="text-start text-sm text-neutral-500">{answer}</p>
    </div>
  )
}

export default AnswerCard
