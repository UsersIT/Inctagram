import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useSubscribeMutation } from '@/src/features/subscribeToBusinessAccount/api/subscribeApi'
import { PaymentMethod } from '@/src/features/subscribeToBusinessAccount/model/types/api'
import { PayPalIcon, StripeIcon } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, RadioGroupItem, RadioGroupRoot, Typography } from '@/src/shared/ui'

import s from './SubscriptionSelectionSection.module.scss'

type SelectedSubscription = '10-day' | '50-weekly' | '100-monthly'

export const SubscriptionSelectionSection = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<SelectedSubscription>('10-day')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const { t } = useTranslation()

  const [subscribe, { isError, isLoading }] = useSubscribeMutation()

  const handlePay = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
    subscribe({
      amount: Number(selectedSubscription.split('-')[0]),
      baseUrl: window.location.href + '&',
      paymentType: method.toUpperCase() as PaymentMethod,
      typeSubscription: selectedSubscription.split('-')[1].toUpperCase(),
    })
  }

  useEffect(() => {
    if (isError) {
      toast.error(t.errors.somethingWentWrong)
    }
  }, [isError])

  return (
    <section className={s.section}>
      <Typography variant={'h3'}>{t.pages.accountManagement.subscriptionCosts}:</Typography>
      <Card className={s.card}>
        <RadioGroupRoot
          onValueChange={(value: SelectedSubscription) => setSelectedSubscription(value)}
          value={selectedSubscription}
        >
          <RadioGroupItem value={'10-day'}>
            $10 {t.pages.accountManagement.per} 1 {t.pages.accountManagement.day}
          </RadioGroupItem>
          <RadioGroupItem value={'50-weekly'}>
            $50 {t.pages.accountManagement.per} 7 {t.pages.accountManagement.week}
          </RadioGroupItem>
          <RadioGroupItem value={'100-monthly'}>
            $100 {t.pages.accountManagement.per} {t.pages.accountManagement.month}
          </RadioGroupItem>
        </RadioGroupRoot>
      </Card>
      <div className={s.paymentMethods}>
        <Button
          className={s.paymentMethodCard}
          disabled={isLoading}
          isLoading={selectedPaymentMethod === 'paypal' && isLoading}
          onClick={() => handlePay('paypal')}
          variant={'secondary'}
        >
          <PayPalIcon />
        </Button>
        <Typography>{t.pages.accountManagement.or}</Typography>
        <Button
          className={s.paymentMethodCard}
          disabled={isLoading}
          isLoading={selectedPaymentMethod === 'stripe' && isLoading}
          onClick={() => handlePay('stripe')}
          variant={'secondary'}
        >
          <StripeIcon />
        </Button>
        {/*<Card className={s.paymentMethodCard} onClick={() => handlePay('paypal')}>*/}
        {/*  <PayPalIcon />*/}
        {/*</Card>*/}
        {/*<Typography>{t.pages.accountManagement.or}</Typography>*/}
        {/*<Card className={s.paymentMethodCard} onClick={() => handlePay('stripe')}>*/}
        {/*  <StripeIcon />*/}
        {/*</Card>*/}
      </div>
    </section>
  )
}
