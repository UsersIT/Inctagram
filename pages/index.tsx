import type { NextPageWithLayout } from '@/src/shared/types/next'
import type { GetStaticProps } from 'next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { PublicPage, type PublicPageProps, getPublicPosts } from '@/src/pages/public'

export const getStaticProps: GetStaticProps<PublicPageProps> = async () => {
  const { data } = await getPublicPosts()

  return {
    props: {
      posts: data.items,
      totalUsers: data.totalUsers,
    },
    revalidate: 60,
  }
}

const Page: NextPageWithLayout<PublicPageProps> = ({ posts, totalUsers }) => {
  return <PublicPage posts={posts} totalUsers={totalUsers} />
}

export default withRootLayout(Page)
