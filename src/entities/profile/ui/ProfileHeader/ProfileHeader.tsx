import { ReactNode } from 'react'

import { ProfileStats } from '@/src/entities/profile/ui/ProfileStats/ProfileStats'
import { Avatar, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './ProfileHeader.module.scss'

type Props = {
  avatarUrl?: string
  children?: ReactNode
  className?: string
  description?: string
  followersCount?: number
  followingCount?: number
  publicationsCount?: number
  userName?: string
}

export const ProfileHeader = ({
  avatarUrl,
  children,
  className,
  description,
  followersCount,
  followingCount,
  publicationsCount,
  userName,
}: Props) => {
  return (
    <header className={clsx(s.header, className)}>
      <Avatar circle className={s.avatar} url={avatarUrl} />
      <Typography as={'h2'} className={s.name} variant={'large'}>
        {userName && userName.length > 15 ? userName.slice(0, 15) + '...' : userName}
      </Typography>
      <div className={s.btn}>{children}</div>
      <ProfileStats
        className={s.stats}
        followersCount={followersCount}
        followingCount={followingCount}
        publicationsCount={publicationsCount}
      />
      <Typography className={s.aboutMe} style={{ textWrap: 'pretty' }} variant={'regular-text-16'}>
        {description}
      </Typography>
    </header>
  )
}
