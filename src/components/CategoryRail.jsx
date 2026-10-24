import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, products } from '../data/products'
import ProductImage from './ProductImage'

const blurbs = {
  business: 'Built for the long working day.',
  gaming: 'Frame rates that never flinch.',
  ultrabook: 'Thin, light and beautiful.',
  student: 'Smart picks for small budgets.',
}

const inCategory = (id) => products.filter((p) => p.category === id)
const feature = (id) => [...inCategory(id)].sort((a, b) => b.rating - a.rating)[0]

export default function CategoryRail() {
  const [i, setI] = useState(0)
  const [id] = categories[i]
  const p = feature(id)

  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
      <ul>
        {categories.map(([cid, label], k) => (
          <li key={cid} onMouseEnter={() => setI(k)}>
            <Link
              to={`/shop?category=${cid}`}
              onFocus={() => setI(k)}
              className="flex min-h-[64px] items-baseline justify-between gap-4 border-b border-white/10 py-4"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-mute">0{k + 1}</span>
                <span
                  className={`font-display wide text-[11vw] leading-none transition-all duration-500 md:text-[5.4vw] ${
                    i === k ? 'text-paper md:translate-x-4' : 'outline-text'
                  }`}
                >
                  {label.toUpperCase()}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-mute">
                {inCategory(cid).length} models
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="bg-ink"
          >
            <Link to={`/product/${p.id}`} aria-label={p.name}>
              <ProductImage product={p} />
            </Link>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {p.brand} · {p.series}
            </p>
            <p className="font-display wide mt-1 text-2xl text-paper">{p.name}</p>
            <p className="mt-1 text-mute">{blurbs[id]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}