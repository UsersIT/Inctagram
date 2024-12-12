import { useEffect, useState } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { PostCreator } from '@/src/features/createPost'
import { PostsList, PublicPostsList } from '@/src/features/posts'
import { ProfileInfo, useGetPublicUserProfileByIdQuery } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { PostModal } from '@/src/widgets/post-modal'
import { PublicPostModal } from '@/src/widgets/public-post-modal'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [isPublicPostModalOpen, setIsPublicPostModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const { data: meData } = useMeQuery()
  const router = useRouter()
  const { modal, post, profileId } = router.query
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId: Number(profileId) })
  const userName = profileData?.userName || ''

  useEffect(() => {
    if (post) {
      setIsPublicPostModalOpen(true)
    }
  }, [post])

  const handleClosePublicPostModal = () => {
    setIsPublicPostModalOpen(false)
    router.push(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  const handleOpenPost = (postId: number) => {
    const isAuthenticated = Boolean(meData)
    const modalSetter = isAuthenticated ? setIsPostModalOpen : setIsPublicPostModalOpen

    modalSetter(true)
    router.push(routes.POST(Number(profileId), postId), undefined, { shallow: true })
  }

  const handleClosePostModal = () => {
    setIsPostModalOpen(false)
    router.push(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  return (
    <div className={s.page}>
      {modal && modal === 'create' && !!meData && <PostCreator profileId={meData.userId} />}

      {post && !meData ? (
        <PublicPostModal
          onClose={handleClosePublicPostModal}
          open={isPublicPostModalOpen}
          postId={Number(post)}
        />
      ) : null}

      <PostModal
        onClose={handleClosePostModal}
        open={isPostModalOpen}
        postId={Number(post)}
        profileId={Number(profileId)}
        userName={userName}
      />

      <ProfileInfo
        profileData={profileData ? profileData : null}
        profileId={Number(profileId)}
        userName={userName}
      />

      {meData ? (
        <PostsList onOpenPost={handleOpenPost} profileId={Number(profileId)} userName={userName} />
      ) : (
        <PublicPostsList onOpenPost={handleOpenPost} profileId={Number(profileId)} />
      )}
    </div>
  )
}
