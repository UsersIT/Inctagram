import type { AspectRatio, PostImageType } from '../../model/types/postImage'

import React, { use, useEffect, useRef, useState } from 'react'
import Cropper, { type Point } from 'react-easy-crop'
import { set } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  Close,
  ImageIcon,
  Maximize,
  MaximizeOutline,
  PlusCircleOutline,
} from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { Button, ImageUploadInput, ScrollArea, ScrollBar, Slider } from '@/src/shared/ui'
import { type CroppedArea, getCroppedImageBlob } from '@/src/shared/utility'
import clsx from 'clsx'
import Image from 'next/image'

import s from './PostPhotoCropper.module.scss'

import { aspectRatios } from '../../model/consts/aspectRatios'
import { setUpNewImage } from '../../model/utils/setUpNewImage'
import { AspectRatioSelect } from '../AspectRatioSelect/AspectRatioSelect'
import { CarouselWrapper } from '../CarouselWrapper/CarouselWrapper'

type Props = {
  onCroppingFinished: (images: PostImageType[]) => void
  onLastPhotoDeleted: () => void
  uploadedImages: PostImageType[]
}

export const PostPhotoCropper: React.FC<Props> = props => {
  const { onCroppingFinished, onLastPhotoDeleted, uploadedImages } = props
  const { t } = useTranslation()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState<string>('')
  const [images, setImages] = useState<PostImageType[]>(uploadedImages)
  const [showZoomSelector, setShowZoomSelector] = useState(false)
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null)
  const [showUploader, setShowUploader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSetNewPhoto = (photo: File) => {
    const newImage = setUpNewImage(URL.createObjectURL(photo))
    const newImages = [...images, newImage]

    setImages(newImages)
    onCroppingFinished(newImages)
    setCurrentImageIndex(newImages.length - 1)
  }

  const handleMediaLoaded = ({ height, width }: { height: number; width: number }) => {
    const newImages = [...images]

    newImages[currentImageIndex].aspectRatios.original = width / height
    setImages(newImages)
  }

  const handleDeletePhoto = (id: string) => {
    const newImages = [...images].filter(image => image.id !== id)

    if (images.length === 1) {
      onLastPhotoDeleted()
    } else {
      setImages(newImages)
      setCurrentImageIndex(newImages.length - 1)
    }
    onCroppingFinished(newImages)
  }

  const handleZoomChange = (value: number) => {
    const newImages = [...images]

    newImages[currentImageIndex].zoom = value
    setImages(newImages)
  }

  const handleAspectRatioChange = (value: AspectRatio) => {
    const newImages = [...images]

    newImages[currentImageIndex].aspectRatios.selected = value
    setImages(newImages)
  }

  const handleCropChange = (value: Point) => {
    const newImages = [...images]

    newImages[currentImageIndex].crop = value
    setImages(newImages)
  }

  const handleNextClick = () => {
    setCurrentImageIndex(index => {
      if (index === images.length - 1) {
        return 0
      }

      return index + 1
    })
  }

  const handlePrevClick = () => {
    setCurrentImageIndex(index => {
      if (index === 0) {
        return images.length - 1
      }

      return index - 1
    })
  }

  const handleCropComplete = (_: Point, croppedArea: CroppedArea) => {
    setCroppedArea(croppedArea)
  }

  const handleSaveCroppedArea = async () => {
    if (croppedArea) {
      setIsLoading(true)
      try {
        const res = await getCroppedImageBlob({
          crop: croppedArea,
          imageSrc: images[currentImageIndex].photoUrl,
          mode: 'url',
          t,
        })
        const newImages = [...images]

        newImages[currentImageIndex].croppedPhotoUrl = res as string
        newImages[currentImageIndex].filteredPhotoUrl = res as string
        newImages[currentImageIndex].croppedArea = croppedArea
        newImages[currentImageIndex].filters = {}
        setImages(newImages)
        onCroppingFinished(newImages)
      } catch (error) {
        toast.error(t.errors.croppingImageWrong)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleUploaderButtonClick = () => {
    imageInputRef.current?.click()
  }

  return (
    <CarouselWrapper
      className={s.wrapper}
      currentImageIndex={currentImageIndex}
      images={images}
      onDotClick={idx => setCurrentImageIndex(idx)}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
    >
      <Cropper
        aspect={
          images[currentImageIndex].aspectRatios.selected === 'original'
            ? images[currentImageIndex].aspectRatios.original
            : aspectRatios[images[currentImageIndex].aspectRatios.selected]
        }
        classes={{ containerClassName: s.container, cropAreaClassName: s.area }}
        crop={images[currentImageIndex].crop}
        image={images[currentImageIndex].photoUrl}
        objectFit={'contain'}
        onCropChange={handleCropChange}
        onCropComplete={handleCropComplete}
        onMediaLoaded={handleMediaLoaded}
        onZoomChange={handleZoomChange}
        zoom={images[currentImageIndex].zoom}
      />
      <div className={s.cropperActions}>
        <AspectRatioSelect
          onOpenChange={() => setShowZoomSelector(false)}
          onValueChange={value => handleAspectRatioChange(value as AspectRatio)}
          value={images[currentImageIndex].aspectRatios.selected}
        />
        <div className={s.zoomSliderContainer}>
          <button
            aria-label={showZoomSelector ? t.buttons.hideZoomSelector : t.buttons.showZoomSelector}
            className={clsx(s.iconButton, showZoomSelector && s.active)}
            onClick={() => setShowZoomSelector(prev => !prev)}
            title={showZoomSelector ? t.buttons.hideZoomSelector : t.buttons.showZoomSelector}
          >
            {showZoomSelector ? <Maximize /> : <MaximizeOutline />}
          </button>
          {showZoomSelector && (
            <Slider
              className={s.zoomSlider}
              max={3}
              min={1}
              onValueChange={valueArray => handleZoomChange(valueArray[0])}
              step={0.1}
              value={[images[currentImageIndex].zoom]}
            />
          )}
        </div>
      </div>

      <Button className={s.cropTrigger} isLoading={isLoading} onClick={handleSaveCroppedArea}>
        {t.buttons.apply}
      </Button>

      <button
        aria-label={
          showUploader ? t.buttons.hideUploadedPhotosList : t.buttons.showUploadedPhotosList
        }
        className={clsx(s.iconButton, s.uploaderTrigger)}
        onClick={() => setShowUploader(prev => !prev)}
        title={showUploader ? t.buttons.hideUploadedPhotosList : t.buttons.showUploadedPhotosList}
      >
        <ImageIcon height={24} width={24} />
      </button>
      {showUploader && (
        <div className={s.uploaderContainer}>
          <ScrollArea className={s.scrollarea}>
            <ul aria-label={t.pages.create.photosList} className={s.imagesContainer}>
              {images.map(({ croppedPhotoUrl, id }, idx) => {
                return (
                  <li className={s.imageWrapper} key={id}>
                    <Image
                      alt={`Photo ${idx + 1}`}
                      className={s.image}
                      fill
                      src={croppedPhotoUrl as string}
                    />
                    <button
                      aria-label={`${t.buttons.deletePhoto} ${idx + 1}`}
                      className={clsx(s.iconButton, s.imageDeleteButton)}
                      onClick={() => handleDeletePhoto(id)}
                      title={t.buttons.deletePhoto}
                    >
                      <Close aria-hidden height={12} viewBox={'0 0 24 24'} width={12} />
                    </button>
                  </li>
                )
              })}
            </ul>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          {images.length < 10 && (
            <ImageUploadInput
              accept={'image/jpeg, image/png, image/jpg'}
              className={s.uploader}
              error={err => setError(err)}
              ref={imageInputRef}
              schema={imageSchema(t, 20)}
              setFile={handleSetNewPhoto}
              trigger={
                <button
                  aria-label={t.buttons.uploadMore}
                  className={s.uploaderButton}
                  onClick={handleUploaderButtonClick}
                  title={t.buttons.uploadMore}
                  type={'button'}
                >
                  <PlusCircleOutline aria-hidden height={36} width={36} />
                </button>
              }
            />
          )}
        </div>
      )}
    </CarouselWrapper>
  )
}
