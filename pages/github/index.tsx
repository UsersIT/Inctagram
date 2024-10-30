import { useEffect } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { tokenStorage } from '@/src/shared/storage'
import { useRouter } from 'next/router'

const Github = () => {
  const router = useRouter()
  const { accessToken } = router.query
  const { data: meData, isFetching } = useMeQuery(undefined, { skip: !accessToken })

  useEffect(() => {
    if (accessToken) {
      tokenStorage.setToken(accessToken as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  useEffect(() => {
    if (meData && !isFetching) {
      router.push(routes.PROFILE(meData.userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData])

  return null
}

export default Github
