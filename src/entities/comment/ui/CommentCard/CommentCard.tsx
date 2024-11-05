import type { Comment } from '../../model/types/comment'

import React from 'react'

import { Heart } from '@/src/shared/assets/icons'
import { Avatar, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './CommentCard.module.scss'

type Props = {
  comment: Comment
  /* slot for 'like' toggle button */
  likeToggle?: React.ReactNode
  /* slot for time ago, like count, answer button */
  stats?: React.ReactNode
  statsClassName?: string
} & React.ComponentProps<'div'>
export const CommentCard: React.FC<Props> = props => {
  const { className, comment, likeToggle, stats, statsClassName, ...rest } = props

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <div className={s.comment}>
        <Avatar
          circle
          height={36}
          iconSize={24}
          url={comment.from.avatars[0]?.url || ''}
          width={36}
        />
        <div>
          <Typography as={'h3'} className={s.content} variant={'h3'}>
            {comment.from.username}{' '}
          </Typography>
          <Typography as={'p'} className={s.content} variant={'regular-text-14'}>
            {comment.content}
          </Typography>
          {stats && <div className={clsx(s.stats, statsClassName)}>{stats}</div>}
        </div>
      </div>
      {likeToggle && <div>{likeToggle}</div>}
    </div>
  )
}
