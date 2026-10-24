import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import ProductImage from '../components/ProductImage'
import { brands, products } from '../data/products'
import { effectivePrice, money } from '../lib/format'

const USES = [
  ['Work and business', 'business'],
  ['Gaming', 'gaming'],
  ['Creative work', 'ultrabook'],
  ['School or uni', 'student'],
  ['A bulk order', ''],
  ['Something else', ''],
]

const START = {
  id: 0,
  from: 'bot',
  text: "Hey, I'm Shift, the TechShift concierge. What are we shopping for?",
}
const DEFAULTS = { category: '', useLabel: '', budget: 250000, brand: '' }

const chip =
  'min-h-[44px] rounded-full border border-white/20 bg-white/10 px-4 text-sm text-paper transition-colors hover:bg-white/20'
const field =
  'min-h-[44px] w-full rounded-xl border border-white/15 bg-white/10 px-4 text-base text-paper placeholder:text-mute focus:border-accent focus:outline-none'
const dockBtn = 'grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-paper'
const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, className: 'h-5 w-5' }

function recommend(a) {
  const fits = (p, brand) =>
    (!a.category || p.category === a.category) &&
    (!brand || p.brand === brand) &&
    effectivePrice(p) <= a.budget
  let list = products.filter((p) => fits(p, a.brand))
  if (!list.length) list = products.filter((p) => fits(p, ''))
  return list.sort((x, y) => y.rating - x.rating).slice(0, 2)
}

