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
    deletePostById: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `${apiEndpoints.posts.posts}/${postId}`,
      }),
    }),
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
    updatePostById: builder.mutation<void, { description: string; postId: number }>({
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `${apiEndpoints.posts.posts}/${postId}`,
      }),
    }),
  }),
})

export const {
  useDeletePostByIdMutation,
  useGetPostsQuery,
  useGetPublicPostByIdQuery,
  useGetUserPublicPostsQuery,
  useUpdatePostByIdMutation,
  util: { getRunningQueriesThunk },
} = postApi

export const { getPosts, getPublicPostById, getUserPublicPosts } = postApi.endpoints
