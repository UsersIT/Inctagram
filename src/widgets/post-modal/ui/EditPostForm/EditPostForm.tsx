import React, { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextArea, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './EditPostForm.module.scss'

import { useUpdatePostByIdMutation } from './../../api/userPostApi'
import {
  type EditPostValidationSchemaType,
  MAX_LENGTH,
  editPostValidationSchema,
} from './../../model/schemas/editPostValidationSchema'

type Props = {
  initialDescription: string
  onSuccess: (newDescription: string) => void
  postId: number
  setHasUnsavedChanges: (hasUnsaved: boolean) => void
}

export const EditPostForm: React.FC<Props> = ({
  initialDescription,
  onSuccess,
  postId,
  setHasUnsavedChanges,
}) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm<EditPostValidationSchemaType>({
    defaultValues: {
      description: initialDescription,
    },
    mode: 'onChange',
    resolver: zodResolver(editPostValidationSchema(t)),
  })

  const watchedDescription = watch('description')

  const [updatePostById, { isLoading: isPostLoading }] = useUpdatePostByIdMutation()

  const onSubmit: SubmitHandler<EditPostValidationSchemaType> = async data => {
    try {
      const description = data.description || ''

      await updatePostById({ description, postId }).unwrap()
      onSuccess(description)
    } catch (err) {
      toast.error(t.errors.somethingWentWrong)
    }
  }

  useEffect(() => {
    setHasUnsavedChanges(watchedDescription !== initialDescription)
  }, [initialDescription, setHasUnsavedChanges, watchedDescription])

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
        disabled={
          isPostLoading ||
          !isValid ||
          !watchedDescription ||
          watchedDescription === initialDescription
        }
        isLoading={isPostLoading}
        type={'submit'}
      >
        {t.buttons.saveChanges}
      </Button>
    </form>
  )
}
