import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  CreatePostFormValues,
  MAX_LENGTH,
  createPostValidationSchema,
} from '@/src/features/createPost/model/schemas/createPostValidationSchema'
import { useUpdatePostByIdMutation } from '@/src/features/posts/api/postApi'
import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextArea, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './EditPostForm.module.scss'

type Props = {
  initialDescription: string
  onSuccess: (newDescription: string) => void
  postId: number
}

export const EditPostForm: React.FC<Props> = ({ initialDescription, onSuccess, postId }) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm<CreatePostFormValues>({
    defaultValues: {
      description: initialDescription,
    },
    mode: 'onChange',
    resolver: zodResolver(createPostValidationSchema(t)),
  })

  const watchedDescription = watch('description')

  const [updatePostById, { isLoading: isPostLoading }] = useUpdatePostByIdMutation()

  const onSubmit: SubmitHandler<CreatePostFormValues> = async data => {
    try {
      const description = data.description || '' // Provide a default empty string if undefined

      await updatePostById({ description, postId }).unwrap()
      onSuccess(description) // Pass the ensured string to onSuccess
    } catch (err) {
      toast.error(t.errors.somethingWentWrong)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formContainer}>
        <ControlledTextArea
          control={control}
          height={'120px'}
          label={t.label.addPublicationDescriptions}
          name={'description'}
          placeholder={t.placeholders.description}
        />
        <Typography as={'span'} className={s.textAreaCount} variant={'small-text'}>
          {`${watchedDescription?.length || '0'}/${MAX_LENGTH}`}
        </Typography>
      </div>
      <Button
        className={s.formButton}
        disabled={isPostLoading || !isValid}
        isLoading={isPostLoading}
        type={'submit'}
      >
        {t.buttons.saveChanges}
      </Button>
    </form>
  )
}
