import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { wrapper } from '@/src/app/providers/store/store'
import { getPublicPostById, getRunningQueriesThunk, getUserPublicPosts } from '@/src/features/posts'
import { getPublicUserProfileById } from '@/src/features/profile'
import { ProfilePage } from '@/src/pages/profile'
import { getPublicCommentsByPostId } from '@/src/widgets/public-post-modal'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  if (context.query.profileId) {
    const { query } = context
    const profileId = Number(query.profileId)

    store.dispatch(getPublicUserProfileById.initiate({ profileId }, { forceRefetch: true }))
    store.dispatch(
        getUserPublicPosts.initiate({ pageSize: 8, userId: profileId }, { forceRefetch: true })
    )

    if (query.post) {
      const postId = Number(query.post)

      store.dispatch(getPublicPostById.initiate(postId, { forceRefetch: true }))
      store.dispatch(getPublicCommentsByPostId.initiate({ postId }))
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const queries = store.getState().baseApi.queries
    const hasRejected = Object.values(queries).some(query => query?.status === 'rejected')

    if (hasRejected) {
      return {
        notFound: true,
      }
    }
  }

  return {
    props: {},
  }
})

const Page: NextPageWithLayout = () => {
  return <ProfilePage />
}

export default withRootLayout(Page)
