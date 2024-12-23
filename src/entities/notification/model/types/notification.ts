export type NotificationType = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type NotificationsSocketResponse = {
  clientId: string
  createdAt: string
  eventType: number
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}
