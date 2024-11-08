import { Post } from '@/src/entities/post'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  GetPublicPostsResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserPublicPostsArgs,
} from '../model/types/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<GetUserPostsResponse, GetUserPostsParams>({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.posts.postsByUsername(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
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
  useGetPostsQuery,
  useGetPublicPostByIdQuery,
  useGetUserPublicPostsQuery,
  util: { getRunningQueriesThunk },
} = postApi

export const { getPosts, getPublicPostById, getUserPublicPosts } = postApi.endpoints
