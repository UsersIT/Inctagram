import { ProfileHeader } from '@/src/entities/profile'
import { useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useMediaQuery, useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

import {
  useFollowingUserMutation,
  useGetPublicUserProfileByIdQuery,
  useGetUserQuery,
} from '../../api/profileApi'

type Props = {
  className?: string
  profileId: number
}

export const ProfileInfo = ({ className, profileId }: Props) => {
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const { data: userData, isSuccess } = useGetUserQuery(
    { userName: profileData?.userName },
    { skip: !profileData?.userName }
  )
  const [followUser, { isLoading: isLoadingFollow }] = useFollowingUserMutation()
  const { data: me } = useMeQuery(undefined)

  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 576px)')

  if (!profileData) {
    return null
  }

  const isMyProfile = me?.userId === profileId

  const followingUserHandler = () => {
    followUser({ selectedUserId: profileId })
  }

  const renderButtons = () => {
    if (isSuccess && !isMyProfile) {
      return (
        <div className={s.buttonContainer}>
          <Button
            disabled={isLoadingFollow}
            onClick={followingUserHandler}
            variant={userData?.isFollowing ? 'outlined' : 'primary'}
          >
            {userData?.isFollowing ? t.buttons.unfollow : t.buttons.follow}
          </Button>
          <Button className={s.buttonSpacing} onClick={() => {}} variant={'secondary'}>
            {t.buttons.sendMassage}
          </Button>
        </div>
      )
    }

    if (isMyProfile && !isMobile) {
      return (
        <Button
          as={Link}
          className={s.settings}
          href={routes.PROFILE_SETTINGS(profileId)}
          variant={'secondary'}
        >
          {t.buttons.profileSettings}
        </Button>
      )
    }

    return null
  }

  return (
    <header className={clsx(s.content, className)}>
      <ProfileHeader
        avatarUrl={
          isMyProfile ? userData?.avatars[0]?.url ?? '' : profileData?.avatars[0]?.url ?? ''
        }
        description={isMyProfile ? userData?.aboutMe : profileData?.aboutMe}
        followersCount={
          isMyProfile ? userData?.followersCount : profileData?.userMetadata.followers
        }
        followingCount={
          isMyProfile ? userData?.followingCount : profileData?.userMetadata.following
        }
        publicationsCount={
          isMyProfile ? userData?.publicationsCount : profileData?.userMetadata.publications
        }
        userName={isMyProfile ? userData?.userName : profileData?.userName}
      >
        {renderButtons()}
      </ProfileHeader>
    </header>
  )
}
