import { ComponentProps, FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextField, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './LoginForm.module.scss'

import { useLazyMeQuery, useLoginMutation } from '../../api/authApi'
import { LoginFormValues, loginValidationSchema } from '../../model/schemas/loginValidationSchema'

export const LoginForm: FC<ComponentProps<'form'>> = () => {
  const { push } = useRouter()
  const { t } = useTranslation()

  const [login, { isLoading }] = useLoginMutation()
  const [triggerMeRequest] = useLazyMeQuery()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(loginValidationSchema(t)),
  })
  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    login(data)
      .unwrap()
      .then(() => {
        triggerMeRequest()
        //void push(routes.PROFILE)
      })
      .catch(res => {
        if (res.status === 400) {
          setError('password', { message: t.validation.invalidCredentials, type: 'custom' })

          return
        }
        toast.error(t.errors.somethingWentWrong)
      })
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputs}>
        <ControlledTextField
          control={control}
          disabled={isLoading}
          label={t.label.email}
          name={'email'}
          placeholder={t.placeholders.email}
        />
        <ControlledTextField
          control={control}
          disabled={isLoading}
          label={t.label.password}
          name={'password'}
          onCopy={e => e.preventDefault()}
          onCut={e => e.preventDefault()}
          placeholder={t.placeholders.password}
          type={'password'}
        />
      </div>
      <div className={s.actions}>
        <Link className={s.forgotPasswordLink} href={'/auth/forgot-password'}>
          {/*TODO: Change to forgot password path*/}
          <Typography as={'p'} variant={'regular-text-14'}>
            {t.pages.signIn.forgotPassword}
          </Typography>
        </Link>
        <Button
          className={s.signInLink}
          disabled={isLoading || !isValid}
          fullWidth
          isLoading={isLoading}
          type={'submit'}
        >
          {t.buttons.login}
        </Button>
      </div>
    </form>
  )
}
