import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './ProfileStats.module.scss'

type Props = {
  className?: string
  followersCount?: number
  followingCount?: number
  publicationsCount?: number
}

export const ProfileStats = ({
  className,
  followersCount,
  followingCount,
  publicationsCount,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(s.stats, className)}>
      <div>
        <Typography className={s.num} variant={'bold-text-14'}>
          {followingCount}
        </Typography>
        <Typography variant={'regular-text-14'}>{t.profile.following}</Typography>
      </div>
      <div>
        <Typography className={s.num} variant={'bold-text-14'}>
          {followersCount}
        </Typography>
        <Typography variant={'regular-text-14'}>{t.profile.followers}</Typography>
      </div>
      <div>
        <Typography className={s.num} variant={'bold-text-14'}>
          {publicationsCount}
        </Typography>
        <Typography variant={'regular-text-14'}>{t.profile.publications}</Typography>
      </div>
    </div>
  )
}
