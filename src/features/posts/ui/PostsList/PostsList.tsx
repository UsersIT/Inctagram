import React, { useEffect, useState } from 'react'

import { type Post, PostImageCard } from '@/src/entities/post'
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
  userName: string
}

export const PostsList = ({ className, onOpenPost, profileId, userName }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const { t } = useTranslation()

  const {
    data: postsResponse,
    isFetching,
    refetch,
  } = useGetPostsQuery(
    {
      query: {
        pageNumber,
        pageSize: 8,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      },
      userName,
    },
    { skip: !userName }
  )

  useEffect(() => {
    setPosts([])
    setHasMorePosts(true)
  }, [profileId])

  useEffect(() => {
    if (postsResponse && postsResponse.items) {
      const transformedPosts = transformPosts(postsResponse.items)

      setPosts(prevPosts =>
        pageNumber === 1 ? transformedPosts : [...prevPosts, ...transformedPosts]
      )
      setHasMorePosts(postsResponse.items.length > 0)
      setLoadingMore(false)
    }
  }, [postsResponse])

  useEffect(() => {
    const updatePostsLists = () => {
      setPageNumber(1)
      refetch()
        .then(res => {
          if (res?.data) {
            const transformedPosts = transformPosts(res.data.items)

            setPosts(transformedPosts)
            setHasMorePosts(res.data.items.length > 0)
          }
        })
        .catch(err => {
          console.error('Failed to fetch posts:', err)
        })
    }

    eventEmitter.on('postEdited', updatePostsLists)
    eventEmitter.on('postCreated', updatePostsLists)
    eventEmitter.on('postDeleted', updatePostsLists)

    return () => {
      eventEmitter.off('postEdited', updatePostsLists)
      eventEmitter.off('postCreated', updatePostsLists)
      eventEmitter.off('postDeleted', updatePostsLists)
    }
  }, [refetch])

  const loadMoreHandler = () => {
    if (!loadingMore && hasMorePosts) {
      setLoadingMore(true)
      setPageNumber(prevPage => prevPage + 1)
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
