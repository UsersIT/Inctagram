import type { PublicPostsResponse } from '../model/types/api'

import { BASE_API_URL, apiEndpoints } from '@/src/shared/constants/api'
import axios from 'axios'

const PAGE_SIZE = 4
const URL = BASE_API_URL + apiEndpoints.public.posts.allWithPagination

export const getPublicPosts = async () => {
  const response = axios.get<PublicPostsResponse>(URL, {
    params: { pageSize: PAGE_SIZE, sortDirection: 'desc' },
  })

  return response
}
