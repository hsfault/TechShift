import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { money, effectivePrice } from '../lib/format'

export default function ProductTile({ p, className = 'w-[68vw] shrink-0 snap-start md:w-auto' }) {
  return (
    <Link to={`/product/${p.id}`} className={`group block bg-ink ${className}`}>
      <ProductImage product={p} className="transition-transform duration-500 group-hover:-translate-y-2" />
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        {p.brand} · {p.series}
      </p>
      <p className="font-display wide mt-1 text-base text-paper md:text-lg">{p.name}</p>
      <p className="mt-1 text-sm text-mute">{money(effectivePrice(p))}</p>
    </Link>
  )
}