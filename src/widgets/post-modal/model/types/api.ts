import type { Comment } from '@/src/entities/comment'

import { GetAllPublicPostsArgs, ImageType } from '@/src/features/posts'

export type GetCommentsParams = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetCommentsResponse = {
  items: Comment[]
  pageSize: number
  totalCount: number
}

export type GetUserPostsParams = {
  query?: GetAllPublicPostsArgs
  username: string
}

export type CommentsResponseType = {
  content: string
  createdAt: Date
  from: {
    avatars: ImageType[]
    id: number
    username: string
  }
  id: number
  postId: number
}

export type UploadIdType = {
  uploadId: string
}
