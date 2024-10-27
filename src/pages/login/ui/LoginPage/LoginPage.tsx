import { useEffect } from 'react'

import { GitHubAuthButton, GoogleAuthButton, LoginForm, useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './LoginPage.module.scss'

export const LoginPage = () => {
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
        <Typography as={'h1'} className={s.title} textAlign={'center'} variant={'h1'}>
          {t.pages.signIn.title}
        </Typography>
        <section className={s.oAuthButtonsContainer}>
          <GoogleAuthButton />
          <GitHubAuthButton />
        </section>
        <LoginForm />
        <section className={s.actions}>
          <Typography className={s.suggestion} textAlign={'center'} variant={'regular-text-16'}>
            {t.pages.signIn.signUpSuggestion}
          </Typography>
          <Button
            as={Link}
            className={s.signUpLink}
            fullWidth
            href={routes.REGISTRATION}
            variant={'text'}
          >
            {t.buttons.signUp}
          </Button>
        </section>
      </Card>
    </div>
  )
}
