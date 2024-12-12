import { PaymentSubscription } from '@/src/features/businessAccountSubscription/model/types/api'

export const sumSubscriptionEndDates = (subscriptions: PaymentSubscription[]): Date => {
  if (!subscriptions || subscriptions.length === 0) {
    throw new Error('No subscriptions available to calculate')
  }

  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => new Date(a.dateOfPayment).getTime() - new Date(b.dateOfPayment).getTime()
  )

  const baseDate = new Date(sortedSubscriptions[0].dateOfPayment)

  const totalDays = sortedSubscriptions.reduce((sum, subscription) => {
    const endDate = new Date(subscription.endDateOfSubscription)
    const startDate = new Date(subscription.dateOfPayment)
    const durationInDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return sum + durationInDays
  }, 0)

  baseDate.setDate(baseDate.getDate() + totalDays)

  return baseDate
}
