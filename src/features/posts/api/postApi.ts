import { Post } from '@/src/entities/post'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import { GetPublicPostsResponse, GetUserPublicPostsArgs } from '../model/types/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPostById: builder.query<Post, number>({
      providesTags: (_, __, postId) => [{ id: postId, type: 'Post' }],
      query: postId => apiEndpoints.public.posts.postById(postId),
    }),
    getUserPublicPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
      query: args => ({
        method: 'GET',
        params: {
          pageSize: args.pageSize,
          sortBy: args.sortBy,
          sortDirection: args.sortDirection,
        },
        url: `${apiEndpoints.public.posts.allByUserIdWithPagination}${args.userId}/${args.endCursorPostId}`,
      }),
    }),
  }),
})

export const {
  useGetPublicPostByIdQuery,
  useGetUserPublicPostsQuery,
  util: { getRunningQueriesThunk },
} = postApi

export const { getPublicPostById, getUserPublicPosts } = postApi.endpoints
