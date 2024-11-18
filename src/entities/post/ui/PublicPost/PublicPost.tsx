import type { Post } from '../../model/types/post'

import React, { useEffect, useRef, useState } from 'react'

import { ImageIcon } from '@/src/shared/assets/icons'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Avatar, Carousel, ScrollArea, ScrollBar, Time, Typography } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './PublicPost.module.scss'

type Props = {
  post: Post
}

export const PublicPost: React.FC<Props> = ({ post }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)

  const { t } = useTranslation()

  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      setShowReadMoreButton(
        descriptionRef.current.clientHeight !== descriptionRef.current.scrollHeight
      )
    }
  }, [])

  const toggleDescription: React.MouseEventHandler<HTMLButtonElement> = e => {
    setIsDescriptionOpen(prev => !prev)
    e.stopPropagation()
  }

  return (
    <article className={s.post}>
      <Link
        className={clsx(s.slider)}
        href={routes.POST(post.ownerId, post.id)}
        tabIndex={isDescriptionOpen ? -1 : 0}
      >
        {post.images.length ? (
          <Carousel
            buttonsClassName={s.sliderButtons}
            className={clsx(s.slider)}
            imagesUrl={post.images as { url: string }[]}
          />
        ) : (
          <div className={s.placeholder}>
            <ImageIcon />
          </div>
        )}
      </Link>
      <Link
        className={s.avatarContainer}
        href={routes.PROFILE(post.ownerId)}
        tabIndex={isDescriptionOpen ? -1 : 0}
      >
        <Avatar circle height={36} iconSize={24} url={post.avatarOwner} width={36} />
        <Typography as={'h3'} variant={'h3'}>
          {post.userName}
        </Typography>
      </Link>
      <div>
        <Time className={s.date} time={post.createdAt} />
        <div
          className={clsx(
            s.descriptionContainer,
            showReadMoreButton && !isDescriptionOpen && s.mask
          )}
        >
          <ScrollArea className={s.horizontalScroll}>
            <Typography className={s.description} ref={descriptionRef}>
              {post.description}
            </Typography>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          {showReadMoreButton && (
            <Typography
              as={'button'}
              className={s.showMoreButton}
              onClick={toggleDescription}
              tabIndex={isDescriptionOpen ? -1 : 0}
              variant={'regular-link'}
            >
              {t.buttons.showMore}
            </Typography>
          )}
        </div>
      </div>

      <div className={clsx(s.scrollArea, isDescriptionOpen && s.visible)}>
        <Link className={s.avatarContainer} href={routes.PROFILE(post.ownerId)}>
          <Avatar circle height={36} iconSize={24} url={post.avatarOwner} width={36} />
          <Typography as={'h3'} variant={'h3'}>
            {post.userName}
          </Typography>
        </Link>

        <Time className={s.date} time={post.createdAt} />

        <ScrollArea className={s.scroll}>
          <Typography className={s.openedDescription}>{post.description}</Typography>
          <Typography
            as={'button'}
            className={s.hideButton}
            onClick={toggleDescription}
            variant={'regular-link'}
          >
            {t.buttons.hide}
          </Typography>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
    </article>
  )
}
