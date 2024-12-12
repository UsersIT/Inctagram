export const getFormattedPaymentType = (type: string) => {
  switch (type) {
    case 'STRIPE':
      return 'Stripe'
    case 'PAYPAL':
      return 'PayPal'
    default:
      return type
  }
}
