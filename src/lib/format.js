export const CURRENCY = 'Rs.'

export const money = (n) => `${CURRENCY} ${Math.round(n).toLocaleString('en-US')}`

export const effectivePrice = (p) =>
  p.sale ? Math.round((p.price * (1 - p.sale / 100)) / 100) * 100 : p.price

// Each product category gets its own colour of light behind the laptop
export const glowFor = (p) =>
  ({
    business: 'rgba(77,124,255,0.3)',
    gaming: 'rgba(168,85,247,0.34)',
    ultrabook: 'rgba(56,189,248,0.3)',
    student: 'rgba(52,211,153,0.26)',
  })[p.category] || 'rgba(77,124,255,0.3)'