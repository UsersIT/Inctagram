export const getFormattedDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat(locale, options).format(date)
}
