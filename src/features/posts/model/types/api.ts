import { Post } from '@/src/entities/post'

export type ImageType = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type GetAllPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetUserPublicPostsArgs = GetAllPublicPostsArgs & {
  userId: number
}

export type GetUserPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export type GetPublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
