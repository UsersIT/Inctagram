import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Card, CheckBox, Typography } from '@/src/shared/ui'

import s from './CurrentSubscriptionSection.module.scss'

import {
  useCancelAutoRenewalMutation,
  useGetCurrentPaymentSubscriptionsQuery,
} from '../../api/subscriptionApi'

export const CurrentSubscriptionSection = () => {
  const {
    data: currentPaymentSubscriptions,
    isLoading: isLoadingCurrentPaymentSubscriptions,
    refetch,
  } = useGetCurrentPaymentSubscriptionsQuery()
  const [cancelAutoRenewal, { isLoading: isLoadingCancelAutoRenewal }] =
    useCancelAutoRenewalMutation()
  const { t } = useTranslation()

  const [isAutoRenewChecked, setIsAutoRenewChecked] = useState(false)

  useEffect(() => {
    if (currentPaymentSubscriptions) {
      setIsAutoRenewChecked(currentPaymentSubscriptions.hasAutoRenewal)
    }
  }, [currentPaymentSubscriptions])

  const handleAutoRenewToggle = async (checked: boolean) => {
    if (
      !currentPaymentSubscriptions?.data?.length ||
      !currentPaymentSubscriptions?.hasAutoRenewal
    ) {
      return
    }

    setIsAutoRenewChecked(checked)

    try {
      await cancelAutoRenewal().unwrap()
      await refetch()
    } catch (e) {
      console.error(e)
      toast.error(t.errors.somethingWentWrong)
      setIsAutoRenewChecked(prev => !prev)
    }
  }

  return (
    <section className={s.section}>
      <Typography variant={'h3'}>{t.pages.accountManagement.currentSubscription}:</Typography>
      <Card className={s.card}>
        <div className={s.column}>
          <Typography className={s.muted}>{t.pages.accountManagement.expireAt}</Typography>
          <Typography>
            {currentPaymentSubscriptions?.data &&
              new Date(
                currentPaymentSubscriptions.data[
                  currentPaymentSubscriptions.data.length - 1
                ].endDateOfSubscription
              ).toLocaleDateString('ru-RU')}
          </Typography>
        </div>
        <div className={s.column}>
          <Typography className={s.muted}>{t.pages.accountManagement.nextPayment}</Typography>
          <Typography>
            {currentPaymentSubscriptions?.data &&
              new Date(
                currentPaymentSubscriptions.data[
                  currentPaymentSubscriptions.data.length - 1
                ].dateOfPayment
              ).toLocaleDateString('ru-RU')}
          </Typography>
        </div>
      </Card>
      <CheckBox
        checked={isAutoRenewChecked}
        disabled={
          isLoadingCancelAutoRenewal ||
          isLoadingCurrentPaymentSubscriptions ||
          !currentPaymentSubscriptions?.data?.length ||
          !currentPaymentSubscriptions?.hasAutoRenewal
        }
        label={t.pages.accountManagement.autoRenew}
        onChange={handleAutoRenewToggle}
      />
    </section>
  )
}
