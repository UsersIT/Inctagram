import { GetUserPostsResponse } from '@/src/features/posts/model/types/api'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import {
  CommentsResponseType,
  GetCommentsParams,
  GetCommentsResponse,
  GetUserPostsParams,
} from '@/src/widgets/post-modal/model/types/api'

const userPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<CommentsResponseType, { content: string; postId: number }>({
      query: ({ postId, ...body }) => ({
        body,
        method: 'POST',
        url: `v1/posts/${postId}/comments`,
      }),
    }),
    deletePostById: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `${apiEndpoints.posts.posts}/${postId}`,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, GetCommentsParams>({
      query: ({ pageNumber, pageSize, postId, sortBy, sortDirection }) => {
        const params = new URLSearchParams()

        if (pageSize) {
          params.append('pageSize', pageSize.toString())
        }
        if (pageNumber) {
          params.append('pageNumber', pageNumber.toString())
        }
        if (sortBy) {
          params.append('sortBy', sortBy)
        }
        if (sortDirection) {
          params.append('sortDirection', sortDirection)
        }

        return {
          method: 'GET',
          url: `${apiEndpoints.posts.posts}/${postId}/comments?${params.toString()}`,
        }
      },
    }),
    getPosts: builder.query<GetUserPostsResponse, GetUserPostsParams>({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.posts.postsByUsername(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    updateLikeStatus: builder.mutation<void, { likeStatus: string; postId: number }>({
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `${apiEndpoints.posts.posts}/${postId}/like-status`,
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
