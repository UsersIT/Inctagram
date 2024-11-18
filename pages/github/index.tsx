import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { GithubPage } from '@/src/pages/github'

const Page: NextPageWithLayout = () => {
  return <GithubPage />
}

export default withRootLayout(Page)
