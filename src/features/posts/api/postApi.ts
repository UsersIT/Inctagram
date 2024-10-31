import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  GetPublicPostsResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserPublicPostsArgs,
  PostsResponseType,
} from '../model/types/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<GetUserPostsResponse, GetUserPostsParams>({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.posts.postsByUsername(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    getPublicPostById: builder.query<PostsResponseType, { postId: number }>({
      providesTags: [],
      query: ({ postId }) => ({
        method: 'GET',
        url: `${apiEndpoints.public.posts.postById}${postId}`,
      }),
    }),
    getUserPublicPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
      providesTags: ['UserPosts'],
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
