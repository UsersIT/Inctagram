import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import { GetNotificationsArg, GetNotificationsResponse, MarkAsReadArg } from '../model/types/api'

const PAGE_SIZE = 20

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArg>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, response, { arg }) => {
        if (!arg.cursor) {
          return currentCache
        }

        if (response.items && response.items?.length > 0) {
          currentCache.items?.push(...response.items)
        }
      },
      query: ({ cursor, pageSize = PAGE_SIZE }) => ({
        params: { cursor, pageSize, sortBy: 'id', sortDirection: 'desc' },
        url: `${apiEndpoints.notifications.notifications}${cursor || ''}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    markAsRead: builder.mutation<void, MarkAsReadArg>({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
            arg.ids.forEach(id => {
              const notification = draft.items?.find(item => item.id === id)

              if (notification) {
                notification.isRead = true
              }
              draft.notReadCount = 0
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: apiEndpoints.notifications.markAsRead,
      }),
    }),
  }),
})

export const { useGetNotificationsQuery, useMarkAsReadMutation, util } = notificationsApi
