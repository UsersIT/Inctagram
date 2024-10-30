import { Post, PostImages, PostsResponseType } from '../types/api'

export const transformPosts = (posts: PostsResponseType[]): Post[] => {
  return posts.map(post => ({
    avatarOwner: post.avatarOwner,
    createdAt: post.createdAt,
    description: post.description,
    id: post.id,
    images: post.images
      ? (post.images.map(image => ({
          ...image,
          createdAt: post.createdAt,
        })) as PostImages[])
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
