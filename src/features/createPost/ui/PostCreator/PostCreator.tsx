import type { PostImageType } from '../../model/types/postImage'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { LocaleType } from '@/src/shared/locales/ru'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { postDraftStorage } from '@/src/shared/storage'
import { Button, ImageUploader, Modal } from '@/src/shared/ui'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './PostCreator.module.scss'

import { useDraft } from '../../model/hooks/useDraft'
import { convertObjectURLsToBlobs } from '../../model/utils/convertObjectURLsToBlobs'
import { revokeObjectUrls } from '../../model/utils/revokeObjectUrls'
import { setUpNewImage } from '../../model/utils/setUpNewImage'
import { CloseModal } from '../CloseModal/CloseModal'
import { PostPhotoCropper } from '../PostPhotoCropper/PostPhotoCropper'
import { PostPhotoFilterSelect } from '../PostPhotoFilterSelect/PostPhotoFilterSelect'
import { PostPublicationForm } from '../PostPublicationForm/PostPublicationForm'

type StepType = keyof LocaleType['pages']['create']['steps']

export const PostCreator = ({ profileId }: { profileId: number }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)

  const [step, setStep] = useState(0)
  const [images, setImages] = useState<PostImageType[]>([])
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [isDraftUsed, setIsDraftUsed] = useState(false)

  const { draft, isDraftOpeningError, showOpenDraftButton } = useDraft()

  const handleProcessingFinished = (images: PostImageType[]) => {
    setImages(images)
  }

  const handleSetPhoto = (photo: File) => {
    const newImage = setUpNewImage(URL.createObjectURL(photo))

    setImages([newImage])
    setStep(1)
  }

  const handleCloseCreatePost = () => {
    if (step === 0) {
      setIsOpen(false)
      router.push(routes.PROFILE(profileId))
      revokeObjectUrls(images)
    } else {
      setShowCloseModal(true)
    }
  }

  const handlePostCreationSuccess = async () => {
    setIsOpen(false)
    router.push(routes.PROFILE(profileId))
    revokeObjectUrls(images)
    if (isDraftUsed) {
      await postDraftStorage.removeDraft()
    }
  }

  const handleNextStep = () => {
    setStep(prev => {
      if (prev === 3) {
        return prev
      }

      return prev + 1
    })
  }

  const handlePreviousStep = () => {
    setStep(prev => {
      if (prev === 0) {
        return prev
      }

      return prev - 1
    })
  }

  const handleSaveDraft = async () => {
    const imageUrls = images.map(image => image.filteredPhotoUrl)

    try {
      const blobs = await convertObjectURLsToBlobs(imageUrls)

      await postDraftStorage.saveDraft(blobs)
      setShowCloseModal(false)
      router.push(routes.PROFILE(profileId))
      revokeObjectUrls(images)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const handleLastPhotoDeleted = () => {
    setStep(0)
  }

  const handleOpenDraft = () => {
    if (!isDraftOpeningError && draft) {
      setImages(draft)
      setStep(1)
      setIsDraftUsed(true)
    }
  }

  return (
    <>
      <Modal
        className={clsx(s.modal)}
        onClose={handleCloseCreatePost}
        onNextButton={handleNextStep}
        onPreviousButton={handlePreviousStep}
        open={isOpen}
        showCloseButton={step === 0}
        showNextButton={step > 0 && step < 3}
        showPreviousButton={step > 0}
        size={step === 2 || step === 3 ? 'xlg' : 'md'}
        title={t.pages.create.steps[step.toString() as unknown as StepType]}
      >
        <div className={s.contentBox}>
          {step === 0 && (
            <div className={s.imageUploaderContainer}>
              <ImageUploader
                accept={'image/jpeg, image/png, image/jpg'}
                className={s.imageUploader}
                schema={imageSchema(t, 20)}
                setFile={handleSetPhoto}
              />
              {showOpenDraftButton && (
                <Button className={s.button} onClick={handleOpenDraft} variant={'outlined'}>
                  {t.pages.create.openDraft}
                </Button>
              )}
            </div>
          )}
          {step === 1 && (
            <div className={s.cropperContainer}>
              <PostPhotoCropper
                onCroppingFinished={handleProcessingFinished}
                onLastPhotoDeleted={handleLastPhotoDeleted}
                uploadedImages={images}
              />
            </div>
          )}
          {step === 2 && (
            <PostPhotoFilterSelect
              croppedImages={images}
              onApplyingFiltersFinished={handleProcessingFinished}
            />
          )}
          {step === 3 && (
            <PostPublicationForm images={images} onSuccess={handlePostCreationSuccess} />
          )}
        </div>
      </Modal>
      <CloseModal
        onCancel={() => setShowCloseModal(false)}
        onConfirm={handleSaveDraft}
        open={showCloseModal}
      />
    </>
  )
}
