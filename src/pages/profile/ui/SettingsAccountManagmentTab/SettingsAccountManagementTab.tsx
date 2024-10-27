import { useLayoutEffect, useState } from 'react'

import { SubscriptionSelectionSection } from '@/src/features/subscribeToBusinessAccount'
import { useTranslation } from '@/src/shared/hooks'
import { Card, Dialog, RadioGroupItem, RadioGroupRoot, Typography } from '@/src/shared/ui'
import { useRouter } from 'next/router'

import s from './SettingsAccountManagementTab.module.scss'

type SelectedAccountType = 'business' | 'personal'

export const SettingsAccountManagementTab = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<SelectedAccountType>('personal')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()

  useLayoutEffect(() => {
    if (router.query['?success'] === 'true') {
      setSuccess(true)
      setSelectedAccountType('business')
      setIsDialogOpen(true)
    } else if (router.query['?success'] === 'false') {
      setSuccess(false)
      setIsDialogOpen(true)
    }
  }, [router])

  const handleCloseDialog = () => {
    const { pathname, query } = router

    delete query['?success'] // Удаляем параметр success
    void router.replace({ pathname, query }, undefined, { shallow: true })
    setIsDialogOpen(false)
  }

  return (
    <div className={s.wrapper}>
      <Dialog
        confirmButtonFullWidth
        confirmButtonTitle={
          success ? t.pages.accountManagement.ok : t.pages.accountManagement.backToPayment
        }
        onClose={handleCloseDialog}
        onConfirm={handleCloseDialog}
        open={isDialogOpen}
        showCancelButton={false}
        title={success ? t.pages.accountManagement.success : t.pages.accountManagement.error}
      >
        {success
          ? t.pages.accountManagement.successMessage
          : t.pages.accountManagement.errorMessage}
      </Dialog>
      <section className={s.section}>
        <Typography variant={'h3'}>{t.pages.accountManagement.accountType}:</Typography>
        <Card className={s.card}>
          <RadioGroupRoot
            onValueChange={(value: SelectedAccountType) => setSelectedAccountType(value)}
            value={selectedAccountType}
          >
            <RadioGroupItem value={'personal'}>{t.pages.accountManagement.personal}</RadioGroupItem>
            <RadioGroupItem value={'business'}>{t.pages.accountManagement.business}</RadioGroupItem>
          </RadioGroupRoot>
        </Card>
      </section>
      {selectedAccountType === 'business' && <SubscriptionSelectionSection />}
    </div>
  )
}
