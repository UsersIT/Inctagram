import { BASE_URL } from '@/src/shared/constants/api'

export function gitHubAuth() {
  const REDIRECT_URL = `${BASE_URL}/auth/github`

  const url = `https://inctagram.work/api/v1/auth/github/login?redirect_uri=${REDIRECT_URL}`

  window.location.assign(url)
}
