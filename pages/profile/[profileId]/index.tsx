import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { ProfilePage } from '@/src/pages/profile/ui/ProfilePage/ProfilePage'

const Page: NextPageWithLayout = () => {
  return <ProfilePage />
}

export default withRootLayout(Page)
