import React from 'react'

import { useMeQuery } from '@/src/features/auth'
import { useGetPublicPostByIdQuery } from '@/src/features/posts'
import { Dots, Edit, Heart, ImageIcon, Trash } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import {
  Avatar,
  Carousel,
  DropdownMenu,
  Modal,
  type ModalProps,
  ScrollArea,
  ScrollBar,
  Typography,
} from '@/src/shared/ui'
import { getFormattedDate } from '@/src/shared/utility'
import { useRouter } from 'next/router'

import s from './PublicPostModal.module.scss'

import { PostComments } from '../PostComments/PostComments'
import { PostDescription } from '../PostDescription/PostDescription'

type Props = {
  postId: number
  profileId: number
} & ModalProps

export const PublicPostModal: React.FC<Props> = ({ postId, profileId, ...props }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false) // Новое состояние для окна редактирования

  const { data: post, isLoading } = useGetPublicPostByIdQuery(postId)
  const { data: meData } = useMeQuery()

  const isMyProfile = profileId === meData?.userId

  const handleEditClick = () => {
    setIsEditModalOpen(true) // Открываем модальное окно для редактирования
  }

  return (
    <Modal className={s.modal} {...props} size={'xlg'} withoutHeader>
      <div className={s.content}>
        <div className={s.sliderContainer}>
          {(isLoading || !post?.images.length) && <ImageIcon />}
          {post && post.images?.length > 0 && (
            <Carousel
              buttonsClassName={s.sliderButtons}
              className={s.slider}
              imagesUrl={post.images as { url: string }[]}
            />
          )}
        </div>
        <header className={s.avatarContainer}>
          <Avatar circle height={36} iconSize={24} url={post?.avatarOwner || ''} width={36} />
          <Typography aria-label={post?.userName} as={'h3'} variant={'h3'}>
            {post?.userName || ''}
          </Typography>
          {isMyProfile && (
            <DropdownMenu
              onOpenChange={setIsDropdownOpen}
              open={isDropdownOpen}
              style={{ left: '-60px', maxWidth: '180px' }}
              trigger={<Dots className={s.dots} />}
            >
              <div className={s.menuItem} onClick={handleEditClick}>
                <Edit /> {t.widgets.postModal.editPost}
              </div>
              <div className={s.menuItem}>
                <Trash /> {t.widgets.postModal.deletePost}
              </div>
            </DropdownMenu>
          )}
        </header>
        <ScrollArea className={s.scrollArea}>
          {post?.description && (
            <PostDescription
              className={s.description}
              description={post.description}
              userName={post.userName}
            />
          )}
          {post && <PostComments postId={postId} />}
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>

        <div className={s.stats}>
          <div className={s.likes}>
            <Typography
              aria-label={`${post?.likesCount} ${t.widgets.postModal.likes}`}
              as={'span'}
              variant={'regular-text-14'}
            >
              {post?.likesCount ?? 0}
            </Typography>
            <span aria-hidden className={s.heart}>
              <Heart />
            </span>
          </div>
          <Typography
            aria-label={`${t.time.postedOn} ${post?.createdAt ? getFormattedDate(post.createdAt, router.locale as string) : ''}`}
            as={'small'}
            className={s.date}
            variant={'small-text'}
          >
            {post?.createdAt ? getFormattedDate(post.createdAt, router.locale as string) : ''}
          </Typography>
        </div>
      </div>

      {/* Модальное окно для редактирования поста */}
      <Modal
        className={s.editModal}
        onClose={() => setIsEditModalOpen(false)}
        open={isEditModalOpen} // Указываем состояние для открытия окна
        size={'md'}
      >
        <div>Здесь будет форма для редактирования поста</div>
        {/* Включите форму и элементы управления для редактирования поста */}
      </Modal>
    </Modal>
  )
}
