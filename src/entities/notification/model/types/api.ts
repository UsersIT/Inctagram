import { NotificationType } from './notification'

export type GetNotificationsArg = {
  cursor: null | number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetNotificationsResponse = {
  items?: NotificationType[]
  pageSize: number
  totalCount: number
}

export type MarkAsReadArg = {
  ids: number[]
}
