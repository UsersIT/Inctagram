import React, { useEffect, useState } from 'react'

import { type Post, PostImageCard } from '@/src/entities/post'
import { useTranslation } from '@/src/shared/hooks'
import { ScrollArea, ScrollBar, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PostsList.module.scss'

import { useGetUserPublicPostsQuery } from '../../api/postApi'
import { transformPosts } from '../../model/helpers/transformPosts'

type Props = {
  className?: string
  onOpenPost: (postId: number) => void
  profileId: number
}

export const PostsList = ({ className, onOpenPost, profileId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const { t } = useTranslation()
  const { data: newPosts } = useGetUserPublicPostsQuery({
    endCursorPostId: posts.length ? posts[posts.length - 1].id : 0,
    pageSize: 8,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    userId: profileId,
  })

  useEffect(() => {
    if (newPosts && newPosts.items.length > 0) {
      const transformedPosts = transformPosts(newPosts.items)

      setPosts(prevPosts => [...prevPosts, ...transformedPosts])
    }
  }, [newPosts])

  return (
    <ScrollArea className={s.scrollArea}>
      <div className={clsx(s.list, className)}>
        {posts.map(post => (
          <PostImageCard
            alt={post.description || 'No description available'}
            height={228}
            key={post.id}
            onOpenModal={() => onOpenPost(post.id)} // Вызов функции открытия модального окна
            src={post.images?.[0]?.url || 'https://placehold.co/300x300?text=No+Image'}
            width={234}
          />
        ))}
        {posts.length === 0 && (
          <Typography variant={'bold-text-14'}>{t.profile.noPublications}</Typography>
        )}
      </div>
      <ScrollBar orientation={'horizontal'} />
    </ScrollArea>
  )
}
