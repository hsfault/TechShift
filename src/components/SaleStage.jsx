import { Link } from 'react-router-dom'
import Scene from './Scene'
import ProductImage from './ProductImage'
import Countdown from './Countdown'
import { getProduct, maxSale } from '../data/products'
import { weekendEnd, SALE_NAME } from '../lib/sale'

const lineup = [
  { id: 'lenovo-thinkpad-x1-carbon', pos: 'left-0 top-[24%] w-[48%]', float: 'float-b', glow: 'rgba(56,189,248,0.34)', z: 'z-0' },
  { id: 'dell-xps-15', pos: 'right-0 top-[30%] w-[48%]', float: 'float-c', glow: 'rgba(77,124,255,0.34)', z: 'z-0' },
  { id: 'asus-rog-strix-g16', pos: 'left-[19%] top-[2%] w-[62%]', float: 'float-a', glow: 'rgba(168,85,247,0.42)', z: 'z-10' },
]

const streaks = [
  { top: '18%', delay: '0s' },
  { top: '46%', delay: '2.4s' },
  { top: '72%', delay: '4.6s' },
]

export default function SaleStage() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-0">
      <Scene variant="sale" image="/media/bg/sale.jpg" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-transparent" />
      {streaks.map((s) => (
        <span key={s.top} className="streak" style={{ top: s.top, animationDelay: s.delay }} />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 md:min-h-[88svh] md:flex-row md:items-center md:px-12">
        <div className="md:w-[46%]">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">{SALE_NAME}</p>
          <h2 className="font-display wide mt-4 text-[13vw] leading-[0.92] text-paper md:text-[6.4vw]">
            UP TO
            <br />
            <span className="outline-text">{maxSale}% OFF</span>
          </h2>
          <p className="mt-5 max-w-md text-paper/85">
            Selected laptops from HP, Lenovo, Dell, ASUS and more. Prices drop automatically in your bag.
          </p>
          <p className="mb-4 mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Sale ends in</p>
          <Countdown target={weekendEnd} variant="big" compact />
          <Link
            to="/deals"
            className="mt-9 inline-flex min-h-[52px] items-center rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
          >
            Shop the sale
          </Link>
        </div>

        <div className="relative mt-14 aspect-[5/4] w-full md:absolute md:inset-y-0 md:right-0 md:mt-0 md:aspect-auto md:w-[56%]">
          {lineup.map((l) => {
            const p = getProduct(l.id)
            return (
              <div key={l.id} className={`absolute ${l.pos} ${l.z}`}>
                <div className={l.float}>
                  <Link to={`/product/${p.id}`} aria-label={p.name}>
                    <ProductImage product={p} glow={l.glow} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}