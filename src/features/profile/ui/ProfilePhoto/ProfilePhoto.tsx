import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'

import { useDeleteAvatarMutation, useUploadAvatarMutation } from '../../api/profileApi'
import { ProfilePhotoEditor } from './ProfilePhotoEditor/ProfilePhotoEditor'

type Props = {
  className?: string
  photoUrlFromServer: string | undefined
  refetch: () => void
}

export const ProfilePhoto: React.FC<Props> = ({ className, photoUrlFromServer, refetch }) => {
  const { t } = useTranslation()

  const [uploadAvatar, { isLoading: isLoadingAva }] = useUploadAvatarMutation()
  const [deleteAvatar, { isLoading: isLoadingDel }] = useDeleteAvatarMutation()

  const [isLocalUpload, setIsLocalUpload] = useState(false)

  const handleDeletePhoto = async () => {
    try {
      await deleteAvatar().unwrap()
      await refetch()
      toast.success(t.pages.accountManagement.success)
    } catch (error) {
      toast.error(t.errors.errorWord)
    }
  }

  const handleUpdatePhoto = async (data: FormData) => {
    if (!navigator.onLine) {
      toast.error(t.errors.somethingWentWrong)

      return
    }

    try {
      setIsLocalUpload(true)
      await uploadAvatar(data).unwrap()
      await refetch()
      toast.success(t.profile.updatedPhoto)
      setIsLocalUpload(false)
    } catch (error) {
      toast.error(t.errors.photoUpdateError)
      setIsLocalUpload(false)
    }
  }

  return (
    <ProfilePhotoEditor
      className={className}
      disabledDelete={isLoadingDel}
      disabledUpdate={isLoadingAva}
      photoUrlFromServer={photoUrlFromServer}
      setDeletePhoto={handleDeletePhoto}
      setUpdatePhoto={handleUpdatePhoto}
    />
  )
}
