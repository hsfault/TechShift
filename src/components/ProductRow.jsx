import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductImage from './ProductImage'
import { money, effectivePrice } from '../lib/format'
import { useCart } from '../context/cart-context'

export default function ProductRow({ p }) {
  const { add } = useCart()
  const price = effectivePrice(p)
  const to = `/product/${p.id}`

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group list-none bg-ink"
    >
      <div className="grid grid-cols-[7.5rem_1fr] items-center gap-x-4 gap-y-3 border-b border-white/10 py-5 md:grid-cols-[14rem_1fr_auto] md:gap-x-10 md:py-7">
        <Link to={to} aria-label={p.name}>
          <ProductImage product={p} className="w-full transition-transform duration-500 group-hover:scale-105" />
        </Link>

        <Link to={to} className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            {p.brand} · {p.series}
          </p>
          <h3 className="font-display wide mt-1 text-lg leading-tight text-paper md:text-3xl">{p.name}</h3>
          <p className="mt-2 text-xs text-mute md:text-sm">
            {p.cpu} · {p.ram} GB · {p.storage}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {p.sale > 0 && (
              <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                -{p.sale}%
              </span>
            )}
            {p.badge && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-mute">{p.badge}</span>
            )}
          </div>
        </Link>

        <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:flex-col md:items-end">
          <div className="md:text-right">
            <p className="font-display wide text-xl text-paper md:text-2xl">{money(price)}</p>
            {p.sale > 0 && (
              <p className="font-mono text-[11px] text-mute line-through">{money(p.price)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => add(p.id)}
            className="min-h-[44px] rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink"
          >
            Add to bag
          </button>
        </div>
      </div>
    </motion.li>
  )
}