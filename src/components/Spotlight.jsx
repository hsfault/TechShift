import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import Reveal from './Reveal'
import { getProduct, specsOf } from '../data/products'

const p = getProduct('dell-xps-15')
const rows = specsOf(p).slice(0, 7)

const spots = [
  { x: '36%', y: '30%', label: 'Display' },
  { x: '47%', y: '66%', label: 'Keyboard' },
  { x: '15%', y: '68%', label: 'Ports' },
]

export default function Spotlight() {
  return (
    <section className="px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
        <div className="relative overflow-hidden">
          <ProductImage product={p} className="w-full" />
          <div className="scan" />
          {spots.map((s) => (
            <div key={s.label} className="absolute" style={{ left: s.x, top: s.y }}>
              <span className="relative block h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
                <span className="absolute inset-0 rounded-full bg-accent" />
              </span>
              <span className="glass absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">In the showroom</p>
          <Reveal
            as="h2"
            text="See them in the light."
            className="font-display wide mt-4 block text-[12vw] leading-[1] text-paper md:text-[4.2vw]"
          />
          <p className="mt-5 max-w-md text-paper/80">
            Every machine is tested on our bench before it ships. Here is the full spec of the {p.name}.
          </p>
          <dl className="mt-8">
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">{k}</dt>
                <dd className="text-right text-paper">{v}</dd>
              </div>
            ))}
          </dl>
          <Link
            to={`/product/${p.id}`}
            className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
          >
            View the {p.series}
          </Link>
        </div>
      </div>
    </section>
  )
}