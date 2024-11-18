import { GetUserPostsResponse } from '@/src/features/posts'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  CommentsResponseType,
  GetCommentsParams,
  GetCommentsResponse,
  GetUserPostsParams,
} from './../model/types/api'

const userPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<CommentsResponseType, { content: string; postId: number }>({
      query: ({ postId, ...body }) => ({
        body,
        method: 'POST',
        url: `${apiEndpoints.posts.comments(postId)}`,
      }),
    }),
    deletePostById: builder.mutation<void, { postId: number }>({
      invalidatesTags: (result, error, { postId }) => [
        { id: postId, type: 'Post' },
        { id: 'LIST', type: 'Post' },
      ],
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `${apiEndpoints.posts.posts}/${postId}`,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, GetCommentsParams>({
      query: ({
        pageNumber,
        pageSize = 10,
        postId,
        sortBy = 'createdAt',
        sortDirection = 'desc',
      }) => {
        return {
          params: { pageNumber, pageSize, sortBy, sortDirection },
          url: `${apiEndpoints.posts.comments(postId)}`,
        }
      },
    }),
    getPosts: builder.query<GetUserPostsResponse, GetUserPostsParams>({
      providesTags: result =>
        result?.items
          ? [
              { id: 'LIST', type: 'Post' as const },
              ...result.items.map(post => ({ id: post.id, type: 'Post' as const })),
            ]
          : [{ id: 'LIST', type: 'Post' as const }],

      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.posts.postsByUsername(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),

    updateLikeStatus: builder.mutation<void, { likeStatus: string; postId: number }>({
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `${apiEndpoints.posts.likeStatus(postId)}`,
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
  useAddCommentMutation,
  useDeletePostByIdMutation,
  useGetCommentsQuery,
  useGetPostsQuery,
  useUpdateLikeStatusMutation,
  useUpdatePostByIdMutation,
} = userPostApi
