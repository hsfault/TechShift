import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { products } from '../data/products'
import ProductImage from './ProductImage'
import Reveal from './Reveal'
import { money, effectivePrice } from '../lib/format'

const best = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 7)

const arrow =
  'glass absolute top-[29.25vw] z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-paper transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 md:top-[11.25rem]'

export default function BestSellers() {
  const ref = useRef(null)
  const progress = useMotionValue(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const onScroll = () => {
    const el = ref.current
    const max = el.scrollWidth - el.clientWidth
    progress.set(max > 0 ? el.scrollLeft / max : 0)
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft > max - 8)
  }

  const by = (dir) =>
    ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: 'smooth' })

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Best sellers</p>
        <Reveal
          as="h2"
          text="What everyone is buying."
          className="font-display wide mt-4 block text-[12vw] leading-[1] text-paper md:text-[5vw]"
        />
      </div>

      <div className="relative mt-10">
        <button
          type="button"
          aria-label="Previous"
          disabled={atStart}
          onClick={() => by(-1)}
          className={`${arrow} left-2 md:left-6`}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={atEnd}
          onClick={() => by(1)}
          className={`${arrow} right-2 md:right-6`}
        >
          →
        </button>

        <div
          ref={ref}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-10 overflow-x-auto px-5 pb-6 md:px-12"
        >
          {best.map((p, i) => (
            <article key={p.id} className="w-[78vw] shrink-0 snap-start md:w-[30rem]">
              <Link to={`/product/${p.id}`} aria-label={p.name} className="group block">
                <ProductImage
                  product={p}
                  className="w-full transition-transform duration-500 group-hover:-translate-y-2"
                />
              </Link>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display wide outline-text text-3xl leading-none">0{i + 1}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {p.brand} · {p.series}
                </span>
              </div>
              <p className="font-display wide mt-2 text-xl text-paper md:text-2xl">{p.name}</p>
              <p className="mt-1 text-sm text-mute">
                ★ {p.rating} · {p.reviews} reviews
              </p>
              <p className="mt-1 text-paper">{money(effectivePrice(p))}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-5 md:px-12">
        <div className="h-[2px] w-full bg-white/15">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
        </div>
        <Link
          to="/shop"
          className="mt-8 flex min-h-[44px] items-center font-mono text-xs uppercase tracking-widest text-accent"
        >
          See all laptops →
        </Link>
      </div>
    </div>
  )
}