export const formatCurrency = (value: number | string, locale?: string, currency?: string) => {
  if (!value) return ''
  const amount = new Intl.NumberFormat(locale ?? 'pt-Br', {
    style: 'currency',
    currency: currency ?? 'BRL'
  })
    .format(Number(value))
    .replace(/\s/g, '')
    .replace('$', '$ ')

  return amount
}
