import { toast } from 'react-toastify'

import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { tokenStorage } from '@/src/shared/storage'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { useLoginByGoogleMutation, useMeQuery } from '../../api/authApi'

export function useGoogleAuth() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: meData, refetch: refetchMe } = useMeQuery()
  const [loginByGoogle] = useLoginByGoogleMutation()

  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async googleResponse => {
      const response = googleResponse

      try {
        const { accessToken } = await loginByGoogle(response).unwrap()

        tokenStorage.setToken(accessToken)

        await refetchMe()

        if (meData?.userId) {
          router.push(routes.PROFILE(meData.userId))
        }
      } catch (e) {
        toast.error(t.errors.somethingWentWrong)
      }
    },
  })
}
