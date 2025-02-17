import type { CroppedArea } from '../../../model/types/profilePhoto'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { CloseOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { Avatar, Button, Dialog, ImageUploader, Modal, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './ProfilePhotoEditor.module.scss'

import { getCroppedImageBlob } from '../../../model/helpers/getCroppedImageBlob'
import { CropperPhoto } from '../CropperPhoto/CropperPhoto'

type ProfilePhotoProps = {
  className?: string
  disabledDelete: boolean
  disabledUpdate: boolean
  photoUrlFromServer?: string
  setDeletePhoto: () => void
  setUpdatePhoto: (photo: FormData) => void
}

export const ProfilePhotoEditor: React.FC<ProfilePhotoProps> = ({
  className,
  disabledDelete,
  disabledUpdate,
  photoUrlFromServer,
  setDeletePhoto,
  setUpdatePhoto,
}) => {
  const { t } = useTranslation()
  const [photoUrl, setPhotoUrl] = useState<null | string>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (photoUrlFromServer) {
      setPhotoUrl(photoUrlFromServer)
    }
  }, [photoUrlFromServer])

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl)
      }
    }
  }, [photoUrl])

  const handleAddPhotoModal = () => {
    setOpenAddModal(!openAddModal)
    setPhotoUrl(null)
  }

  const handleSetPhoto = (photo: File) => {
    if (!navigator.onLine) {
      toast.error(t.errors.somethingWentWrong)

      return
    }

    setPhotoUrl(URL.createObjectURL(photo))
    setIsEditing(true)
  }

  const handleDeletePhotoDialogClose = () => {
    setOpenDeleteDialog(false)
  }

  const handleDeletePhoto = () => {
    setOpenDeleteDialog(false)
    setPhotoUrl(null)
    setDeletePhoto()
  }

  const handleEditorPhoto = async (cropArea: CroppedArea) => {
    try {
      const res = await getCroppedImageBlob({ crop: cropArea, imageSrc: photoUrl || '', t })

      await setUpdatePhoto(res as FormData)
      setOpenAddModal(false)
    } catch (error) {
      toast.error(t.errors.photoUpdateError)
    }
  }

  const handleCloseAddModal = () => {
    setPhotoUrl(null)
    setIsEditing(false)
    setOpenAddModal(false)
  }

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.wrapper}>
        <Avatar circle className={s.avatar} url={photoUrlFromServer} />

        {photoUrlFromServer && !disabledUpdate && (
          <div>
            <Button
              className={s.deleteButton}
              disabled={disabledDelete}
              onClick={() => setOpenDeleteDialog(true)}
              variant={'text'}
            >
              <CloseOutline className={s.closeIcon} />
            </Button>
            <Dialog
              cancelButtonTitle={t.buttons.cancelButtonTitle}
              className={s.dialog}
              confirmButtonTitle={t.buttons.confirmButtonTitle}
              onCancel={handleDeletePhotoDialogClose}
              onClose={handleDeletePhotoDialogClose}
              onConfirm={handleDeletePhoto}
              open={openDeleteDialog}
              showCancelButton
              title={t.profile.deletePhoto}
            >
              <Typography variant={'regular-text-16'}>{t.profile.deleteProfilePhoto}</Typography>
            </Dialog>
          </div>
        )}
      </div>
      <div>
        <Button
          className={s.addButton}
          disabled={disabledUpdate}
          onClick={() => {
            setOpenAddModal(true)
            setIsEditing(false)
          }}
          type={'button'}
          variant={'outlined'}
        >
          {t.profile.addProfilePhoto}
        </Button>
        <Modal
          className={s.modal}
          onChange={handleAddPhotoModal}
          onClose={handleCloseAddModal}
          open={openAddModal}
          showCloseButton
          style={{ height: '564px', maxWidth: '492px' }}
          title={t.profile.addProfilePhoto}
        >
          {!isEditing ? (
            <ImageUploader schema={imageSchema(t, 10)} setFile={handleSetPhoto} />
          ) : (
            <CropperPhoto
              avatarUrl={photoUrl || ''}
              disabled={disabledUpdate}
              onSetCroppedArea={handleEditorPhoto}
            />
          )}
        </Modal>
      </div>
    </div>
  )
}
