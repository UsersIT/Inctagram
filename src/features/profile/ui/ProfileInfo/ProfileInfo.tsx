import { useEffect } from 'react'

import { ProfileHeader } from '@/src/entities/profile'
import { useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useMediaQuery, useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import { eventEmitter } from '@/src/shared/utility'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

import { useFollowingUserMutation, useGetUserQuery } from '../../api/profileApi'
import { type GetPublicUserProfileByIdResponse } from './../../model/types/api'

type Props = {
  className?: string
  profileData: GetPublicUserProfileByIdResponse | null
  profileId: number
  userName: string
}

export const ProfileInfo = ({ className, profileData, profileId, userName }: Props) => {
  const { data: userData, isSuccess, refetch } = useGetUserQuery({ userName }, { skip: !userName })
  const [followUser, { isLoading: isLoadingFollow }] = useFollowingUserMutation()
  const { data: meData } = useMeQuery(undefined)

  useEffect(() => {
    const emitterPostCreated = () => {
      refetch()
    }

    const emitterPostDeleted = () => {
      refetch()
    }

    eventEmitter.on('postCreated', emitterPostCreated)
    eventEmitter.on('postDeleted', emitterPostDeleted)

    return () => {
      eventEmitter.off('postCreated', emitterPostCreated)
      eventEmitter.off('postDeleted', emitterPostDeleted)
    }
  }, [refetch])

  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 576px)')

  if (!profileData) {
    return null
  }

  const isMyProfile = meData?.userId === profileId

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
        followersCount={meData ? userData?.followersCount : profileData?.userMetadata.followers}
        followingCount={meData ? userData?.followingCount : profileData?.userMetadata.following}
        publicationsCount={
          meData ? userData?.publicationsCount : profileData?.userMetadata.publications
        }
        userName={isMyProfile ? userData?.userName : profileData?.userName}
      >
        {renderButtons()}
      </ProfileHeader>
    </header>
  )
}
