import { SettingsAccountManagementTab } from '@/src/pages/profile/ui/SettingsAccountManagmentTab/SettingsAccountManagementTab'
import { useTranslation } from '@/src/shared/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/src/shared/ui'
import { SettingsGeneralInfo } from '@/src/widgets/settings-general-info'
import { useRouter } from 'next/router'

import s from './SettingsPage.module.scss'

export const SettingsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { tab = 'general-info' } = router.query as { tab: string }

  const handleTabChange = (value: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: value === 'general-info' ? null : { tab: value },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <div className={s.page}>
      <Tabs className={s.tabs} onValueChange={handleTabChange} value={tab}>
        <TabsList className={s.tabsList}>
          <TabsTrigger value={'general-info'}>{t.tabs.generalInformation}</TabsTrigger>
          <TabsTrigger value={'devices'}>{t.tabs.devices}</TabsTrigger>
          <TabsTrigger value={'account-management'}>{t.tabs.accountManagement}</TabsTrigger>
          <TabsTrigger value={'my-payments'}>{t.tabs.myPayments}</TabsTrigger>
        </TabsList>
        <TabsContent className={s.tabsContent} value={'general-info'}>
          <SettingsGeneralInfo />
        </TabsContent>
        <TabsContent value={'devices'}>
          <Typography variant={'large'}>Devices</Typography>
        </TabsContent>
        <TabsContent value={'account-management'}>
          <SettingsAccountManagementTab />
        </TabsContent>
        <TabsContent value={'my-payments'}>
          <Typography variant={'large'}>My payments</Typography>
        </TabsContent>
      </Tabs>
    </div>
  )
}
