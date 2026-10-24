import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { products, brands, categories, seriesOf } from '../data/products'
import { effectivePrice, money } from '../lib/format'
import { useCart } from '../context/cart-context'
import ProductImage from '../components/ProductImage'
import Reveal from '../components/Reveal'

const MAX = 600000
const SORTS = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['rating', 'Top rated'],
  ['discount', 'Biggest deals'],
]

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 font-mono text-[11px] uppercase tracking-widest transition-colors ${
        active ? 'bg-paper text-ink' : 'glass text-paper'
      }`}
    >
      {children}
    </button>
  )
}

function Group({ title, children }) {
  return (
    <div className="mb-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Stage({ p }) {
  const { add } = useCart()
  const price = effectivePrice(p)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <ProductImage product={p} eager className="w-full" />
        </Link>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          {p.brand} · {p.series}
        </p>
        <h2 className="font-display wide mt-2 text-4xl leading-none text-paper">{p.name}</h2>
        <p className="mt-3 text-mute">
          {p.cpu} · {p.ram} GB · {p.storage}
        </p>
        <p className="text-mute">{p.display}</p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-display wide text-3xl text-paper">{money(price)}</p>
          {p.sale > 0 && (
            <>
              <p className="font-mono text-xs text-mute line-through">{money(p.price)}</p>
              <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                -{p.sale}%
              </span>
            </>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => add(p.id)}
            className="min-h-[52px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
          >
            Add to bag
          </button>
          <Link
            to={`/product/${p.id}`}
            className="glass flex min-h-[52px] items-center rounded-full px-8 font-mono text-xs uppercase tracking-widest text-paper"
          >
            View details
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Item({ p, i, active, onActive }) {
  const { add } = useCart()
  const price = effectivePrice(p)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onActive(p.id)}
      className="list-none border-b border-white/10 bg-ink"
    >
      <Link
        to={`/product/${p.id}`}
        onFocus={() => onActive(p.id)}
        className="grid grid-cols-[6.5rem_1fr] items-center gap-x-4 py-5 md:grid-cols-[2rem_1fr_auto] md:gap-x-6 md:py-6"
      >
        <div className="md:hidden">
          <ProductImage product={p} />
        </div>
        <span className="hidden font-mono text-xs text-mute md:block">{String(i + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            {p.brand} · {p.series}
          </p>
          <p
            className={`font-display wide mt-1 text-lg leading-tight transition-all duration-300 md:text-2xl ${
              active ? 'text-paper md:translate-x-2' : 'text-paper md:text-mute'
            }`}
          >
            {p.name}
          </p>
          <p className="mt-1 text-xs text-mute md:hidden">
            {p.ram} GB · {p.storage}
          </p>
          <p className="mt-2 text-paper md:hidden">
            {money(price)}
            {p.sale > 0 && <span className="ml-2 font-mono text-[11px] text-accent">-{p.sale}%</span>}
          </p>
        </div>
        <div className="hidden text-right md:block">
          <p className="font-display wide text-lg text-paper">{money(price)}</p>
          {p.sale > 0 && <p className="font-mono text-[11px] text-accent">-{p.sale}%</p>}
        </div>
      </Link>
      <button
        type="button"
        onClick={() => add(p.id)}
        className="mb-5 min-h-[44px] rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink md:hidden"
      >
        Add to bag
      </button>
    </motion.li>
  )
}

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const [sheet, setSheet] = useState(false)
  const [hoverId, setHoverId] = useState(null)

  const get = (k) => sp.get(k) || ''
  const put = (k, v) => {
    const n = new URLSearchParams(sp)
    if (v) n.set(k, v)
    else n.delete(k)
    if (k === 'brand') n.delete('series')
    setSp(n, { replace: true })
  }
  const toggle = (k, v) => put(k, get(k) === v ? '' : v)
  const reset = () => setSp({}, { replace: true })

  const brand = get('brand')
  const series = get('series')
  const category = get('category')
  const ram = get('ram')
  const sort = get('sort') || 'featured'
  const qRaw = get('q')
  const max = Number(get('max')) || MAX

  useEffect(() => {
    if (!sheet) return
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    return () => {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [sheet])

  const list = useMemo(() => {
    const q = qRaw.trim().toLowerCase()
    const out = products.filter(
      (p) =>
        (!brand || p.brand === brand) &&
        (!series || p.series === series) &&
        (!category || p.category === category) &&
        (!ram || p.ram >= Number(ram)) &&
        effectivePrice(p) <= max &&
        (!q || `${p.brand} ${p.series} ${p.name} ${p.cpu} ${p.gpu} ${p.category}`.toLowerCase().includes(q))
    )
    const by = {
      'price-asc': (a, b) => effectivePrice(a) - effectivePrice(b),
      'price-desc': (a, b) => effectivePrice(b) - effectivePrice(a),
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => b.sale - a.sale,
    }[sort]
    return by ? [...out].sort(by) : out
  }, [brand, series, category, ram, sort, qRaw, max])

  const active = list.find((p) => p.id === hoverId) || list[0]

  const title = series
    ? `${series} laptops`
    : brand
      ? `${brand} laptops`
      : category
        ? `${categories.find((c) => c[0] === category)[1]} laptops`
        : 'All laptops'

  return (
    <section className="relative bg-ink px-5 pb-28 pt-40 md:px-12 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">The shop</p>
        <Reveal
          key={title}
          as="h1"
          text={title}
          className="font-display wide mt-4 block text-[11vw] leading-[1] text-paper md:text-[5vw]"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={qRaw}
            onChange={(e) => put('q', e.target.value)}
            placeholder="Search ThinkPad, EliteBook, RTX…"
            aria-label="Search laptops"
            className="glass min-h-[44px] min-w-0 flex-1 rounded-full bg-transparent px-5 text-base text-paper placeholder:text-mute focus:outline-none md:max-w-md md:flex-none md:basis-96"
          />
          <select
            value={sort}
            onChange={(e) => put('sort', e.target.value === 'featured' ? '' : e.target.value)}
            aria-label="Sort"
            className="glass min-h-[44px] rounded-full bg-transparent px-5 font-mono text-xs uppercase tracking-widest text-paper focus:outline-none"
          >
            {SORTS.map(([v, l]) => (
              <option key={v} value={v} className="bg-ink">{l}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSheet(true)}
            className="min-h-[44px] rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink"
          >
            More filters
          </button>
        </div>

        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          <Chip active={!brand} onClick={() => put('brand', '')}>All brands</Chip>
          {brands.map((b) => (
            <Chip key={b} active={brand === b} onClick={() => toggle('brand', b)}>{b}</Chip>
          ))}
        </div>
        <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          <Chip active={!category} onClick={() => put('category', '')}>Any use</Chip>
          {categories.map(([id, label]) => (
            <Chip key={id} active={category === id} onClick={() => toggle('category', id)}>{label}</Chip>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">
          {list.length} {list.length === 1 ? 'laptop' : 'laptops'}
        </p>

        {list.length === 0 ? (
          <div className="py-24">
            <p className="font-display wide text-2xl text-paper">Nothing matches.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 min-h-[48px] rounded-full bg-paper px-7 font-mono text-xs uppercase tracking-widest text-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div className="hidden md:block">
              <div className="sticky top-36">
                <Stage p={active} />
              </div>
            </div>
            <ul>
              <AnimatePresence initial={false}>
                {list.map((p, i) => (
                  <Item key={p.id} p={p} i={i} active={active.id === p.id} onActive={setHoverId} />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {sheet && (
          <motion.button
            key="bd"
            type="button"
            aria-label="Close filters"
            onClick={() => setSheet(false)}
            className="fixed inset-0 z-[65] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {sheet && (
          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-h-[85svh] overflow-y-auto rounded-t-[2rem] bg-[#0A0D14] px-6 pb-8 pt-6 md:bottom-8 md:max-w-xl md:rounded-[2rem]"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display wide text-xl text-paper">More filters</p>
              <button
                type="button"
                onClick={() => setSheet(false)}
                className="min-h-[44px] rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink"
              >
                Show {list.length}
              </button>
            </div>

            <Group title="Line">
              {seriesOf(brand).map((s) => (
                <Chip key={s} active={series === s} onClick={() => toggle('series', s)}>{s}</Chip>
              ))}
            </Group>
            <Group title="Memory">
              {[8, 16, 32].map((r) => (
                <Chip key={r} active={ram === String(r)} onClick={() => toggle('ram', String(r))}>
                  {r} GB+
                </Chip>
              ))}
            </Group>
            <div className="mb-8">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Max price</p>
              <p className="font-display wide text-lg text-paper">{money(max)}</p>
              <div className="flex min-h-[44px] items-center">
                <input
                  type="range"
                  min="100000"
                  max={MAX}
                  step="10000"
                  value={max}
                  onChange={(e) => put('max', Number(e.target.value) >= MAX ? '' : e.target.value)}
                  aria-label="Maximum price"
                  className="w-full accent-[#8FB4FF]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="min-h-[44px] font-mono text-[11px] uppercase tracking-widest text-mute underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}