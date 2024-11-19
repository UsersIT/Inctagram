import React, { useEffect, useState } from 'react'

import { type Post, PostImageCard } from '@/src/entities/post'
import { useTranslation } from '@/src/shared/hooks'
import { useInfiniteScroll } from '@/src/shared/hooks/useInfiniteScroll'
import { ScrollArea, ScrollBar, Spinner, Typography } from '@/src/shared/ui'
import eventEmitter from '@/src/shared/utility/EventEmitter'
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
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

  const { data: newPosts, isFetching } = useGetUserPublicPostsQuery(
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
    if (newPosts && newPosts.items.length > 0) {
      const transformedPosts = transformPosts(newPosts.items)

      setPosts(prevPosts => [...prevPosts, ...transformedPosts])
      setLoadingMore(false)
    } else if (newPosts && newPosts.items.length === 0) {
      setHasMorePosts(false)
      setLoadingMore(false)
    }
  }, [newPosts])

  useEffect(() => {
    const handlePostCreated = () => {
      setHasMorePosts(true)
      setPosts([])
    }

    const handlePostEdited = () => {
      setHasMorePosts(true)
      setPosts([])
    }

    const handlePostDeleted = () => {
      setHasMorePosts(true)
      setPosts([])
    }

    eventEmitter.on('postCreated', handlePostCreated)
    eventEmitter.on('postEdit', handlePostEdited)
    eventEmitter.on('postDeleted', handlePostDeleted)

    return () => {
      eventEmitter.off('postCreated', handlePostCreated)
      eventEmitter.off('postEdit', handlePostEdited)
      eventEmitter.off('postDeleted', handlePostDeleted)
    }
  }, [newPosts, posts])

  const loadMoreHandler = () => {
    if (!loadingMore && hasMorePosts) {
      setLoadingMore(true)
    }
  }

  const setLoadMoreRef = useInfiniteScroll(loadMoreHandler)

  return (
    <>
      <ScrollArea className={s.scrollArea}>
        <div className={clsx(s.list, className)}>
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
    </>
  )
}
