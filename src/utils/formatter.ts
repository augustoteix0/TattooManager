export function priceFormatter(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export const dateFormatter = (date: string | Date) => { 
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(date)) }