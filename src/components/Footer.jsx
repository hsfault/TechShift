import { Link } from 'react-router-dom'
import { brands, categories } from '../data/products'

const col = 'flex flex-col'
const item =
  'flex min-h-[44px] items-center text-mute transition-colors hover:text-paper'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 md:flex-row md:justify-between">
        <div className="md:max-w-xs">
          <p className="font-display wide text-2xl text-paper">
            THE TECH<span className="text-accent">SHIFT</span>
          </p>
          <p className="mt-3 text-sm text-mute">
            Every serious laptop, one trusted shop. Free delivery, official warranty, cash on delivery.
          </p>
          <a
            href="mailto:hello@thetechshift.com"
            className="mt-6 flex min-h-[44px] items-center font-mono text-xs uppercase tracking-widest text-accent"
          >
            hello@thetechshift.com
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 font-mono text-xs uppercase tracking-widest sm:grid-cols-3">
          <ul className={col}>
            <li className="mb-2 text-paper">Brands</li>
            {brands.map((b) => (
              <li key={b}>
                <Link to={`/shop?brand=${b}`} className={item}>{b}</Link>
              </li>
            ))}
          </ul>
          <ul className={col}>
            <li className="mb-2 text-paper">Shop</li>
            <li><Link to="/shop" className={item}>All laptops</Link></li>
            {categories.map(([id, label]) => (
              <li key={id}>
                <Link to={`/shop?category=${id}`} className={item}>{label}</Link>
              </li>
            ))}
            <li><Link to="/deals" className={item}>Deals</Link></li>
          </ul>
          <ul className={col}>
            <li className="mb-2 text-paper">Help</li>
            <li><Link to="/contact" className={item}>Contact</Link></li>
            <li><Link to="/contact" className={item}>Delivery</Link></li>
            <li><Link to="/contact" className={item}>Warranty</Link></li>
            <li><Link to="/contact" className={item}>Returns</Link></li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-6xl font-mono text-[11px] uppercase tracking-widest text-mute">
        © 2026 The TechShift
      </p>
    </footer>
  )
}