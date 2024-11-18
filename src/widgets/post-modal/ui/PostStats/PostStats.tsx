import React from 'react'

import {
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircleOutline,
  PaperPlane,
} from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import { getFormattedDate } from '@/src/shared/utility'
import { useRouter } from 'next/router'

import s from './PostStats.module.scss'

type PostStatsProps = {
  postData: {
    createdAt: string
    isLiked: boolean
    likesCount: number
  } | null
  toggleLike: () => void
}

export const PostStats: React.FC<PostStatsProps> = ({ postData, toggleLike }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className={s.stats}>
      <div className={s.likeSaveSetBlock}>
        <div className={s.likeAndSet}>
          <Typography aria-hidden as={'span'} className={s.heart} onClick={toggleLike}>
            {postData?.isLiked ? <Heart /> : <HeartOutline />}
          </Typography>
          <MessageCircleOutline className={s.message} onClick={() => {}} />
          <PaperPlane />
        </div>
        <BookmarkOutline />
      </div>
      <div className={s.viewsAndCount}>
        <div className={s.views}>
          {[0, 1, 2].map(el => (
            <div className={s.view} key={el}></div>
          ))}
        </div>
        <div className={s.count}>
          <Typography
            aria-label={`${postData?.likesCount} ${t.widgets.postModal.likes}`}
            as={'span'}
            variant={'regular-text-14'}
          >
            {postData?.likesCount}
          </Typography>
          <span aria-hidden className={s.heartCount}>
            <Heart />
          </span>
        </div>
      </div>
      <Typography
        aria-label={`${t.time.postedOn} ${postData?.createdAt ? getFormattedDate(postData.createdAt, router.locale as string) : ''}`}
        as={'small'}
        className={s.date}
        variant={'small-text'}
      >
        {postData?.createdAt ? getFormattedDate(postData.createdAt, router.locale as string) : ''}
      </Typography>
    </div>
  )
}
