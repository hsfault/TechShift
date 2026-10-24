import { products } from '../data/products'
import ProductRow from '../components/ProductRow'
import Countdown from '../components/Countdown'
import Scene from '../components/Scene'
import Reveal from '../components/Reveal'
import { weekendEnd, SALE_NAME } from '../lib/sale'

export default function Deals() {
  const list = products.filter((p) => p.sale > 0).sort((a, b) => b.sale - a.sale)

  return (
    <div className="bg-ink">
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-44 md:px-12 md:pt-52">
        <Scene variant="sale" image="/media/bg/sale.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/20" />

        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Limited time</p>
          <Reveal
            as="h1"
            text={SALE_NAME}
            className="font-display wide mt-4 block text-[11vw] leading-[1] text-paper md:text-[6vw]"
          />
          <p className="mt-4 max-w-md text-paper/90">
            Up to 20% off selected laptops. Prices drop automatically in your bag.
          </p>
          <p className="mb-5 mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Sale ends in</p>
          <Countdown target={weekendEnd} variant="big" />
        </div>
      </section>

      <section className="px-5 pb-28 md:px-12">
        <ul className="mx-auto max-w-7xl">
          {list.map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </ul>
      </section>
    </div>
  )
}