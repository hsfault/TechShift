import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/cart-context'
import ProductImage from './ProductImage'
import { money } from '../lib/format'

export default function CartDrawer() {
  const { open, closeCart, lines, subtotal, setQty, remove } = useCart()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeCart])

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          key="backdrop"
          type="button"
          aria-label="Close bag"
          onClick={closeCart}
          className="fixed inset-0 z-[65] bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {open && (
        <motion.aside
          key="panel"
          aria-label="Shopping bag"
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-[#0A0D14]"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <p className="font-display wide text-xl text-paper">Your bag</p>
            <button
              type="button"
              onClick={closeCart}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-paper"
              aria-label="Close bag"
            >
              ✕
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
              <p className="text-mute">Your bag is empty.</p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="flex min-h-[48px] items-center rounded-full bg-paper px-7 font-mono text-xs uppercase tracking-widest text-ink"
              >
                Browse laptops
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto px-6">
                {lines.map((l) => (
                  <li key={l.id} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-white/10 py-5">
                    <Link to={`/product/${l.id}`} onClick={closeCart}>
                      <ProductImage product={l.product} />
                    </Link>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {l.product.brand}
                      </p>
                      <p className="font-display wide text-base leading-tight text-paper">{l.product.name}</p>
                      <p className="mt-1 text-sm text-mute">{money(l.unit)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-white/10">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="grid h-11 w-11 place-items-center text-paper"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-mono text-sm text-paper">{l.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="grid h-11 w-11 place-items-center text-paper"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(l.id)}
                          className="min-h-[44px] px-2 font-mono text-[11px] uppercase tracking-widest text-mute"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Subtotal</span>
                  <span className="font-display wide text-2xl text-paper">{money(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-mute">Free nationwide delivery. Cash on delivery available.</p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="mt-5 flex min-h-[52px] items-center justify-center rounded-full bg-paper font-mono text-xs uppercase tracking-widest text-ink"
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 flex min-h-[44px] w-full items-center justify-center font-mono text-[11px] uppercase tracking-widest text-mute"
                >
                  Continue shopping
                </button>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}