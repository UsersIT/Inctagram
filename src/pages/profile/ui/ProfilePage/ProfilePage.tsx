import { PostCreator } from '@/src/features/createPost'
import { PostsList } from '@/src/features/posts'
import { ProfileInfo } from '@/src/features/profile'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

type ProfilePageProps = {
  postId: null | number
  profileId: number
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ postId, profileId }) => {
  const router = useRouter()
  const { modal } = router.query

  return (
    <main className={s.page}>
      {modal && modal === 'create' ? <PostCreator profileId={profileId} /> : null}
      <ProfileInfo profileId={profileId} />
      <PostsList postId={postId} profileId={profileId} />
    </main>
  )
}
