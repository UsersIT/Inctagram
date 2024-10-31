import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { wrapper } from '@/src/app/providers/store'
import { HomePage, getAllPosts, getRunningQueriesThunk } from '@/src/pages/home'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getAllPosts.initiate())
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
    revalidate: 60,
  }
})
const Page: NextPageWithLayout = () => {
  return <HomePage />
}

export default withRootLayout(Page)
