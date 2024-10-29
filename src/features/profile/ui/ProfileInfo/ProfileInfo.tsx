import { ProfileHeader } from '@/src/entities/profile'
import { useMeQuery } from '@/src/features/auth'
import { useGetPostsQuery } from '@/src/features/posts/api/postApi'
import { useGetProfileQuery } from '@/src/features/profile'
import { useGetFollowersQuery, useGetFollowingQuery } from '@/src/features/profile/api/profileApi'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

type Props = {
  className?: string
}

export const ProfileInfo = ({ className }: Props) => {
  const { data: profile } = useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data: me } = useMeQuery(undefined)
  const { data: followers } = useGetFollowersQuery(
    { username: profile?.userName || '' },
    { refetchOnMountOrArgChange: true, skip: !profile }
  )
  const { data: following } = useGetFollowingQuery(
    { username: profile?.userName || '' },
    { refetchOnMountOrArgChange: true, skip: !profile }
  )
  const { data: posts } = useGetPostsQuery(
    { username: profile?.userName || '' },
    { refetchOnMountOrArgChange: true, skip: !profile }
  )
  const { t } = useTranslation()

  if (!profile) {
    return null
  }

  const isMyProfile = me?.userId === profile.id

  return (
    <header className={clsx(s.content, className)}>
      <ProfileHeader
        avatarUrl={profile.avatars[0]?.url ? profile.avatars[0]?.url : ''}
        description={profile.aboutMe}
        followersCount={followers?.totalCount}
        followingCount={following?.totalCount}
        publicationsCount={posts?.totalCount}
        userName={profile.userName}
      >
        {' '}
        {isMyProfile && (
          <Button
            as={Link}
            className={s.settings}
            href={routes.PROFILE_SETTINGS}
            variant={'secondary'}
          >
            {t.buttons.profileSettings}
          </Button>
        )}
      </ProfileHeader>
    </header>
  )
}
