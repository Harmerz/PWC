import { useEffect, useState } from 'react'

import AnswerCard from '@/components/elements/answerCard'
import QuestionCard from '@/components/elements/questionCard'
import { QuestionDetail } from '@/utils/const'

export function QuestionAnswer1({ answer }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[0].title}
        description={QuestionDetail[0].description}
        question={QuestionDetail[0].question}
      />
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}

export function QuestionAnswer2({ answer }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[1].title}
        description={QuestionDetail[1].description}
        question={QuestionDetail[1].question}
      />
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}

export function QuestionAnswer3({ answer }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[2].title}
        description={QuestionDetail[2].description}
        question={QuestionDetail[2].question}
      />
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}

export function QuestionAnswer4({ answer }) {
  const [know, setKnow] = useState(localStorage.getItem('know') ?? '')
  useEffect(() => {
    localStorage.setItem('know', know)
  }, [know])
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[3].title}
        description={QuestionDetail[3].description}
        question={QuestionDetail[3].question}
      />
      {know === '' && (
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-white">Please answer by clicking the button</p>
            {/* <p className="text-xs text-neutral-500">(PDF, max 5MB)</p> */}
          </div>
          <div className="flex flex-row gap-5 text-sm font-semibold">
            <button
              type="button"
              className="h-9 w-40 rounded-full border border-white bg-transparent px-6 py-2 text-neutral-500"
              onClick={() => [setKnow('no')]}
            >
              No, I don&apos;t know
            </button>
            <button
              type="button"
              className="h-9 w-40 rounded-full border bg-blue-500 px-6 py-2 text-white"
              onClick={() => [setKnow('yes')]}
            >
              Yes, I know
            </button>
          </div>
        </div>
      )}
      {know === 'yes' && <AnswerCard answer="Yes, I know my Credit Score" />}
      {know === 'yes' && (
        <QuestionCard
          description={QuestionDetail[3].childern.yes.description}
          question={QuestionDetail[3].childern.yes.question}
        />
      )}
      {know === 'no' && (
        <QuestionCard
          description={QuestionDetail[3].childern.no.description}
          question={QuestionDetail[3].childern.no.question}
        />
      )}
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}

export function QuestionAnswer5({ answer, setCurrentQuestion }) {
  const [know, setKnow] = useState(localStorage.getItem('have') ?? '')
  useEffect(() => {
    localStorage.setItem('have', know)
  }, [know, setCurrentQuestion])
  const handleClick = () => {
    const answerUserList = JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []
    localStorage.setItem(
      'AnswerUserList',
      JSON.stringify([
        ...answerUserList,
        {
          number: 4,
          title: QuestionDetail[4].title,
          question: QuestionDetail[4].question,
          answer: know,
        },
      ]),
    )
  }
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[4].title}
        description={QuestionDetail[4].description}
        question={QuestionDetail[4].question}
      />
      {know === '' && (
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-white">
              Upload your Income Statement or any Financial Report
            </p>
            <p className="text-xs text-neutral-500">(PDF, max 5MB)</p>
          </div>
          <div className="flex flex-row gap-5 text-sm font-semibold">
            <button
              type="button"
              className="h-9 w-40 rounded-full border border-white bg-transparent px-6 py-2 text-neutral-500"
              onClick={() => [setKnow('no'), setCurrentQuestion(5), handleClick()]}
            >
              No, I don’t have
            </button>
            <label
              htmlFor="input-file"
              className="h-9 w-40 cursor-pointer rounded-full border bg-blue-500 px-6 py-2 text-white"
            >
              Add a File
              <input
                id="input-file"
                type="file"
                className="hidden"
                onChange={(e) => [console.log(e), handleClick()]}
              />
            </label>
          </div>
        </div>
      )}
      {know === 'no' && <AnswerCard answer="No, I don't have it" />}
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}

export function QuestionAnswer6({ answer }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <QuestionCard
        title={QuestionDetail[5].title}
        description={QuestionDetail[5].description}
        question={QuestionDetail[5].question}
      />
      {answer && <AnswerCard answer={answer.answer} />}
    </div>
  )
}
