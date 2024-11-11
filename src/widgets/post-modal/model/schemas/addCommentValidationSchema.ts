import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const MAX_LENGTH = 300

export const addCommentValidationSchema = (t: LocaleType) =>
  z.object({
    description: z
      .string()
      .trim()
      .max(MAX_LENGTH, { message: t.validation.maxLength(MAX_LENGTH) }),
  })

export type AddCommentFormValues = z.infer<ReturnType<typeof addCommentValidationSchema>>
