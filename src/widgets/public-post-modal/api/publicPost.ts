import type { GetCommentsResponse, GetPublicCommentsArg } from '../model/types/api'

import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

const PAGE_SIZE = 15

export const DEFAULT_PAGE_NUMBER = 1

const publicPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicCommentsByPostId: builder.query<GetCommentsResponse, GetPublicCommentsArg>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, response, { arg }) => {
        const { pageNumber } = arg

        if (pageNumber !== DEFAULT_PAGE_NUMBER && response.items && response.items?.length > 0) {
          currentCache.items?.push(...response.items)
        }
      },
      query: ({ pageNumber = DEFAULT_PAGE_NUMBER, pageSize = PAGE_SIZE, postId }) => ({
        params: { pageNumber, pageSize, sortDirection: 'desc' },
        url: apiEndpoints.public.posts.comments(postId),
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
  }),
})

export const { useGetPublicCommentsByPostIdQuery } = publicPostApi

export const { getPublicCommentsByPostId } = publicPostApi.endpoints
