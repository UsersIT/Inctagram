import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { SettingsPage } from '@/src/pages/profile'

const Page: NextPageWithLayout = () => {
  return <SettingsPage />
}

export default withRootLayout(Page)
