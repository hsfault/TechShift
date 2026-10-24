import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductImage from './ProductImage'
import Countdown from './Countdown'
import { getProduct } from '../data/products'
import { money, effectivePrice } from '../lib/format'
import { weekendEnd } from '../lib/sale'

const offsets = ['md:mt-16', 'md:mt-0', 'md:mt-28']

export default function PromoBand({ eyebrow, lines, body, to, cta, ids, glow }) {
  const items = ids.map(getProduct)

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
            <h2 className="font-display wide mt-4 text-[12vw] leading-[0.95] text-paper md:text-[5.6vw]">
              {lines[0]}
              <br />
              <span className="outline-text">{lines[1]}</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="text-paper/85">{body}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-mute">
              Ends in <Countdown target={weekendEnd} className="text-accent" />
            </p>
            <Link
              to={to}
              className="mt-5 inline-flex min-h-[52px] items-center rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
            >
              {cta}
            </Link>
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-16 flex snap-x gap-6 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
          {items.map((p, k) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, delay: k * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`w-[78vw] shrink-0 snap-start md:w-auto ${offsets[k]}`}
            >
              <Link to={`/product/${p.id}`} className="group block">
                <ProductImage
                  product={p}
                  glow={glow}
                  className="w-full transition-transform duration-500 group-hover:-translate-y-2"
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {p.brand} · {p.series}
                </p>
                <p className="font-display wide mt-1 text-lg text-paper md:text-xl">{p.name}</p>
                <p className="mt-1 text-sm text-mute">
                  {money(effectivePrice(p))}
                  {p.sale > 0 && <span className="ml-3 text-accent">-{p.sale}%</span>}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}