import type {
  AddAvatarResponse,
  GetFollowersOrFollowingResponse,
  GetFollowersOrFollowingResponseParams,
  GetProfileResponse,
  GetPublicUserProfileByIdResponse,
  GetUserResponse,
} from '../model/types/api'

import { GeneralInfoFormValues } from '@/src/features/profile/model/schemas/generalInfoValidationSchema'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getProfile', undefined, draft => {
            if (draft) {
              draft.avatars = []
            }
          })
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
        }
      },
      query: () => ({
        method: 'DELETE',
        url: apiEndpoints.profile.avatar,
      }),
    }),
    followingUser: builder.mutation<any, { selectedUserId: number }>({
      invalidatesTags: [],
      query: body => ({
        body,
        method: 'POST',
        url: `${apiEndpoints.followingAndFollowers.following}`,
      }),
    }),
    getFollowers: builder.query<
      GetFollowersOrFollowingResponse,
      GetFollowersOrFollowingResponseParams
    >({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.followingAndFollowers.userFollowers(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    getFollowing: builder.query<
      GetFollowersOrFollowingResponse,
      GetFollowersOrFollowingResponseParams
    >({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.followingAndFollowers.userFollowing(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.profile.profile,
      }),
    }),
    getPublicUserProfileById: builder.query<
      GetPublicUserProfileByIdResponse,
      { profileId: number }
    >({
      providesTags: [],
      query: ({ profileId }) => ({
        method: 'GET',
        url: `${apiEndpoints.public.user.userProfileById}${Number(profileId)}`,
      }),
    }),
    getUser: builder.query<GetUserResponse, { userName: string | undefined }>({
      providesTags: [],
      query: ({ userName }) => ({
        method: 'GET',
        url: `${apiEndpoints.public.user.users}${userName}`,
      }),
    }),
    updateProfile: builder.mutation<void, Partial<GeneralInfoFormValues>>({
      query: body => ({
        body,
        method: 'PUT',
        url: apiEndpoints.profile.profile,
      }),
    }),
    uploadAvatar: builder.mutation<AddAvatarResponse, FormData>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let avatarURL: string | undefined
        let result

        try {
          const { data } = await queryFulfilled

          result = dispatch(
            profileApi.util.updateQueryData('getProfile', undefined, draft => {
              if (data.avatar) {
                draft.avatars = [data.avatar]
              }
            })
          )
        } catch (err) {
          result && result.undo()
        } finally {
          avatarURL && URL.revokeObjectURL(avatarURL)
        }
      },
      query: FormData => ({
        body: FormData,
        method: 'POST',
        url: apiEndpoints.profile.avatar,
      }),
    }),
  }),
})

export const {
  useDeleteAvatarMutation,
  useFollowingUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileQuery,
  useGetPublicUserProfileByIdQuery,
  useGetUserQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi

export const { getPublicUserProfileById } = profileApi.endpoints
