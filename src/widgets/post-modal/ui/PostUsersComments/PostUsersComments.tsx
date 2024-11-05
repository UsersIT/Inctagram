import React, { useState } from 'react'

import { CommentCard } from '@/src/entities/comment'
import { Heart, HeartOutline } from '@/src/shared/assets/icons'
import { useIntersection, useTranslation } from '@/src/shared/hooks'
import { Time, Typography } from '@/src/shared/ui'
import { useGetCommentsQuery } from '@/src/widgets/post-modal/api/userPostApi'

import s from './PostUsersComments.module.scss'

type Props = {
  postId: number
}

export const PostUsersComments: React.FC<Props> = ({ postId }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const { t } = useTranslation()

  const { data: comments, isFetching: isLoadingComments } = useGetCommentsQuery({
    pageNumber,
    pageSize: 10,
    postId,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  const hasMoreComments = (comments && comments.totalCount > pageNumber * 10) || false

  const handleLoadMore = () => {
    if (hasMoreComments) {
      setPageNumber(prev => prev + 1)
    }
  }

  const lastCommentRef = useIntersection<HTMLLIElement>(
    handleLoadMore,
    isLoadingComments,
    hasMoreComments
  )

  return (
    <div className={s.container}>
      {comments?.items && comments.items.length > 0 ? (
        <ul aria-label={t.widgets.postModal.comments} className={s.comments} role={'list'}>
          {comments.items.map((comment, idx) => (
            <Typography
              aria-label={`${t.widgets.postModal.comment} ${idx + 1}`}
              as={'li'}
              key={comment.id}
              ref={idx === comments.items.length - 1 ? lastCommentRef : null}
              role={'list-item'}
            >
              <CommentCard
                className={s.comment}
                comment={comment}
                likeToggle={
                  <Typography aria-hidden as={'span'} className={s.heart} onClick={() => {}}>
                    {/* { <Heart /> : <HeartOutline />}*/}
                    <Heart />
                  </Typography>
                }
                stats={
                  <div className={s.stats}>
                    <Time time={comment.createdAt} />
                    <Typography as={'span'} variant={'small-text'}>
                      {t.widgets.postModal.likes}: {comment.likeCount}
                    </Typography>
                    <Typography as={'span'} variant={'small-text'}>
                      {t.widgets.postModal.answer}
                    </Typography>
                  </div>
                }
              />
            </Typography>
          ))}
        </ul>
      ) : (
        <Typography as={'p'} className={s.noComments} variant={'regular-text-14'}>
          {t.widgets.postModal.noComments}
        </Typography>
      )}
      {isLoadingComments && (
        <Typography as={'p'} className={s.loading} variant={'regular-text-14'}>
          {t.widgets.postModal.editPost}
        </Typography>
      )}
    </div>
  )
}
