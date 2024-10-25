import type { GetCommentsResponse, GetPublicCommentsArg } from '../model/types/api'
import type { Post } from '@/src/entities/post'

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

        if (pageNumber === DEFAULT_PAGE_NUMBER) {
          return currentCache
        }

        if (response.items && response.items?.length > 0) {
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
    getPublicPostById: builder.query<Post, number>({
      providesTags: (result, error, postId) => [{ id: postId, type: 'Post' }],
      query: postId => apiEndpoints.public.posts.postById(postId),
    }),
  }),
})

export const {
  useGetPublicCommentsByPostIdQuery,
  useGetPublicPostByIdQuery,
  util: { getRunningQueriesThunk },
} = publicPostApi

export const { getPublicCommentsByPostId, getPublicPostById } = publicPostApi.endpoints
