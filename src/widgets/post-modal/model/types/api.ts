import type { Comment } from '@/src/entities/comment'

import { GetAllPublicPostsArgs } from '@/src/features/posts/model/types/api'

export type GetCommentsParams = {
  pageNumber?: number // Optional
  pageSize?: number // Optional
  postId: number
  sortBy?: string // Optional
  sortDirection?: 'asc' | 'desc' // Optional, default is 'desc'
}

export type GetCommentsResponse = {
  items: Comment[] // Use the Comment type here
  pageSize: number
  totalCount: number
}

export type GetUserPostsParams = {
  query?: GetAllPublicPostsArgs
  username: string
}
