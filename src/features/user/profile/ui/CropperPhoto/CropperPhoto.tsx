import React, { useState } from 'react'
import Cropper, { Point } from 'react-easy-crop'

import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'

import s from './CropperPhoto.module.scss'

type Props = {
  avatarUrl: string
  onSetCroppedArea: (size: CroppedArea) => void
}

export type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}

export const CropperPhoto: React.FC<Props> = ({ avatarUrl, onSetCroppedArea }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const { t } = useTranslation()

  const handleCropComplete = (point: Point, croppedArea: CroppedArea) => {
    setCroppedArea(croppedArea)
  }

  const handleSetCroppedArea = () => {
    if (croppedArea) {
      onSetCroppedArea(croppedArea)
    }
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.cropper}>
        <Cropper
          aspect={1}
          crop={crop}
          cropShape={'round'}
          image={avatarUrl}
          objectFit={'cover'}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={handleZoomChange}
          showGrid={false}
          zoom={zoom}
        />
      </div>
    </div>
  )
}