import { baseApi } from '@/src/shared/api/baseApi'
import { getSocket } from '@/src/shared/api/socketApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import { GetNotificationsArg, GetNotificationsResponse, MarkAsReadArg } from '../model/types/api'
import { NotificationType } from '../model/types/notification'

const EVENT = 'NOTIFICATION'
const PAGE_SIZE = 12

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArg>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, response) => {
        if (response.items && response.items?.length > 0) {
          currentCache.items?.push(...response.items)
        }
      },
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const socket = getSocket()
        const listener = (data: NotificationType) => {
          updateCachedData(draft => {
            draft.items?.unshift(data)
          })
        }

        try {
          await cacheDataLoaded
          socket.on(EVENT, listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`, in which case `cacheDataLoaded` will throw
        }

        await cacheEntryRemoved

        socket.off(EVENT, listener)
      },
      query: ({ cursor, pageSize = PAGE_SIZE }) => ({
        params: { pageSize, sortBy: 'notifyAt', sortDirection: 'desc' },
        url: `${apiEndpoints.notifications.notifications}${cursor ?? ''}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    markAsRead: builder.mutation<void, MarkAsReadArg>({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotifications', { cursor: null }, draft => {
            arg.ids.forEach(id => {
              const notification = draft.items?.find(item => item.id === id)

              if (notification) {
                notification.isRead = true
              }
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

export const { useGetNotificationsQuery, useMarkAsReadMutation } = notificationsApi
