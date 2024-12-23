import type { NotificationType, NotificationsSocketResponse } from '../types/notification'

import { AppDispatch } from '@/src/shared/store'

import { util } from '../../api/notificationsApi'

export const updateNotificationsData = (dispatch: AppDispatch) => {
  return (data: NotificationsSocketResponse) => {
    const newNotification = {
      createdAt: data.createdAt,
      id: data.id,
      isRead: data.isRead,
      message: data.message,
      notifyAt: data.notifyAt,
    } satisfies NotificationType

    dispatch(
      util.updateQueryData('getNotifications', {}, draft => {
        const notificationExists = draft.items?.some(
          notification => notification.id === newNotification.id
        )

        if (!notificationExists) {
          draft.items?.unshift(newNotification)
          draft.notReadCount++
        }
      })
    )
  }
}
