import { useMeQuery } from '@/src/features/auth'
import { PostCreator } from '@/src/features/createPost'
import { PostsList } from '@/src/features/posts'
import { ProfileInfo } from '@/src/features/profile'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const router = useRouter()
  const { modal } = router.query
  const { data: meData } = useMeQuery()

  return (
    <main className={s.page}>
      {modal && modal === 'create' ? <PostCreator profileId={meData?.userId as number} /> : null}
      <ProfileInfo />
      <PostsList />
    </main>
  )
}
