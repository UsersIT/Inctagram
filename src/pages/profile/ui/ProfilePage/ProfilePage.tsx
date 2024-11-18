import { useEffect, useState } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { PostCreator } from '@/src/features/createPost'
import { type GetUserPostsResponse, PostsList, PublicPostsList } from '@/src/features/posts'
import { ProfileInfo, useGetPublicUserProfileByIdQuery } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { PostModal, useGetPostsQuery } from '@/src/widgets/post-modal'
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
  const {
    data: postsResponse,
    isFetching,
    isLoading,
    refetch,
  } = useGetPostsQuery({ username: userName }, { skip: !userName })

  const defaultPostsResponse: GetUserPostsResponse = {
    items: [],
    pageSize: 0,
    totalCount: 0,
  }

  useEffect(() => {
    if (post) {
      setIsPublicPostModalOpen(true)
    }
  }, [post])

  const handleClosePublicPostModal = () => {
    setIsPublicPostModalOpen(false)
    router.replace(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  const handleOpenPost = (post: number) => {
    if (meData) {
      setIsPostModalOpen(true)
      router.push(routes.POST(Number(profileId), Number(post)), undefined, { shallow: true })
    } else {
      setIsPublicPostModalOpen(true)
      router.push(routes.POST(Number(profileId), Number(post)), undefined, { shallow: true })
    }
  }

  const handleClosePostModal = () => {
    setIsPostModalOpen(false)
    router.replace(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  return (
    <div className={s.page}>
      {modal && modal === 'create' && meData ? <PostCreator profileId={meData.userId} /> : null}

      {post && !meData ? (
        <PublicPostModal
          onClose={handleClosePublicPostModal}
          open={isPublicPostModalOpen}
          postId={Number(post)}
        />
      ) : null}

      <PostModal
        isLoading={isLoading}
        onClose={handleClosePostModal}
        open={isPostModalOpen}
        postId={Number(post)}
        postsResponse={postsResponse || defaultPostsResponse}
        profileId={Number(profileId)}
        refetch={refetch}
      />

      <ProfileInfo
        profileData={profileData ? profileData : null}
        profileId={Number(profileId)}
        userName={userName}
      />

      {meData ? (
        <PostsList
          isFetching={isFetching}
          onOpenPost={handleOpenPost}
          postsResponse={postsResponse || defaultPostsResponse}
          profileId={Number(profileId)}
          refetch={refetch}
        />
      ) : (
        <PublicPostsList onOpenPost={handleOpenPost} profileId={Number(profileId)} />
      )}
    </div>
  )
}
