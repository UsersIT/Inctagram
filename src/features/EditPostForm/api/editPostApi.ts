import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

const editPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updatePostById: builder.mutation<void, { description: string; postId: number }>({
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `${apiEndpoints.posts.posts}/${postId}`,
      }),
    }),
  }),
})

export const { useUpdatePostByIdMutation } = editPostApi
