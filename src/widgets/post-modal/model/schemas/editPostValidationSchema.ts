import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const MAX_LENGTH = 500

export const editPostValidationSchema = (t: LocaleType) =>
  z.object({
    description: z
      .string()
      .trim()
      .max(MAX_LENGTH, { message: t.validation.maxLength(MAX_LENGTH) })
      .optional(),
  })

export type CreatePostFormValues = z.infer<ReturnType<typeof editPostValidationSchema>>
