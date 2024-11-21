import { NotificationType } from './notification'

export type GetNotificationsArg = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetNotificationsResponse = {
  items?: NotificationType[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type MarkAsReadArg = {
  ids: number[]
}
