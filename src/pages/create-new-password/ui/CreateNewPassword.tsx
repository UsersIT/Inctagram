import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/src/features/auth/api/authApi'
import {
  type newPassword,
  newPasswordSchema,
} from '@/src/features/auth/model/schemas/newPasswordSchema'
import { useTranslation } from '@/src/shared/hooks'
import { NewPasswordRequest } from '@/src/shared/types/api'
import { Button, Card, Typography } from '@/src/shared/ui'
import { ControlledTextField } from '@/src/shared/ui/Controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

export const CreateNewPassword: FC = () => {
  const { t } = useTranslation()
  const { control, formState, handleSubmit } = useForm<newPassword>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
      recoveryCode: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newPasswordSchema(t)),
  })

  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams?.get('code') as string

  const onSubmit: SubmitHandler<NewPasswordRequest> = async data => {
    if (formState.isValid) {
      const newPasswordInput: { newPassword: string; recoveryCode: string } = {
        newPassword: data.password,
        recoveryCode: recoveryCode,
      }

      createNewPassword(newPasswordInput)
        .unwrap()
        .then(() => {
          router.push('/auth/login')
        })
        .catch(error => console.log(error))
    } else {
      return
    }
  }

  return (
    <main className={s.page}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.pages.createNewPassword.title}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            label={t.label.password}
            name={'password'}
            placeholder={t.placeholders.password}
            type={'password'}
          ></ControlledTextField>
          <ControlledTextField
            control={control}
            label={t.label.passwordConfirmation}
            name={'passwordConfirm'}
            placeholder={t.placeholders.password}
            type={'password'}
          ></ControlledTextField>
          <Typography as={'span'} className={s.helperText} variant={'regular-text-14'}>
            {t.pages.createNewPassword.instruction}
          </Typography>
          <div className={'my-4'}>
            <Button
              className={s.signUpBtn}
              disabled={!formState.isValid}
              fullWidth
              isLoading={isLoading}
              type={'submit'}
            >
              {t.buttons.sendLink}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  )
}