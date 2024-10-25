import React, { useState } from 'react'

import { CommentCard } from '@/src/entities/comment'
import { useIntersection, useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'

import s from './PostComments.module.scss'

import { DEFAULT_PAGE_NUMBER, useGetPublicCommentsByPostIdQuery } from '../../api/publicPost'

type Props = {
  postId: number
}

export const PostComments: React.FC<Props> = ({ postId }) => {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER)

  const { t } = useTranslation()

  const { data: comments, isFetching: isLoadingComments } = useGetPublicCommentsByPostIdQuery({
    pageNumber,
    postId,
  })

  const hasMoreComments = (comments && comments.pagesCount > pageNumber) || false

  const handleLoadMore = () => {
    setPageNumber(prev => prev + 1)
  }

  const lastCommentRef = useIntersection<HTMLLIElement>(
    handleLoadMore,
    isLoadingComments,
    hasMoreComments
  )

  return (
    <div className={s.container}>
      {comments?.items && comments?.items?.length > 0 ? (
        <ul aria-label={t.widgets.postModal.comments} className={s.comments} role={'list'}>
          {comments?.items?.map((comment, idx) => (
            <li
              aria-label={`${t.widgets.postModal.comment} ${idx + 1}`}
              key={comment.id}
              ref={idx === comments?.items!.length - 1 ? lastCommentRef : null}
              role={'listitem'}
            >
              <CommentCard
                className={s.comment}
                comment={comment}
                // stats={<Time time={comment.createdAt} />}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Typography as={'p'} className={s.noComments} variant={'regular-text-14'}>
          {t.widgets.postModal.noComments}
        </Typography>
      )}
    </div>
  )
}
