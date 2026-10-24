import { Link } from 'react-router-dom'
import { brands, seriesOf } from '../data/products'

function Row({ items, reverse = false, size }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track flex w-max items-center ${reverse ? 'reverse' : ''}`}>
        {loop.map((it, i) => (
          <div key={i} className="flex items-center">
            <Link
              to={it.to}
              aria-hidden={i >= items.length}
              tabIndex={i >= items.length ? -1 : 0}
              className={`marquee-word outline-text font-display wide flex min-h-[44px] items-center whitespace-nowrap leading-[1.05] ${size}`}
            >
              {it.label}
            </Link>
            <span className="mx-[3vw] inline-block h-[1.2vw] min-h-2 w-[1.2vw] min-w-2 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandMarquee() {
  const brandItems = brands.map((b) => ({ label: b.toUpperCase(), to: `/shop?brand=${b}` }))
  const lineItems = seriesOf('').map((s) => ({ label: s.toUpperCase(), to: `/shop?series=${s}` }))

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Row items={brandItems} size="text-[13vw] md:text-[8vw]" />
      <Row items={lineItems} reverse size="text-[9vw] md:text-[5vw]" />
    </div>
  )
}