import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  GetCurrentPaymentSubscriptionsResponse,
  SubscribeRequestBody,
  SubscribeResponse,
} from '../model/types/api'

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: apiEndpoints.subscriptions.cancelAutoRenewal,
      }),
    }),
    getCurrentPaymentSubscriptions: builder.query<GetCurrentPaymentSubscriptionsResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.subscriptions.currentPaymentSubscriptions,
      }),
    }),
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

export const {
  useCancelAutoRenewalMutation,
  useGetCurrentPaymentSubscriptionsQuery,
  useSubscribeMutation,
} = subscriptionApi
