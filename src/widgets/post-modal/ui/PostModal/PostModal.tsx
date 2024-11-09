import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { type Post, PostDescription } from '@/src/entities/post'
import { useMeQuery } from '@/src/features/auth'
import { useGetPublicPostByIdQuery } from '@/src/features/posts'
import { ImageIcon } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Carousel, Modal, type ModalProps, ScrollArea, ScrollBar } from '@/src/shared/ui'
import { DeleteConfirmationModal } from '@/src/widgets/post-modal/ui/DeleteConfirmationModal/DeleteConfirmationModal'

import s from './PostModal.module.scss'

import { useDeletePostByIdMutation, useUpdateLikeStatusMutation } from './../../api/userPostApi'
import { AddCommentForm } from './../AddCommentForm/AddCommentForm'
import { ConfirmationEditPostModal } from './../ConfirmationEditPostModal/ConfirmationEditPostModal'
import { EditPostForm } from './../EditPostForm/EditPostForm'
import { PostHeader } from './../PostHeader/PostHeader'
import { PostStats } from './../PostStats/PostStats'
import { PostUsersComments } from './../PostUsersComments/PostUsersComments'

type Props = {
  postId: number
  profileId: number
} & ModalProps

export const PostModal: React.FC<Props> = ({ postId, profileId, ...props }) => {
  const { t } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [postData, setPostData] = useState<Post | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const { data: post, isLoading, refetch } = useGetPublicPostByIdQuery(postId)
  const { data: meData } = useMeQuery()
  const [updateLikeStatus] = useUpdateLikeStatusMutation()
  const [deletePost] = useDeletePostByIdMutation()
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
    if (isEditMode && hasUnsavedChanges) {
      setShowConfirmation(true)
    } else {
      props.onClose?.()
    }
  }

  const confirmClose = () => {
    setShowConfirmation(false)
    setIsEditMode(false)
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

  const onCommentAdded = () => {
    setShouldRefetchComments(prev => !prev)
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false)
    try {
      await deletePost({ postId }).unwrap()
    } catch (error) {
      toast.error(t.errors.errorWord)
    }
  }

  return (
    <>
      <Modal
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
            onDeleteClick={handleDeleteClick}
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
                <PostUsersComments postId={postId} refetchTrigger={shouldRefetchComments} />
                <ScrollBar orientation={'horizontal'} />
              </ScrollArea>
              <PostStats postData={postData} toggleLike={toggleLike} />
              <AddCommentForm onCommentAdded={onCommentAdded} postId={postId} />
            </>
          )}
        </div>
      </Modal>
      <ConfirmationEditPostModal
        isOpen={showConfirmation}
        onClose={cancelClose}
        onConfirm={confirmClose}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
