import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Post } from '@/src/entities/post'
import { PostDescription } from '@/src/entities/post/ui/PostDescription/PostDescription'
import { useMeQuery } from '@/src/features/auth'
import { useGetPublicPostByIdQuery } from '@/src/features/posts'
import { Heart, HeartOutline, ImageIcon } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import {
  Carousel,
  Modal,
  type ModalProps,
  ScrollArea,
  ScrollBar,
  Typography,
} from '@/src/shared/ui'
import { getFormattedDate } from '@/src/shared/utility'
import { useUpdateLikeStatusMutation } from '@/src/widgets/post-modal/api/userPostApi'
import { PostUsersComments } from '@/src/widgets/post-modal/ui/PostUsersComments/PostUsersComments'
import { useRouter } from 'next/router'

import s from './PostModal.module.scss'

import { ConfirmationEditPostModal } from './../ConfirmationEditPostModal/ConfirmationEditPostModal'
import { EditPostForm } from './../EditPostForm/EditPostForm'
import { PostHeader } from './../PostHeader/PostHeader'

type Props = {
  postId: number
  profileId: number
} & ModalProps

export const PostModal: React.FC<Props> = ({ postId, profileId, ...props }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [postData, setPostData] = useState<Post | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { data: post, isLoading, refetch } = useGetPublicPostByIdQuery(postId)
  const { data: meData } = useMeQuery()
  const [updateLikeStatus] = useUpdateLikeStatusMutation()
  const isMyProfile = profileId === meData?.userId

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  const handleEditClick = () => {
    setIsEditMode(true)
    setIsDropdownOpen(false)
  }

  const handleSuccess = (newDescription: string) => {
    if (postData) {
      setPostData(prev => {
        if (prev) {
          return { ...prev, description: newDescription }
        }

        return prev
      })
    }
    setIsEditMode(false)
    setHasUnsavedChanges(false)
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmation(true)
    } else {
      props.onClose?.()
    }
  }

  const confirmClose = () => {
    setShowConfirmation(false)
    props.onClose?.()
  }

  const cancelClose = () => {
    setShowConfirmation(false)
  }

  const toggleLike = async () => {
    if (!postData) {
      return
    }
    const newStatus = postData.isLiked ? 'NONE' : 'LIKE'
    const updatedLikesCount = postData.isLiked ? postData.likesCount - 1 : postData.likesCount + 1

    setPostData(prev => {
      if (prev) {
        return {
          ...prev,
          isLiked: !prev.isLiked,
          likesCount: updatedLikesCount,
        }
      }

      return prev
    })
    try {
      await updateLikeStatus({ likeStatus: newStatus, postId }).unwrap()
      refetch()
    } catch (error) {
      toast.error(t.errors.updateLikeError)
      setPostData(prev => {
        if (prev) {
          return {
            ...prev,
            isLiked: postData.isLiked,
            likesCount: postData.likesCount,
          }
        }

        return prev
      })
    }
  }

  return (
    <>
      <Modal
        className={s.modal}
        showCloseButton
        title={t.widgets.postModal.editPost}
        withoutHeader={!isEditMode}
        {...props}
        onClose={handleClose}
        size={'xlg'}
      >
        <div className={s.content}>
          <div className={s.sliderContainer}>
            {(isLoading || !postData?.images || postData.images.length === 0) && <ImageIcon />}
            {postData?.images && postData.images.length > 0 && (
              <Carousel
                buttonsClassName={s.sliderButtons}
                className={s.slider}
                imagesUrl={postData.images}
              />
            )}
          </div>
          <PostHeader
            avatarUrl={postData?.avatarOwner || ''}
            className={s.avatarContainer}
            isDropdownOpen={isDropdownOpen}
            isEditMode={isEditMode}
            isMyProfile={isMyProfile}
            onDropdownOpenChange={setIsDropdownOpen}
            onEditClick={handleEditClick}
            userName={postData?.userName || ''}
          />

          {isEditMode ? (
            <EditPostForm
              initialDescription={postData?.description || ''}
              onSuccess={handleSuccess}
              postId={postId}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          ) : (
            <>
              <ScrollArea className={s.scrollArea}>
                {postData?.description && (
                  <PostDescription
                    className={s.description}
                    description={postData.description}
                    userName={postData?.userName || ''}
                  />
                )}
                {postData && <PostUsersComments postId={postId} />}
                <ScrollBar orientation={'horizontal'} />
              </ScrollArea>

              <div className={s.stats}>
                <div className={s.likes}>
                  <Typography
                    aria-label={`${postData?.likesCount} ${t.widgets.postModal.likes}`}
                    as={'span'}
                    variant={'regular-text-14'}
                  >
                    {postData?.likesCount}
                  </Typography>
                  <Typography aria-hidden as={'span'} className={s.heart} onClick={toggleLike}>
                    {postData?.isLiked ? <Heart /> : <HeartOutline />}
                  </Typography>
                </div>
                <Typography
                  aria-label={`${t.time.postedOn} ${postData?.createdAt ? getFormattedDate(postData.createdAt, router.locale as string) : ''}`}
                  as={'small'}
                  className={s.date}
                  variant={'small-text'}
                >
                  {postData?.createdAt
                    ? getFormattedDate(postData.createdAt, router.locale as string)
                    : ''}
                </Typography>
              </div>
            </>
          )}
        </div>
      </Modal>
      <ConfirmationEditPostModal
        isOpen={showConfirmation}
        onClose={cancelClose}
        onConfirm={confirmClose}
      />
    </>
  )
}
