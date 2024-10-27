import type { UpdateTokensResult } from '../types/api'
import type { RootState } from '@/src/app/providers/store'
import type { Action, PayloadAction } from '@reduxjs/toolkit'

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { HYDRATE } from 'next-redux-wrapper'

import { BASE_API_URL, apiEndpoints } from '../constants/api'
import { tokenStorage } from '../storage'

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = tokenStorage.getToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const customFetchBase: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          { method: 'POST', url: apiEndpoints.auth.updateTokens },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const { accessToken } = refreshResult.data as UpdateTokensResult

          tokenStorage.setToken(accessToken)
          result = await baseQuery(args, api, extraOptions)
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  baseQuery: customFetchBase,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'UserPosts'],
})
