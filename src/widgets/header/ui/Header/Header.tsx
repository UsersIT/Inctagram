import React from 'react'

import { NotificationsPopover } from '@/src/entities/notification'
import { LanguageSwitcher } from '@/src/features/language-switcher'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './Header.module.scss'

import { HeaderPopover } from '../HeaderPopover/HeaderPopover'

type Props = {
  isAuth: boolean
  isLoading: boolean
} & React.ComponentProps<'header'>

export const Header: React.FC<Props> = ({ isAuth, isLoading }) => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <Typography as={Link} className={s.logo} href={routes.HOME} variant={'large'}>
        Picthentic
      </Typography>

      {!isLoading && (
        <div className={s.actions}>
          {isAuth && <NotificationsPopover />}
          <LanguageSwitcher />
          <HeaderPopover isAuth={isAuth} />
          {!isAuth && (
            <menu>
              <ul className={s.menu} role={'menu'}>
                <li role={'menuitem'}>
                  <Button as={Link} href={routes.LOGIN} variant={'text'}>
                    {t.buttons.login}
                  </Button>
                </li>
                <li role={'menuitem'}>
                  <Button as={Link} href={routes.REGISTRATION}>
                    {t.buttons.signUp}
                  </Button>
                </li>
              </ul>
            </menu>
          )}
        </div>
      )}
    </header>
  )
}
