import React, { useEffect, useState } from 'react'

import { Heart, ImageIcon } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import {
  Avatar,
  Carousel,
  Modal,
  type ModalProps,
  ScrollArea,
  ScrollBar,
  Typography,
} from '@/src/shared/ui'
import { getFormattedDate } from '@/src/shared/utility'
import { useRouter } from 'next/router'

import s from './PublicPostModal.module.scss'

import { useGetPublicPostByIdQuery } from '../../api/publicPost'
import { PostComments } from '../PostComments/PostComments'
import { PostDescription } from '../PostDescription/PostDescription'

type Props = {
  postId: number
} & ModalProps

export const PublicPostModal: React.FC<Props> = ({ postId, ...props }) => {
  const [date, setDate] = useState('')

  const { t } = useTranslation()
  const router = useRouter()

  const { data: post, isLoading: isLoadingPost } = useGetPublicPostByIdQuery(postId)

  useEffect(() => {
    if (post && router) {
      const date = getFormattedDate(post.createdAt, router.locale as string)

      setDate(date)
    }
  }, [post, router])

  return (
    <Modal size={'xlg'} {...props} className={s.modal} withoutHeader>
      <div className={s.content}>
        <div className={s.sliderContainer}>
          {!isLoadingPost && post && post.images.length ? (
            <Carousel
              buttonsClassName={s.sliderButtons}
              className={s.slider}
              imagesUrl={post?.images as { url: string }[]}
            />
          ) : (
            <ImageIcon />
          )}
        </div>
        <header className={s.avatarContainer}>
          <Avatar circle height={36} iconSize={24} url={post?.avatarOwner || ''} width={36} />
          <Typography aria-label={post?.userName} as={'h3'} variant={'h3'}>
            {post?.userName || ''}
          </Typography>
        </header>
        <ScrollArea className={s.scrollArea}>
          {post?.description && (
            <PostDescription
              className={s.description}
              description={post.description}
              userName={post.userName}
            />
          )}
          <PostComments postId={postId} />
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>

        <div className={s.stats}>
          <div className={s.likes}>
            <Typography
              aria-label={`${post?.likesCount} ${t.widgets.postModal.likes}`}
              as={'span'}
              variant={'regular-text-14'}
            >
              {post?.likesCount ?? ''}
            </Typography>
            <span aria-hidden className={s.heart}>
              <Heart />
            </span>
          </div>
          <Typography
            aria-label={`${t.time.postedOn} ${date}`}
            as={'small'}
            className={s.date}
            variant={'small-text'}
          >
            {date}
          </Typography>
        </div>
      </div>
    </Modal>
  )
}
