import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const imageSchema = (t: LocaleType, imageSizeInMB = 10) => {
  const imageSize = imageSizeInMB * Math.pow(1024, 2)

  return z
    .object(
      {
        size: z.number(),
        type: z.string(),
      },
      {
        required_error: t.errors.selectFile,
      }
    )
    .refine(file => file.size <= imageSize, {
      message: t.errors.imageSize(imageSizeInMB),
    })
    .refine(file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
      message: t.errors.imageType,
    })
}
