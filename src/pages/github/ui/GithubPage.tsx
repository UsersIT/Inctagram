import { useEffect } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { tokenStorage } from '@/src/shared/storage'
import { Spinner } from '@/src/shared/ui'
import { useRouter } from 'next/router'

import s from './GithubPage.module.scss'

export const GithubPage = () => {
  const router = useRouter()
  const { accessToken } = router.query
  const { data: meData, isLoading } = useMeQuery(undefined, { skip: !accessToken })

  useEffect(() => {
    if (accessToken) {
      tokenStorage.setToken(accessToken as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  useEffect(() => {
    if (meData && !isLoading) {
      router.push(routes.PROFILE(meData.userId))
    } else {
      router.push(routes.LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData])

  if (isLoading) {
    return (
      <div className={s.page}>
        <Spinner />
      </div>
    )
  }

  return null
}
