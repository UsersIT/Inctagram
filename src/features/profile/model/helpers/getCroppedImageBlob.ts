import { toast } from 'react-toastify'

import { CroppedArea } from '@/src/features/profile/model/types/profilePhoto'
import { LocaleType } from '@/src/shared/locales/ru'

type Params = {
  crop?: CroppedArea | null
  fileName?: string
  imageSrc: string
  mode?: 'blob' | 'formData' | 'url'
  t: LocaleType
}

export const getCroppedImageBlob = ({
  crop = null,
  fileName = 'file',
  imageSrc,
  mode = 'formData',
  t,
}: Params): Promise<Blob | FormData | string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.crossOrigin = 'Anonymous'
    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!crop) {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
      } else {
        canvas.width = crop.width
        canvas.height = crop.height
      }

      if (ctx) {
        ctx.drawImage(
          image,
          crop ? crop.x : 0,
          crop ? crop.y : 0,
          crop ? crop.width : image.naturalWidth,
          crop ? crop.height : image.naturalHeight,
          0,
          0,
          canvas.width,
          canvas.height
        )
      }

      canvas.toBlob(blob => {
        if (!blob) {
          reject(toast.error(t.validation.photoFormat))

          return
        }

        if (mode === 'formData') {
          const formData = new FormData()

          formData.append(fileName, blob)
          resolve(formData)
        } else if (mode === 'url') {
          resolve(URL.createObjectURL(blob))
        } else {
          resolve(blob)
        }
      }, 'image/jpeg')
    }

    image.onerror = () => {
      reject(toast.error(t.validation.photoFormat))
    }
  })
}
