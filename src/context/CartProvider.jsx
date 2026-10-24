import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context'
import { getProduct } from '../data/products'
import { effectivePrice } from '../lib/format'

const KEY = 'techshift-cart'

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(raw) ? raw.filter((i) => getProduct(i.id)) : []
  } catch {
    return []
  }
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const add = useCallback((id, qty = 1, openDrawer = true) => {
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
        : [...prev, { id, qty }]
    )
    if (openDrawer) setOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(10, qty) } : i))
    )
  }, [])

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])

  const lines = useMemo(
    () =>
      items.map((i) => {
        const product = getProduct(i.id)
        const unit = effectivePrice(product)
        return { ...i, product, unit, total: unit * i.qty }
      }),
    [items]
  )

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.total, 0),
      add, setQty, remove, clear, open, openCart, closeCart,
    }),
    [lines, add, setQty, remove, clear, open, openCart, closeCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}