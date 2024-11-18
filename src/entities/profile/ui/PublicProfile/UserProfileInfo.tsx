import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Avatar, Button, Typography } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './UserProfileInfo.module.scss'

type Profile = {
  aboutMe?: null | string
  avatar?: string
  username?: string
}

export type Props = {
  className?: string
  myProfile?: boolean
  ownerId?: number
  userData: Profile
}

export const UserProfileInfo = ({ className, myProfile = true, ownerId, userData }: Props) => {
  const { t } = useTranslation()

  const username = userData.username || ''

  return (
    <div className={clsx(s.container, className)}>
      <Avatar circle className={s.avatar} height={200} url={userData?.avatar} width={200} />
      <Typography as={'h2'} className={s.username} title={userData?.username} variant={'h1'}>
        {username.length > 16 ? username.slice(0, 16) + '...' : username}
      </Typography>
      {myProfile && ownerId && (
        <Button
          as={Link}
          className={s.settingsButton}
          href={{ pathname: routes.PROFILE + `/${ownerId}/settings`, query: { tab: 'general' } }}
          variant={'secondary'}
        >
          {t.buttons.profileSettings}
        </Button>
      )}
      <Typography as={'ul'} className={s.wrapper}>
        <Typography as={'li'} className={s.item}>
          <span className={s.count}>2 218</span> {t.profile.following}
        </Typography>
        <Typography as={'li'} className={s.item}>
          <span className={s.count}>2 358</span> {t.profile.followers}
        </Typography>
        <Typography as={'li'} className={s.item}>
          <span className={s.count}>2 764</span> {t.profile.publications}
        </Typography>
      </Typography>
      {userData?.aboutMe && (
        <Typography className={s.aboutMe} variant={'regular-text-16'}>
          {userData.aboutMe}
        </Typography>
      )}
    </div>
  )
}
