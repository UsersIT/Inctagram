import { useEffect } from 'react'

import { routes } from '@/src/shared/constants/routes'
import { tokenStorage } from '@/src/shared/storage'
import { useRouter } from 'next/router'

export const GithubPage = () => {
  const router = useRouter()
  const { accessToken } = router.query

  useEffect(() => {
    if (accessToken) {
      tokenStorage.setToken(accessToken as string)
      router.push(routes.LOGIN)
    }
  }, [accessToken, router])

  return null
}
