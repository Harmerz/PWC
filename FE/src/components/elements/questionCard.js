import Image from 'next/image'

export function QuestionCard({ question, description, title }) {
  return (
    <div className=" z-10 flex h-fit flex-row gap-5 rounded-2xl bg-neutral-1000 bg-opacity-50 p-5 text-start">
      <div className="flex h-6 w-6 rounded">
        <Image src="/assets/logo.png" alt="Logo" width={24} height={24} />
      </div>
      <div className="flex w-fit grow flex-col gap-2">
        <h3 className="font-dmsans text-base text-neutral-700">{title}</h3>
        <h2 className=" font-dmsans text-2xl font-bold text-neutral-50">{question}</h2>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  )
}

export default QuestionCard
