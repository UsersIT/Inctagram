import React, { useEffect, useState } from 'react'

import { type Post, PostImageCard } from '@/src/entities/post'
import { useInfiniteScroll, useTranslation } from '@/src/shared/hooks'
import { ScrollArea, ScrollBar, Spinner, Typography } from '@/src/shared/ui'
import { eventEmitter } from '@/src/shared/utility'
import clsx from 'clsx'

import s from './PostsList.module.scss'

import { transformPosts } from '../../model/helpers/transformPosts'
import { type GetUserPostsResponse } from './../../model/types/api'

type Props = {
  className?: string
  isFetching: boolean
  onOpenPost: (postId: number) => void
  postsResponse: GetUserPostsResponse
  profileId: number
  refetch: () => void
}

export const PostsList = ({
  className,
  isFetching,
  onOpenPost,
  postsResponse,
  profileId,
  refetch,
}: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

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

  useEffect(() => {
    const emitterPostCreated = () => {
      setPosts([])
      refetch()
    }

    const emitterPostEdited = () => {
      setPosts([])
      refetch()
    }

    const emitterPostDeleted = () => {
      setPosts([])
      refetch()
    }

    eventEmitter.on('postCreated', emitterPostCreated)
    eventEmitter.on('postEdit', emitterPostEdited)
    eventEmitter.on('postDeleted', emitterPostDeleted)

    return () => {
      eventEmitter.off('postCreated', emitterPostCreated)
      eventEmitter.off('postEdit', emitterPostEdited)
      eventEmitter.off('postDeleted', emitterPostDeleted)
    }
  }, [refetch])

  const loadMoreHandler = () => {
    if (!loadingMore && hasMorePosts) {
      setLoadingMore(true)
    }
  }

  const setLoadMoreRef = useInfiniteScroll(loadMoreHandler)

  return (
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
  )
}
