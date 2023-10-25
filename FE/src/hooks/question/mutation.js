import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

export const useQuestions = () => {
  const { accessToken, headers } = useAccessToken()

  return useApiMutation2({
    queryKey: ['questions'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post('/api/question', data, {
        headers,
      })
      return res?.data
    },
  })
}

export const useNewQuestions = () => {
  const { accessToken, headers } = useAccessToken()

  return useApiMutation2({
    queryKey: ['questions'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post('/api/question-new', data, {
        headers,
      })
      return res?.data
    },
  })
}

export default useQuestions
