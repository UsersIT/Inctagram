import { useEffect } from 'react'

import { ResendVerificationLinkButton } from '@/src/features/auth'
import { SignUpBro } from '@/src/shared/assets/icons'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Spinner, Typography } from '@/src/shared/ui'
import { LinkExpiredLayout } from '@/src/widgets/link-expired-layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './RegistrationConfirmationPage.module.scss'

import { useRegistrationConfirmationMutation } from '../../api/registrationConfirmationApi'

export const RegistrationConfirmationPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { query } = router

  const [registrationConfirmation, { isError, isLoading, isSuccess }] =
    useRegistrationConfirmationMutation()

  useEffect(() => {
    const code = query.code

    if (code) {
      registrationConfirmation({ confirmationCode: code as string }).unwrap()
    }
  }, [query.code, registrationConfirmation])

  return (
    <div className={s.page}>
      {isLoading && (
        <div className={s.loaderContainer}>
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <div className={s.successContentContainer}>
          <Typography as={'h1'} className={s.successTitle} textAlign={'center'} variant={'h1'}>
            {t.pages.registrationConfirmation.successTitle}
          </Typography>
          <Typography
            as={'p'}
            className={s.successText}
            textAlign={'center'}
            variant={'regular-text-16'}
          >
            {t.pages.registrationConfirmation.successText}
          </Typography>

          <Button as={Link} className={s.signInLink} href={routes.LOGIN}>
            {t.buttons.signIn}
          </Button>

          <span className={s.iconSuccess}>
            <SignUpBro aria-hidden viewBox={'0 0 432 300'} />
          </span>
        </div>
      )}
      {isError && (
        <LinkExpiredLayout>
          <ResendVerificationLinkButton className={s.resendLinkBtn} email={query.email as string} />
        </LinkExpiredLayout>
      )}
    </div>
  )
}
