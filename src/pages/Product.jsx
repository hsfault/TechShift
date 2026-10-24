import { useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { getProduct, products, specsOf } from '../data/products'
import { useCart } from '../context/cart-context'
import { effectivePrice, money } from '../lib/format'
import { weekendEnd } from '../lib/sale'
import ProductImage from '../components/ProductImage'
import ProductTile from '../components/ProductTile'
import InspectionPanel from '../components/InspectionPanel'
import Countdown from '../components/Countdown'
import Reveal from '../components/Reveal'

function Wing({ items, side }) {
  const left = side === 'left'
  return (
    <dl className={`grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1 md:gap-14 ${left ? 'md:text-right' : ''}`}>
      {items.map(([k, v]) => (
        <div key={k} className={`flex flex-col ${left ? 'md:items-end' : ''}`}>
          <dt className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">{k}</dt>
          <dd className="font-display wide mt-2 text-lg leading-tight text-paper md:text-xl">{v}</dd>
          <span
            className={`mt-3 hidden h-px w-24 md:block ${
              left ? 'bg-gradient-to-r from-transparent to-accent' : 'bg-gradient-to-r from-accent to-transparent'
            }`}
          />
        </div>
      ))}
    </dl>
  )
}

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  if (!p) return <Navigate to="/shop" replace />
  return <ProductView key={p.id} p={p} />
}

function ProductView({ p }) {
  const navigate = useNavigate()
  const { add } = useCart()
  const reduce = useReducedMotion()
  const [qty, setQty] = useState(1)
  const price = effectivePrice(p)
  const specs = specsOf(p)

  const stage = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduce) return
    const r = stage.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const related = products
    .filter((o) => o.id !== p.id && (o.category === p.category || o.brand === p.brand))
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 4)

  const buyNow = () => {
    add(p.id, qty, false)
    navigate('/checkout')
  }

  return (
    <div className="bg-ink pb-28 md:pb-0">
      {/* Hero stage */}
      <section className="aurora px-5 pb-10 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-widest text-mute">
            <Link to="/shop" className="inline-flex min-h-[44px] items-center">Shop</Link>
            <span>/</span>
            <Link to={`/shop?brand=${p.brand}`} className="inline-flex min-h-[44px] items-center">{p.brand}</Link>
            <span>/</span>
            <span className="text-paper">{p.series}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              {p.brand} · {p.series}
            </p>
            {p.badge && (
              <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
                {p.badge}
              </span>
            )}
          </div>
          <h1 className="font-display wide mt-3 text-[11vw] leading-[0.95] text-paper md:text-[5.4vw]">{p.name}</h1>

          <div className="mt-6 grid items-center gap-8 md:grid-cols-[0.8fr_1.9fr_0.8fr] md:gap-6">
            <div className="hidden md:block">
              <Wing items={specs.slice(0, 3)} side="left" />
            </div>

            <div ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
              <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="float-a">
                    <ProductImage product={p} eager className="w-full" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="hidden md:block">
              <Wing items={specs.slice(3, 6)} side="right" />
            </div>

            <div className="md:hidden">
              <Wing items={specs.slice(0, 6)} side="right" />
            </div>
          </div>

          {/* Buy bar */}
          <div className="mt-12 flex flex-col gap-6 border-y border-white/10 py-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="font-display wide text-[10vw] leading-none text-paper md:text-[3.2vw]">{money(price)}</p>
                {p.sale > 0 && (
                  <>
                    <p className="font-mono text-sm text-mute line-through">{money(p.price)}</p>
                    <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                      Save {p.sale}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                ★ {p.rating} · {p.reviews} reviews · In stock
                {p.sale > 0 && (
                  <>
                    {' · '}Deal ends in <Countdown target={weekendEnd} className="text-accent" />
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full bg-white/10">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-paper"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-sm text-paper">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="grid h-12 w-12 place-items-center text-paper"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => add(p.id, qty)}
                className="min-h-[52px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
              >
                Add to bag
              </button>
              <button
                type="button"
                onClick={buyNow}
                className="glass min-h-[52px] rounded-full px-8 font-mono text-xs uppercase tracking-widest text-paper"
              >
                Buy now
              </button>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 font-mono text-[11px] uppercase tracking-widest text-mute md:grid-cols-4">
            <li className="py-2">Free nationwide delivery</li>
            <li className="py-2">Official warranty</li>
            <li className="py-2">7-day replacement</li>
            <li className="py-2">Cash on delivery</li>
          </ul>
        </div>
      </section>

      {/* Statement and full specs */}
      <section className="px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal
            as="h2"
            text={p.blurb}
            className="font-display wide block text-[7.5vw] leading-[1.1] text-paper md:text-[3.4vw]"
          />
          <dl className="mt-20 grid gap-x-16 md:grid-cols-2">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">{k}</dt>
                <dd className="text-paper sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Inspection */}
      <section className="px-5 pb-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <InspectionPanel product={p} />
        </div>
      </section>

      {/* Related */}
      <section className="px-5 pb-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">You may also like</p>
          <div className="no-scrollbar -mx-5 flex snap-x gap-6 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {related.map((o) => (
              <ProductTile key={o.id} p={o} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-white/10 bg-[#0A0D14]/95 px-5 py-3 md:hidden">
        <div>
          <p className="font-display wide text-lg text-paper">{money(price * qty)}</p>
          {p.sale > 0 && <p className="font-mono text-[10px] text-accent">Save {p.sale}%</p>}
        </div>
        <button
          type="button"
          onClick={() => add(p.id, qty)}
          className="min-h-[48px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
        >
          Add to bag
        </button>
      </div>
    </div>
  )
}