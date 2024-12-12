export type PaymentMethod = 'paypal' | 'stripe'

export type SubscribeRequestBody = {
  amount: number
  baseUrl: string
  paymentType: PaymentMethod
  typeSubscription: string
}

export type SubscribeResponse = {
  url: string
}

export type PaymentSubscription = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type GetCurrentPaymentSubscriptionsResponse = {
  data: PaymentSubscription[]
  hasAutoRenewal: boolean
}

export type MyPayment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: null | string
  subscriptionType: string
  userId: number
}

export type GetMyPaymentsResponse = MyPayment[]
