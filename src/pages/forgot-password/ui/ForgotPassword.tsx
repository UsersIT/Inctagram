import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { ForgotPasswordForm } from '@/src/features/auth'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './ForgotPassword.module.scss'

export const ForgotPassword = () => {
  const { t } = useTranslation()
  const [reCaptcha, setReCaptcha] = useState<null | string>(null)
  const [reSend, setReSend] = useState(false)
  const reCaptchaRef = useRef<ReCAPTCHA>(null)

  const sendLinkAgainHandler = () => {
    setReSend(false)
  }

  const handleRefresh = () => {
    if (reCaptchaRef.current) {
      reCaptchaRef.current.reset()
    }
  }

  return (
    <div className={s.page}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.pages.forgotPassword.title}
        </Typography>
        <ForgotPasswordForm
          handleRefresh={handleRefresh}
          reCaptcha={reCaptcha}
          reSend={reSend}
          setReSend={setReSend}
        />
        {reSend && (
          <Button className={s.signUpBtn} fullWidth onClick={sendLinkAgainHandler}>
            {t.buttons.sendLinkAgain}
          </Button>
        )}
        <Button as={Link} className={s.signInLink} fullWidth href={'/auth/login'} variant={'text'}>
          {t.buttons.backToSignIn}
        </Button>
        <div className={s.captcha}>
          {!reSend && (
            <ReCAPTCHA
              hl={t.pages.forgotPassword.iMNotRobot}
              onChange={(value: any) => setReCaptcha(value)}
              ref={reCaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPCHA as string}
              theme={'dark'}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
