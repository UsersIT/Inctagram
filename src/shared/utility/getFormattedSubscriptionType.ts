export const getFormattedSubscriptionType = (type: string) => {
  switch (type) {
    case 'MONTHLY':
      return '1 month'
    case 'WEEKLY':
      return '7 days'
    case 'DAY':
      return '1 day'
    default:
      return type
  }
}
