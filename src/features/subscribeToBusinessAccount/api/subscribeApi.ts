import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import { SubscribeRequestBody, SubscribeResponse } from '../model/types/api'

const subscribeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    subscribe: builder.mutation<SubscribeResponse, SubscribeRequestBody>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const res = await queryFulfilled

          if (res.data) {
            window.location.assign(res.data.url)
          }
        } catch (err) {
          console.log(err)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: apiEndpoints.subscriptions.subscribe,
      }),
    }),
  }),
})

export const { useSubscribeMutation } = subscribeApi
