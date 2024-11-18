import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextArea } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './AddCommentForm.module.scss'

import { useAddCommentMutation } from './../../api/userPostApi'
import {
  type AddCommentFormValues,
  addCommentValidationSchema,
} from './../../model/schemas/addCommentValidationSchema'

type Props = {
  onCommentAdded: () => void
  postId: number
}

export const AddCommentForm: React.FC<Props> = ({ onCommentAdded, postId }) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<AddCommentFormValues>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(addCommentValidationSchema(t)),
  })

  const watchedComment = watch('description')
  const [addComment, { isLoading: isCommentLoading }] = useAddCommentMutation()

  const onSubmit: SubmitHandler<AddCommentFormValues> = async data => {
    try {
      const content = data.description === undefined ? '' : data.description

      await addComment({ content, postId }).unwrap()
      onCommentAdded()
      reset()
    } catch (error) {
      toast.error(t.errors.somethingWentWrong)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextArea
        className={s.addComment}
        control={control}
        height={'60px'}
        name={'description'}
        placeholder={t.widgets.postModal.addComment}
      />
      <Button
        className={s.formButton}
        disabled={isCommentLoading || !isValid || !watchedComment}
        isLoading={isCommentLoading}
        type={'submit'}
        variant={'text'}
      >
        {t.buttons.publish}
      </Button>
    </form>
  )
}
