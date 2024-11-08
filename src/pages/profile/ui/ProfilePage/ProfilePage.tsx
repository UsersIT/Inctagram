import { useEffect, useState } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { PostCreator } from '@/src/features/createPost'
import { PostsList } from '@/src/features/posts'
import { ProfileInfo } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { PostModal } from '@/src/widgets/post-modal'
import { PublicPostModal } from '@/src/widgets/public-post-modal'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [isPublicPostModalOpen, setIsPublicPostModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false) // Добавлено состояние для PostModal
  const { data: meData } = useMeQuery()
  const router = useRouter()
  const { modal, post, profileId } = router.query

  useEffect(() => {
    if (post) {
      setIsPublicPostModalOpen(true)
    }
  }, [post])

  const handleClosePublicPostModal = () => {
    setIsPublicPostModalOpen(false)
    router.replace(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  const handleClosePostModal = () => {
    setIsPostModalOpen(false)
    router.replace(routes.PROFILE(Number(profileId)), undefined, { shallow: true })
  }

  const handleOpenPost = (postId: number) => {
    if (meData) {
      setIsPostModalOpen(true)
      router.push(routes.POST(Number(profileId), Number(postId)), undefined, { shallow: true })
    } else {
      setIsPublicPostModalOpen(true)
      router.push(routes.POST(Number(profileId), Number(postId)), undefined, { shallow: true })
    }
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

      {/* Изменено для использования состояния isPostModalOpen */}
      <PostModal
        onClose={handleClosePostModal}
        open={isPostModalOpen}
        postId={Number(post)}
        profileId={Number(profileId)}
      />

      <ProfileInfo profileId={Number(profileId)} />
      <PostsList
        onOpenPost={handleOpenPost} // Обновленный обработчик открытия поста
        profileId={Number(profileId)}
      />
    </div>
  )
}
