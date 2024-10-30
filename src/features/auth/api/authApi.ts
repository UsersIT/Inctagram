import { baseApi } from '@/src/shared/api/baseApi'
import { BASE_URL, apiEndpoints } from '@/src/shared/constants/api'
import { tokenStorage } from '@/src/shared/storage'

import {
  LoginByGoogleRequest,
  LoginByGoogleResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  NewPasswordRequest,
  PasswordRecoveryRequest,
  RecoveryCodeCheckRequest,
  RegisterInput,
  RegistrationEmailResendingInput,
} from '../model/types/auth'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNewPassword: builder.mutation<void, NewPasswordRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: apiEndpoints.auth.newPassword,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      onQueryStarted: async (_, { queryFulfilled }) => {
        const res = await queryFulfilled

        tokenStorage.setToken(res.data.accessToken)
      },
      query: body => ({
        body,
        method: 'POST',
        url: apiEndpoints.auth.login,
      }),
    }),
    loginByGoogle: builder.mutation<LoginByGoogleResponse, LoginByGoogleRequest>({
      query: data => ({
        body: data,
        method: 'POST',
        url: apiEndpoints.auth.google,
      }),
    }),
    logout: builder.mutation<void, void>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          tokenStorage.removeToken()
          await queryFulfilled
          dispatch(baseApi.util.resetApiState())
        } catch (e) {
          console.warn(e)
        }
      },
      query: () => ({
        method: 'POST',
        url: apiEndpoints.auth.logout,
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: apiEndpoints.auth.me,
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryRequest>({
      query: data => ({
        body: data,
        method: 'POST',
        url: apiEndpoints.auth.passwordRecovery,
      }),
    }),
    recoveryCodeCheck: builder.mutation<void, RecoveryCodeCheckRequest>({
      query: data => ({
        body: data,
        method: 'POST',
        url: apiEndpoints.auth.checkRecoveryCode,
      }),
    }),
    registerUser: builder.mutation<void, RegisterInput>({
      query(data) {
        return {
          body: { ...data, baseUrl: BASE_URL },
          method: 'POST',
          url: apiEndpoints.auth.registration,
        }
      },
    }),
    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingInput>({
      query(data) {
        return {
          body: { ...data, baseUrl: BASE_URL },
          method: 'POST',
          url: apiEndpoints.auth.registrationEmailResending,
        }
      },
    }),
  }),
})

export const {
  useCreateNewPasswordMutation,
  useLazyMeQuery,
  useLoginByGoogleMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRecoveryCodeCheckMutation,
  useRegisterUserMutation,
  useRegistrationEmailResendingMutation,
} = authApi
