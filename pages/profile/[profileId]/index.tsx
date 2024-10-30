import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { wrapper } from '@/src/app/providers/store/store'
import {
  getPublicPostById,
  getRunningQueriesThunk,
  getUserPublicPosts,
} from '@/src/features/posts/api/postApi'
import { getPublicUserProfileById } from '@/src/features/profile'
import { ProfilePage } from '@/src/pages/profile'
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { query } = context
  const profileId = Number(query.profileId)
  const postId = Number(query.postId)

  if (isNaN(profileId)) {
    return {
      notFound: true,
    }
  }

  store.dispatch(getPublicUserProfileById.initiate({ profileId }, { forceRefetch: true }))
  store.dispatch(
    getUserPublicPosts.initiate({ pageSize: 8, userId: profileId }, { forceRefetch: true })
  )
  if (!isNaN(postId)) {
    store.dispatch(getPublicPostById.initiate({ postId }, { forceRefetch: true }))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {
      postId: isNaN(postId) ? null : postId,
      profileId,
    },
  }
})

type PageProps = {
  postId: null | number
  profileId: number
}

const Page: NextPageWithLayout<PageProps> = ({ postId, profileId }) => {
  return <ProfilePage postId={postId} profileId={profileId} />
}

export default withRootLayout(Page)
