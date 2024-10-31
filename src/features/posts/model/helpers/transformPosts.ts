import type { Post } from '@/src/entities/post'

export const transformPosts = (posts: Post[]): Post[] => {
  return posts.map(post => ({
    avatarOwner: post.avatarOwner,
    createdAt: post.createdAt,
    description: post.description,
    id: post.id,
    images: post.images
      ? post.images.map(image => ({
          ...image,
          createdAt: post.createdAt,
        }))
      : [],
    isLiked: false,
    likesCount: 0,
    location: post.location,
    owner: post.owner,
    ownerId: post.ownerId,
    updatedAt: post.updatedAt,
    userName: post.userName,
  }))
}
