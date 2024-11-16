import React, { useEffect, useState } from 'react'

import { Post, PostImageCard } from '@/src/entities/post'
import { useInfiniteScroll, useTranslation } from '@/src/shared/hooks'
import { ScrollArea, ScrollBar, Spinner, Typography } from '@/src/shared/ui'
import { eventEmitter } from '@/src/shared/utility'
import { useGetPostsQuery } from '@/src/widgets/post-modal'
import clsx from 'clsx'

import s from './PostsList.module.scss'

import { transformPosts } from '../../model/helpers/transformPosts'

type Props = {
  className?: string
  onOpenPost: (postId: number) => void
  profileId: number
  username: string
}

export const PostsList = ({ className, onOpenPost, profileId, username }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

  const { data: postsList, isFetching, refetch } = useGetPostsQuery({ username })

  useEffect(() => {
    setPosts([])
    setHasMorePosts(true)
  }, [profileId])

  useEffect(() => {
    if (postsList && postsList.items.length > 0) {
      const transformedPosts = transformPosts(postsList.items)

      setPosts(prevPosts => [...prevPosts, ...transformedPosts])
      setLoadingMore(false)
    } else if (postsList && postsList.items.length === 0) {
      setHasMorePosts(false)
      setLoadingMore(false)
    }
  }, [postsList])

  useEffect(() => {
    const emitterPostCreated = () => {
      setPosts([])
      refetch()
    }

    const emitterPostEdited = () => {
      setHasMorePosts(true)
      setPosts([])
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
