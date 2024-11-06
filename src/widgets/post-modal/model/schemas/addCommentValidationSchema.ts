import { z } from 'zod'

export const addCommentValidationSchema = (t: any) =>
  z.object({
    comment: z.string().min(1, t.errors.required).max(300, t.errors.maxLength),
  })

export type AddCommentFormValues = z.infer<ReturnType<typeof addCommentValidationSchema>>
