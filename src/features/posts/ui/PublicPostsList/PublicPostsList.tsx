import React, { useEffect, useState } from 'react'

import { type Post, PostImageCard } from '@/src/entities/post'
import { useInfiniteScroll, useTranslation } from '@/src/shared/hooks'
import { ScrollArea, ScrollBar, Spinner, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './PublicPostsList.module.scss'

import { useGetUserPublicPostsQuery } from '../../api/postApi'
import { transformPosts } from '../../model/helpers/transformPosts'

type Props = {
  className?: string
  onOpenPost: (postId: number) => void
  profileId: number
}

export const PublicPostsList = ({ className, onOpenPost, profileId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

  const { data: postsResponse, isFetching } = useGetUserPublicPostsQuery(
    {
      endCursorPostId: posts.length ? posts[posts.length - 1].id : 0,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: profileId,
    },
    { skip: !profileId || !hasMorePosts }
  )

  useEffect(() => {
    setPosts([])
    setHasMorePosts(true)
  }, [profileId])

  useEffect(() => {
    if (postsResponse && postsResponse.items.length > 0) {
      const transformedPosts = transformPosts(postsResponse.items)

      setPosts(prevPosts => [...prevPosts, ...transformedPosts])
      setLoadingMore(false)
    } else if (postsResponse && postsResponse.items.length === 0) {
      setHasMorePosts(false)
      setLoadingMore(false)
    }
  }, [postsResponse])

  const loadMoreHandler = () => {
    if (!loadingMore && hasMorePosts) {
      setLoadingMore(true)
    }
  }

  const setLoadMoreRef = useInfiniteScroll(loadMoreHandler)

  return (
    <ScrollArea className={s.scrollArea}>
      <div className={clsx(s.postList, className)}>
        {posts.map(post => (
          <PostImageCard
            alt={post.description || 'No description available'}
            height={228}
            key={post.id}
            onOpenModal={() => onOpenPost(post.id)}
            src={post.images?.[0]?.url || 'https://placehold.co/300x300?text=No+Image'}
            width={234}
          />
        ))}
        {isFetching && <Spinner />}
        {posts.length === 0 && !isFetching && (
          <Typography variant={'bold-text-14'}>{t.profile.noPublications}</Typography>
        )}
      </div>
      {hasMorePosts && <div className={s.loadMoreTrigger} ref={setLoadMoreRef}></div>}
      <ScrollBar orientation={'horizontal'} />
    </ScrollArea>
  )
}
