import type { Comment } from '@/src/entities/comment'

export type GetCommentsResponse = {
  items?: Comment[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type GetPublicCommentsArg = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
