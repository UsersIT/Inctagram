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
