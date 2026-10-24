import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductImage from './ProductImage'
import Countdown from './Countdown'
import Reveal from './Reveal'
import { products } from '../data/products'
import { money, effectivePrice } from '../lib/format'
import { dayEnd } from '../lib/sale'
import { useCart } from '../context/cart-context'

const deals = products
  .filter((p) => p.sale > 0)
  .sort((a, b) => b.sale - a.sale)
  .slice(0, 6)

export default function DealRail() {
  const { add } = useCart()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const p = deals[i]
  const price = effectivePrice(p)
  const next = () => setI((v) => (v + 1) % deals.length)

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Flash deals</p>
      <Reveal
        as="h2"
        text="Gone at midnight."
        className="font-display wide mt-4 block text-[12vw] leading-[1] text-paper md:text-[5vw]"
      />
      <p className="mb-5 mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">
        Flash prices reset in
      </p>
      <Countdown target={dayEnd} variant="big" compact />

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 md:grid-cols-[1fr_1.25fr] md:gap-12"
          >
            <div className="order-2 md:order-1">
              <p className="font-display wide outline-text text-[24vw] leading-[0.85] md:text-[9vw]">
                -{p.sale}%
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                {p.brand} · {p.series}
              </p>
              <h3 className="font-display wide mt-2 text-3xl leading-none text-paper md:text-5xl">{p.name}</h3>
              <p className="mt-3 text-sm text-mute">
                {p.cpu} · {p.ram} GB · {p.storage}
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="font-display wide text-3xl text-paper md:text-4xl">{money(price)}</p>
                <p className="font-mono text-xs text-mute line-through">{money(p.price)}</p>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                You save {money(p.price - price)}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => add(p.id)}
                  className="min-h-[52px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
                >
                  Add to bag
                </button>
                <Link
                  to={`/product/${p.id}`}
                  className="glass flex min-h-[52px] items-center rounded-full px-8 font-mono text-xs uppercase tracking-widest text-paper"
                >
                  View
                </Link>
              </div>
            </div>

            <Link to={`/product/${p.id}`} aria-label={p.name} className="order-1 md:order-2">
              <ProductImage product={p} eager className="w-full" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-6 overflow-x-auto px-5 md:mx-0 md:px-0">
        {deals.map((d, k) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Show ${d.name}`}
            aria-pressed={k === i}
            className={`w-32 shrink-0 text-left transition-opacity duration-300 md:w-44 ${
              k === i ? 'opacity-100' : 'opacity-50 hover:opacity-90'
            }`}
          >
            <ProductImage product={d} />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mute">{d.series}</p>
            <div className="mt-2 h-[2px] w-full bg-white/15">
              {k === i && (
                <motion.span
                  key={i}
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 6, ease: 'linear' }}
                  onAnimationComplete={() => {
                    if (!reduce) next()
                  }}
                  className="block h-full origin-left bg-accent"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <Link
        to="/deals"
        className="mt-8 flex min-h-[44px] items-center font-mono text-xs uppercase tracking-widest text-accent"
      >
        See every deal →
      </Link>
    </div>
  )
}