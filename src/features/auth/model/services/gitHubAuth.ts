import { BASE_API_URL, BASE_URL, apiEndpoints } from '@/src/shared/constants/api'

export function gitHubAuth() {
  const url = `${BASE_API_URL}${apiEndpoints.auth.github}?redirect_url=${BASE_URL}`

  window.location.assign(url)
}
