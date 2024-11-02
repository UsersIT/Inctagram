import React from 'react'

import { EditPostForm } from '@/src/features/EditPostForm'
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
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [postDescription, setPostDescription] = React.useState<string | undefined>(undefined)

  const { data: post, isLoading } = useGetPublicPostByIdQuery(postId)
  const { data: meData } = useMeQuery()

  const isMyProfile = profileId === meData?.userId

  React.useEffect(() => {
    if (post) {
      setPostDescription(post.description)
    }
  }, [post])

  const handleEditClick = () => {
    setIsEditMode(true)
    setIsDropdownOpen(false)
  }

  const handleSuccess = (newDescription: string) => {
    setIsEditMode(false)
    setPostDescription(newDescription)
  }

  return (
    <Modal
      className={s.modal}
      showCloseButton
      title={t.widgets.postModal.editPost}
      withoutHeader={!isEditMode}
      {...props}
      size={'xlg'}
    >
      <div className={s.content}>
        <div className={s.sliderContainer}>
          {(isLoading || !post?.images?.length) && <ImageIcon />}
          {post?.images?.length && post.images.length > 0 && (
            <Carousel
              buttonsClassName={s.sliderButtons}
              className={s.slider}
              imagesUrl={post.images}
            />
          )}
        </div>
        <header className={s.avatarContainer}>
          <Avatar circle height={36} iconSize={24} url={post?.avatarOwner || ''} width={36} />
          <Typography aria-label={post?.userName} as={'h3'} variant={'h3'}>
            {post?.userName || ''}
          </Typography>
          {isMyProfile && !isEditMode && (
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
        {isEditMode ? (
          <EditPostForm
            initialDescription={postDescription || ''}
            onSuccess={handleSuccess}
            postId={postId}
          />
        ) : (
          <ScrollArea className={s.scrollArea}>
            {postDescription && (
              <PostDescription
                className={s.description}
                description={postDescription}
                userName={post?.userName ? post.userName : ''}
              />
            )}
            {post && <PostComments postId={postId} />}
            <ScrollBar orientation={'horizontal'} />
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
          </ScrollArea>
        )}
      </div>
    </Modal>
  )
}
