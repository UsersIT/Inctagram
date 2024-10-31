import type { PublicPostsResponse } from '../model/types/api'

import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

const publicApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPosts: builder.query<PublicPostsResponse, void>({
      query: () => ({
        params: { pageSize: 4 },
        url: apiEndpoints.public.posts.allWithPagination,
      }),
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  util: { getRunningQueriesThunk },
} = publicApi

export const { getAllPosts } = publicApi.endpoints
