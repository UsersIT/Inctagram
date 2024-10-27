import { useEffect } from 'react'

import { GitHubAuthButton, GoogleAuthButton, SignUpForm, useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { data: meData } = useMeQuery()

  useEffect(() => {
    if (meData) {
      router.push(routes.PROFILE)
    }
  }, [meData, router])

  return (
    <div className={s.page}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.pages.registration.title}
        </Typography>
        <div className={s.oAuthButtonsContainer}>
          <GoogleAuthButton />
          <GitHubAuthButton />
        </div>
        <SignUpForm />
        <Typography
          as={'span'}
          className={s.suggestion}
          textAlign={'center'}
          variant={'regular-text-16'}
        >
          {t.pages.registration.signInSuggestion}
        </Typography>
        <Button as={Link} className={s.signInLink} fullWidth href={routes.LOGIN} variant={'text'}>
          {t.buttons.signIn}
        </Button>
      </Card>
    </div>
  )
}
