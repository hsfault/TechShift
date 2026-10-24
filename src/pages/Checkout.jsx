import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/cart-context'
import ProductImage from '../components/ProductImage'
import { money } from '../lib/format'

const field =
  'min-h-[48px] w-full border-0 border-b border-white/25 bg-transparent py-3 text-base text-paper placeholder:text-mute focus:border-accent focus:outline-none'
const PAY = ['Cash on delivery', 'Bank transfer', 'Card']

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const [pay, setPay] = useState(PAY[0])
  const [order, setOrder] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    setOrder({
      id: `TS-${Math.floor(100000 + Math.random() * 900000)}`,
      total: subtotal,
      pay,
    })
    clear()
  }

  const shell = 'relative min-h-svh bg-ink px-5 pb-28 pt-44 md:px-12 md:pt-52'

  if (order) {
    return (
      <section className={shell}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Order placed</p>
          <h1 className="font-display wide mt-4 text-[11vw] leading-none text-paper md:text-[5vw]">
            Thank you.
          </h1>
          <p className="mt-6 text-paper/80">
            Your order <span className="font-mono text-accent">{order.id}</span> for {money(order.total)} is confirmed
            ({order.pay}). We will call you to confirm delivery.
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
          >
            Keep shopping
          </Link>
        </motion.div>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className={shell}>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display wide text-[9vw] leading-none text-paper md:text-[4vw]">Your bag is empty.</h1>
          <Link
            to="/shop"
            className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
          >
            Browse laptops
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={shell}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Checkout</p>
        <h1 className="font-display wide mt-4 text-[11vw] leading-none text-paper md:text-[5vw]">
          Almost yours.
        </h1>

        <div className="mt-14 flex flex-col gap-16 md:flex-row md:gap-20">
          <form onSubmit={submit} className="flex flex-col gap-7 md:w-3/5">
            <input className={field} type="text" placeholder="Full name" required />
            <input className={field} type="tel" placeholder="Phone number" required />
            <input className={field} type="email" placeholder="Email (optional)" />
            <input className={field} type="text" placeholder="Delivery address" required />
            <input className={field} type="text" placeholder="City" required />

            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Payment</p>
              <div className="flex flex-wrap gap-2">
                {PAY.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPay(m)}
                    aria-pressed={pay === m}
                    className={`min-h-[44px] rounded-full px-5 font-mono text-xs uppercase tracking-widest ${
                      pay === m ? 'bg-paper text-ink' : 'glass text-paper'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="min-h-[52px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink md:self-start"
            >
              Place order · {money(subtotal)}
            </button>
          </form>

          <div className="md:w-2/5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Your order</p>
            <ul className="mt-4">
              {lines.map((l) => (
                <li key={l.id} className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 border-b border-white/10 py-4">
                  <ProductImage product={l.product} />
                  <div className="min-w-0">
                    <p className="font-display wide text-sm leading-tight text-paper">{l.product.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-mute">Qty {l.qty}</p>
                  </div>
                  <p className="font-mono text-xs text-paper">{money(l.total)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Total</span>
              <span className="font-display wide text-2xl text-paper">{money(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-mute">Free nationwide delivery included.</p>
          </div>
        </div>
      </div>
    </section>
  )
}