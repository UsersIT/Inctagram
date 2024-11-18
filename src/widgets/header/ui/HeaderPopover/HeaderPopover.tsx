import { type ComponentProps, type FC, useEffect, useState } from 'react'

import { LogoutButton, useMeQuery } from '@/src/features/auth'
import { BookmarkOutline, SettingsOutline, TrendingUp } from '@/src/shared/assets/icons'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Popover, Typography } from '@/src/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './HeaderPopover.module.scss'
type Props = {
  isAuth: boolean
} & ComponentProps<'button'>

export const HeaderPopover: FC<Props> = ({ isAuth }) => {
  const { t } = useTranslation()
  const { data: meData } = useMeQuery(undefined, { skip: !isAuth })
  const router = useRouter()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 576) {
        setIsPopoverOpen(false)
      }
    }

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    setIsPopoverOpen(false)
  }, [router])

  const authContent = (
    <ul className={s.menu} role={'menu'}>
      <li className={s.item} role={'menuitem'}>
        <Button
          as={Link}
          className={s.link}
          href={routes.PROFILE_SETTINGS(meData?.userId as number)}
          variant={'text'}
        >
          <SettingsOutline />
          <Typography as={'span'}>{t.navigation.settings}</Typography>
        </Button>
      </li>
      <li className={s.item} role={'menuitem'}>
        <Button as={Link} className={s.link} href={routes.STATISTICS} variant={'text'}>
          <TrendingUp />
          <Typography as={'span'}>{t.navigation.statistics}</Typography>
        </Button>
      </li>
      <li className={s.item} role={'menuitem'}>
        <Button as={Link} className={s.link} href={routes.FAVORITES} variant={'text'}>
          <BookmarkOutline />
          <Typography as={'span'}>{t.navigation.favorites}</Typography>
        </Button>
      </li>
      <li className={s.item} role={'menuitem'}>
        <LogoutButton className={s.link} />
      </li>
    </ul>
  )

  const content = (
    <ul className={s.menu} role={'menu'}>
      <li role={'menuitem'}>
        <Button as={Link} fullWidth href={routes.LOGIN} variant={'text'}>
          {t.buttons.login}
        </Button>
      </li>
      <li role={'menuitem'}>
        <Button as={Link} fullWidth href={routes.REGISTRATION}>
          {t.buttons.signUp}
        </Button>
      </li>
    </ul>
  )

  return (
    <Popover
      className={s.content}
      onOpenChange={setIsPopoverOpen}
      open={isPopoverOpen}
      triggerClassName={s.trigger}
    >
      <menu>{isAuth ? authContent : content}</menu>
    </Popover>
  )
}
