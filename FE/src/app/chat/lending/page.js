'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { IoLockClosed, IoLogOutOutline, IoSend } from 'react-icons/io5'

import { Steps } from '@/components/elements'
import QuestionCard from '@/components/elements/questionCard'
import { HandleLogout } from '@/components/pages/auth'
import {
  QuestionAnswer1,
  QuestionAnswer2,
  QuestionAnswer3,
  QuestionAnswer4,
  QuestionAnswer5,
  QuestionAnswer6,
} from '@/components/pages/lending'
import { useNewQuestions, useQuestions } from '@/hooks/question'
import { Question, QuestionDetail, Result } from '@/utils/const'

export function LendingPage() {
  const { data: session } = useSession()

  // eslint-disable-next-line no-unsafe-optional-chaining
  const [currentQuestions, setCurrentQuestion] = useState(
    (JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).length,
  )

  const [answerUser, setAnswerUser] = useState('')

  const [open, setOpen] = useState(false)
  const openRef = useRef(null)
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!openRef?.current?.contains(e.target)) setOpen(false)
    })
  })
  const handleAnswer = () => {
    const answer = JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []
    localStorage.setItem(
      'AnswerUserList',
      JSON.stringify([
        ...answer,
        {
          number: currentQuestions,
          title: QuestionDetail[currentQuestions].title,
          question: QuestionDetail[currentQuestions].question,
          answer: answerUser,
        },
      ]),
    )
    setAnswerUser('')
    setCurrentQuestion(currentQuestions + 1)
  }

  const [questionId, setQuestionId] = useState(localStorage.getItem('questionId') ?? '')

  const { mutate: NewQuestion, data } = useNewQuestions()
  const { mutate: enterQuestion, isError } = useQuestions()
  const [proceed, setProceed] = useState(false)

  useEffect(() => {
    if (questionId === '' || !questionId) setQuestionId(localStorage.getItem('questionId') ?? '')
    if (questionId === '' || !questionId) {
      NewQuestion()
      setQuestionId(data)
    }
    localStorage.setItem('questionId', questionId)
  }, [NewQuestion, data, questionId, currentQuestions])

  const handleRetry = () => {
    setAnswerUser('')
    setCurrentQuestion(0)
    localStorage.removeItem('AnswerUserList')
    localStorage.removeItem('know')
    localStorage.removeItem('have')
  }

  const handleProceed = () => {
    const answer = JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []
    enterQuestion({
      id: questionId,
      question: answer,
    })
    setProceed(true)
    // eslint-disable-next-line no-console
    if (isError) console.log('error')
  }

  return (
    <div className="flex h-screen w-full flex-col font-inter">
      <div className="fixed z-30 flex h-[88px] w-full items-center justify-around border-b border-black bg-neutral-900 py-6 shadow-lg">
        <div className="flex flex-row items-center gap-2">
          <Image src="/assets/logo.png" alt="logo" width={36} height={36} />
          <div className="grow font-inter text-xl text-white">
            <span className="font-bold">Len</span>Sight
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-neutral-1000 bg-opacity-50 p-1 text-base font-bold">
          <button type="button" className="rounded bg-neutral-700 px-4 py-2">
            Lending
          </button>
          <button
            type="button"
            className="flex cursor-not-allowed flex-row items-center gap-2 rounded bg-transparent px-4 py-2 text-neutral-700"
          >
            Investment <IoLockClosed />
          </button>
          <button
            type="button"
            className="flex cursor-not-allowed flex-row items-center gap-2 rounded bg-transparent  px-4 py-2 text-neutral-700"
          >
            Credit Card <IoLockClosed />
          </button>
        </div>
        <button
          type="button"
          ref={openRef}
          onClick={() => setOpen(!open)}
          className="relative cursor-pointer rounded-lg px-5 py-3 hover:bg-eneutral-400"
        >
          {session?.user?.name}
          {open && (
            <div className="absolute left-0 z-[9999] mt-3 flex flex-col gap-3 rounded-lg bg-eneutral-300 px-5 py-2 text-sm font-medium">
              <p key="Dasboard" className="cursor-pointer text-neutral-500 hover:text-white">
                Dashboard
              </p>
              <button
                key="Logout"
                type="button"
                onClick={() => HandleLogout(session?.user?.refreshToken)}
                className=" flex w-[90px] flex-row items-center gap-2 text-credit-600 hover:text-error-500"
              >
                <IoLogOutOutline className="h-5 w-5 text-xl" /> Log Out
              </button>
            </div>
          )}
        </button>
      </div>
      <div className="flex h-screen w-full items-center justify-center gap-12 bg-neutral-900 pt-11">
        <div className="flex h-4/5 w-4/5 justify-center gap-12">
          <div className="w-[30%] overflow-y-scroll rounded-[20px] bg-neutral-1000 bg-opacity-50 px-5 py-6 scrollbar-hide">
            <p className="my-4 text-base font-bold text-neutral-500">Question to fills</p>
            <Steps current={!proceed ? currentQuestions : 7} items={Question} />
            <p className="my-4 text-base font-bold text-neutral-500">Suggestion outcome</p>
            <Steps current={1} items={Result} />
          </div>
          <button type="button" className="relative z-10 flex w-[70%] flex-col gap-3 pb-[60px]">
            <div className="z-10 flex h-full w-full flex-col gap-3 overflow-y-scroll pb-10 pr-2">
              <div className="flex w-full flex-col gap-3">
                <QuestionCard
                  question="Our “Lending” Solution"
                  description={
                    <>
                      Select “Lending” to streamline your credit and loan processes with our
                      AI-powered templates. Whether you&apos;re a financial institution or an
                      individual borrower, enhance your credit risk assessment, loan agreement
                      creation, and lending strategy optimization. The solution consist of these
                      steps bellow:
                      <div className="ml-4">
                        <ul className="mt-2 list-inside list-disc">
                          <li>User Question to fills</li>
                          <li>Lending Suggestion Outcome </li>
                          <li>Custom Template Creation</li>
                          <li>Location Assistance </li>
                          <li>Go to Dashboard</li>
                        </ul>
                      </div>
                    </>
                  }
                />
                {currentQuestions >= 0 && (
                  <QuestionAnswer1
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 1',
                    )}
                  />
                )}
                {currentQuestions >= 1 && (
                  <QuestionAnswer2
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 2',
                    )}
                  />
                )}
                {currentQuestions >= 2 && (
                  <QuestionAnswer3
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 3',
                    )}
                  />
                )}
                {currentQuestions >= 3 && (
                  <QuestionAnswer4
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 4',
                    )}
                  />
                )}
                {currentQuestions >= 4 && (
                  <QuestionAnswer5
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 5',
                    )}
                    setCurrentQuestion={setCurrentQuestion}
                  />
                )}
                {currentQuestions >= 5 && (
                  <QuestionAnswer6
                    answer={(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                      (e) => e.title === 'Question 6',
                    )}
                  />
                )}
                {(JSON?.parse(localStorage.getItem('AnswerUserList')) ?? []).find(
                  (e) => e.title === 'Question 6',
                ) &&
                  !proceed && (
                    <div className="flex flex-row justify-between py-6">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-semibold text-white">
                          Ready to see the suggestion outcome?
                        </p>
                        {/* <p className="text-xs text-neutral-500">(PDF, max 5MB)</p> */}
                      </div>
                      <div className="flex flex-row gap-5 text-sm font-semibold">
                        <button
                          type="button"
                          className="h-9 w-40 rounded-full border border-white bg-transparent px-6 py-2 text-neutral-500"
                          onClick={handleRetry}
                        >
                          No, Retry
                        </button>
                        <button
                          type="button"
                          className="h-9 w-40 rounded-full border bg-blue-500 px-6 py-2 text-white"
                          onClick={handleProceed}
                        >
                          Yes, Proceed
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="absolute bottom-0 flex h-[60px] w-full flex-row gap-5">
              <div className="relative h-[60px] w-full  rounded-2xl border border-eneutral-300 bg-eneutral-200">
                {/* {choise && <div className="absolute z-30 h-full w-full cursor-not-allowed" />} */}

                <textarea
                  rows="1"
                  type="text"
                  placeholder="Your Answer"
                  className="flex h-[60px] w-full grow items-center justify-center rounded-2xl bg-transparent px-5 py-4 pr-8 text-base"
                  onChange={(e) => setAnswerUser(e.target.value)}
                  value={answerUser}
                />
                <button type="submit" onClick={() => handleAnswer()}>
                  <IoSend className="absolute right-2.5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-100" />
                </button>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
export default LendingPage
