export const SALE_NAME = 'Mega Weekend Sale'

// Sale always ends at the coming Sunday 23:59:59, so it rolls over by itself
export const weekendEnd = () => {
  const d = new Date()
  d.setHours(23, 59, 59, 0)
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7))
  return d.getTime()
}

export const dayEnd = () => {
  const d = new Date()
  d.setHours(24, 0, 0, 0)
  return d.getTime()
}