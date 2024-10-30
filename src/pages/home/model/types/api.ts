import type { Post } from '@/src/entities/post'

export type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
