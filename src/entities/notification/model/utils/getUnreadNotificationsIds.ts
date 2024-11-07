import { NotificationType } from '../types/notification'

export const getUnreadNotificationsIds = (notifications: NotificationType[] = []) => {
  return (
    notifications.reduce((acc: number[], item) => {
      if (!item.isRead) {
        acc.push(item.id)
      }

      return acc
    }, []) || []
  )
}