export default function Contact() {
  const reduce = useReducedMotion()
  const [msgs, setMsgs] = useState([START])
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(null)
  const [ans, setAns] = useState(DEFAULTS)
  const [budget, setBudget] = useState(DEFAULTS.budget)
  const [name, setName] = useState('')
  const [reach, setReach] = useState('')
  const [clock, setClock] = useState(() => new Date())
  const box = useRef(null)
  const ids = useRef(1)

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  // Shift "types" for a moment, then the next message arrives
  useEffect(() => {
    if (!pending) return
    const id = setTimeout(() => {
      setMsgs((m) => [...m, pending.bot])
      setStep(pending.next)
      setPending(null)
    }, 800)
    return () => clearTimeout(id)
  }, [pending])

  useEffect(() => {
    const el = box.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [msgs, pending, reduce])

  const mk = (from, text, extra = {}) => ({ id: ids.current++, from, text, ...extra })

  const reply = (text, patch, bot, next) => {
    setMsgs((m) => [...m, mk('me', text)])
    setAns((a) => ({ ...a, ...patch }))
    setStep(-1)
    setPending({ bot, next })
  }

  const pickUse = (label, category) =>
    reply(label, { category, useLabel: label }, mk('bot', 'Good choice. Roughly what budget feels right?'), 1)

  const confirmBudget = () =>
    reply(`Up to ${money(budget)}`, { budget }, mk('bot', 'Any brand you already love?'), 2)

  const pickBrand = (brand) =>
    reply(brand || 'No preference', { brand }, mk('bot', 'Last thing. How should we reach you?'), 3)

  const sendContact = (e) => {
    e.preventDefault()
    const done = { ...ans, name: name.trim(), reach: reach.trim() }
    const first = done.name.split(' ')[0] || 'there'
    const summary = `${done.useLabel || 'Anything'} · up to ${money(done.budget)} · ${done.brand || 'any brand'}`
    reply(
      `${done.name} · ${done.reach}`,
      { name: done.name, reach: done.reach },
      mk('bot', `Got it, ${first}. A real person from our team will contact you within one working day.`, {
        recs: recommend(done),
        summary,
      }),
      4
    )
  }

  const restart = () => {
    setMsgs([START])
    setStep(0)
    setPending(null)
    setAns(DEFAULTS)
    setBudget(DEFAULTS.budget)
    setName('')
    setReach('')
  }

  const time = clock.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const day = clock.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <section className="relative px-5 pb-28 pt-40 md:px-12 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Contact</p>
        <Reveal
          as="h1"
          text="Not sure which one? Ask us."
          className="font-display wide mt-4 block text-[11vw] leading-[1] text-paper md:text-[5vw]"
        />
        <p className="mt-4 max-w-md text-paper/80">
          Tell our concierge what you need. It takes under a minute.
        </p>

        {/* The laptop */}
        <div className="mt-14 shadow-[0_50px_80px_-40px_rgba(0,0,0,0.9)]">
          <motion.div
            style={{ transformOrigin: '50% 100%', transformPerspective: 1800 }}
            initial={reduce ? false : { rotateX: -88, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative rounded-t-[1.4rem] border border-white/10 bg-[#04060c] p-2.5 md:rounded-t-[1.8rem] md:p-4"
          >
            <span className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1b2440] md:top-1.5" />

            <div className="relative h-[36rem] overflow-hidden rounded-xl bg-gradient-to-b from-[#050913] to-[#10264f] md:aspect-[16/10] md:h-auto">
              <img
                src="/media/bg/hero.jpg"
                alt=""
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/45" />

              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {/* Menu bar */}
                <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-between bg-black/45 px-4 font-mono text-[11px] text-paper">
                  <div className="flex items-center gap-5">
                    <span className="font-display wide text-xs">TECHSHIFT</span>
                    <span className="hidden text-paper/75 md:inline">Concierge</span>
                    <span className="hidden text-paper/75 md:inline">Window</span>
                    <span className="hidden text-paper/75 md:inline">Help</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline">{day}</span>
                    <span>{time}</span>
                  </div>
                </div>

                {/* Chat window */}
                <div className="absolute inset-x-3 bottom-3 top-11 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0B1020]/90 shadow-2xl md:inset-x-[12%] md:bottom-[14%] md:top-[11%]">
                  <div className="flex h-11 shrink-0 items-center gap-3 border-b border-white/10 px-4">
                    <span className="flex gap-1.5">
                      <i className="block h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                      <i className="block h-3 w-3 rounded-full bg-[#febc2e]/80" />
                      <i className="block h-3 w-3 rounded-full bg-[#28c840]/80" />
                    </span>
                    <span className="flex-1 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
                      Concierge · Shift
                    </span>
                    <span className="w-12" />
                  </div>

                  <div
                    ref={box}
                    data-lenis-prevent
                    role="log"
                    aria-live="polite"
                    className="flex-1 space-y-3 overflow-y-auto p-4"
                  >
                    {msgs.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm md:text-[15px] ${
                            m.from === 'me'
                              ? 'rounded-br-md bg-accent text-ink'
                              : 'rounded-bl-md bg-white/10 text-paper'
                          }`}
                        >
                          <p>{m.text}</p>
                          {m.summary && (
                            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                              {m.summary}
                            </p>
                          )}
                          {m.recs && m.recs.length > 0 && (
                            <>
                              <p className="mt-3 text-mute">While you wait, these fit what you described:</p>
                              <ul className="mt-2 space-y-2">
                                {m.recs.map((p) => (
                                  <li key={p.id}>
                                    <Link
                                      to={`/product/${p.id}`}
                                      className="flex min-h-[44px] items-center gap-3 rounded-xl bg-black/30 p-2"
                                    >
                                      <div className="w-16 shrink-0">
                                        <ProductImage product={p} />
                                      </div>
                                      <span className="min-w-0 text-sm">
                                        <span className="font-display wide block text-paper">{p.name}</span>
                                        <span className="text-mute">{money(effectivePrice(p))}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {pending && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3.5">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/70"
                              style={{ animationDelay: `${i * 150}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Your reply */}
                  <div className="shrink-0 border-t border-white/10 bg-black/20 p-3">
                    {step === 0 && (
                      <div className="flex flex-wrap gap-2">
                        {USES.map(([label, cat]) => (
                          <button key={label} type="button" className={chip} onClick={() => pickUse(label, cat)}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="range"
                          min="100000"
                          max="600000"
                          step="10000"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          aria-label="Budget"
                          className="w-full accent-[#8FB4FF]"
                        />
                        <span className="font-mono text-xs text-paper">Up to {money(budget)}</span>
                        <button
                          type="button"
                          onClick={confirmBudget}
                          className="ml-auto min-h-[44px] rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink"
                        >
                          Confirm
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-wrap gap-2">
                        {brands.map((b) => (
                          <button key={b} type="button" className={chip} onClick={() => pickBrand(b)}>
                            {b}
                          </button>
                        ))}
                        <button type="button" className={chip} onClick={() => pickBrand('')}>
                          No preference
                        </button>
                      </div>
                    )}

                    {step === 3 && (
                      <form onSubmit={sendContact} className="flex flex-col gap-2 sm:flex-row">
                        <input
                          className={field}
                          type="text"
                          required
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className={field}
                          type="text"
                          required
                          placeholder="Phone or email"
                          value={reach}
                          onChange={(e) => setReach(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="min-h-[44px] shrink-0 rounded-full bg-paper px-6 font-mono text-xs uppercase tracking-widest text-ink"
                        >
                          Send
                        </button>
                      </form>
                    )}

                    {step === 4 && (
                      <button type="button" className={chip} onClick={restart}>
                        Start over
                      </button>
                    )}

                    {step === -1 && <div className="h-11" />}
                  </div>
                </div>

                {/* Dock */}
                <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-2 md:flex">
                  <a href="mailto:hello@thetechshift.com" aria-label="Email us" className={dockBtn}>
                    <svg {...svg}>
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>
                  </a>
                  <a href="tel:+920000000000" aria-label="Call us" className={dockBtn}>
                    <svg {...svg}>
                      <path d="M6 4l3 1 1 4-2 1.5a10 10 0 005 5L14.5 14l4 1 1 3a2 2 0 01-2 2C10 20 4 14 4 6a2 2 0 012-2z" />
                    </svg>
                  </a>
                  <Link to="/shop" aria-label="Shop laptops" className={dockBtn}>
                    <svg {...svg}>
                      <path d="M6 8h12l-1 12H7L6 8z" />
                      <path d="M9 8V6a3 3 0 016 0v2" />
                    </svg>
                  </Link>
                  <Link to="/deals" aria-label="Deals" className={dockBtn}>
                    <svg {...svg}>
                      <path d="M3 12V4h8l9 9-8 8z" />
                      <circle cx="7.5" cy="8.5" r="1" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Base */}
          <div className="relative -mx-[2%] h-3.5 w-[104%] rounded-b-[1.4rem] bg-gradient-to-b from-[#3a4258] to-[#141a2c] md:h-5">
            <span className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-xl bg-[#0a0e1a] md:h-2 md:w-40" />
          </div>
        </div>

        {/* Details */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Showroom</p>
            <p className="mt-3 text-lg text-paper">22 Linden Row, Level 2</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Hours</p>
            <p className="mt-3 text-lg text-paper">Daily, 11:00 to 20:00</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">Write</p>
            <a
              href="mailto:hello@thetechshift.com"
              className="mt-1 flex min-h-[44px] items-center text-lg text-accent"
            >
              hello@thetechshift.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}