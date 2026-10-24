import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion'
import useSceneSection from '../hooks/useSceneSection'
import { createPoseStore } from '../lib/poseStore'
import { heroPose } from '../lib/pose'
import BrandMarquee from '../components/BrandMarquee'
import CategoryRail from '../components/CategoryRail'
import DealRail from '../components/DealRail'
import PromoBand from '../components/PromoBand'
import BestSellers from '../components/BestSellers'
import StatCounter from '../components/StatCounter'
import Scene from '../components/Scene'
import SaleStage from '../components/SaleStage'
import Spotlight from '../components/Spotlight'
import Reveal from '../components/Reveal'

// The 3D laptop loads after the page and fades in softly
const LaptopScene = lazy(() =>
  import('../components/LaptopScene').then((m) => ({
    default: function FadeInScene(props) {
      const Inner = m.default
      return (
        <div className="fade-in h-full w-full">
          <Inner {...props} />
        </div>
      )
    },
  }))
)

const scrimUp = {
  background:
    'linear-gradient(to top, #080D1A 0%, rgba(8,13,26,0.75) 45%, rgba(8,13,26,0) 100%)',
}

const why = [
  {
    t: 'Every laptop inspected before it ships.',
    d: 'A bench check on the display, keyboard, battery and ports before anything leaves our shop.',
  },
  {
    t: 'Official warranty on every brand.',
    d: 'HP, Lenovo, Dell, ASUS, Acer and MSI. Covered, and honored.',
  },
  {
    t: 'Free delivery. Pay when it arrives.',
    d: 'Nationwide shipping, cash on delivery and a 7-day replacement window.',
  },
]

// Giant faint outline word, decoration only
function Ghost({ word, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`outline-text font-display wide pointer-events-none absolute -z-10 select-none whitespace-nowrap text-[24vw] leading-none opacity-[0.14] ${className}`}
    >
      {word}
    </span>
  )
}

// Section with optional line grid and ghost word behind it
function Band({ children, word, ghost = '', grid = false, className = '' }) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      {grid && <div className="grid-lines pointer-events-none absolute inset-0 -z-10" />}
      {word && <Ghost word={word} className={ghost} />}
      {children}
    </section>
  )
}

function WhyUs() {
  return (
    <Band word="WHY" ghost="-right-[2vw] top-4" grid className="px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Why TechShift</p>
        <ul className="mt-10">
          {why.map((w, i) => (
            <li
              key={w.t}
              className="grid gap-4 border-t border-white/10 py-10 md:grid-cols-[10rem_1.4fr_1fr] md:items-baseline md:gap-10 md:py-14"
            >
              <span className="font-display wide outline-text text-[16vw] leading-none md:text-[5vw]">
                0{i + 1}
              </span>
              <Reveal
                as="h3"
                text={w.t}
                className="font-display wide block text-[7.5vw] leading-[1.08] text-paper md:text-[2.6vw]"
              />
              <p className="text-paper/75">{w.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  )
}

function Alerts() {
  const [sent, setSent] = useState(false)

  return (
    <section className="relative isolate flex min-h-[90svh] items-end overflow-hidden px-5 pb-20 pt-40 md:px-12 md:pb-24">
      <Scene image="/media/bg/lake.jpg" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Deal alerts</p>
        <Reveal
          as="h2"
          text="Never miss a drop."
          className="font-display wide mt-4 block text-[12vw] leading-[1] text-paper md:text-[5vw]"
        />
        {sent ? (
          <p className="mt-10 text-paper/90">You’re on the list. The next sale lands in your inbox first.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              className="glass min-h-[52px] min-w-0 flex-1 rounded-full bg-transparent px-6 text-base text-paper placeholder:text-mute focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-[52px] rounded-full bg-paper px-8 font-mono text-xs uppercase tracking-widest text-ink"
            >
              Get deal alerts
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  const [store] = useState(createPoseStore)
  const [sceneOn, setSceneOn] = useState(true)
  const heroRef = useRef(null)
  const onVisible = useCallback((_, visible) => setSceneOn(visible), [])

  const heroP = useSceneSection({ ref: heroRef, id: 'hero', store, poseFn: heroPose, onVisible })

  const techX = useTransform(heroP, [0, 0.6], ['0%', '-42%'])
  const shiftX = useTransform(heroP, [0, 0.6], ['0%', '42%'])
  const heroHead = useTransform(heroP, [0, 0.5, 0.9], [1, 0.5, 0])
  const cap1 = useTransform(heroP, [0, 0.1], [1, 0])
  const cap1Events = useTransform(heroP, (v) => (v < 0.08 ? 'auto' : 'none'))
  const cap2 = useTransform(heroP, [0.5, 0.7], [0, 1])
  const cap2Y = useTransform(heroP, [0.5, 0.7], [24, 0])

  return (
    <div>
      {/* 1. Hero: the 3D laptop wakes up */}
      <section ref={heroRef} className="relative h-[240vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Scene image="/media/bg/hero.jpg" eager />

          <motion.div
            style={{ opacity: heroHead }}
            className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center"
          >
            <p className="relative mb-2 font-mono text-[11px] uppercase tracking-[0.5em] text-mute md:text-xs">
              The
            </p>
            <div className="relative flex flex-col items-center leading-[0.85] md:flex-row md:gap-[2vw]">
              <motion.span
                style={{ x: techX }}
                className="font-display wide block text-[19vw] text-paper md:text-[11vw]"
              >
                TECH
              </motion.span>
              <motion.span
                style={{ x: shiftX }}
                className="font-display wide outline-text block text-[19vw] md:text-[11vw]"
              >
                SHIFT
              </motion.span>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-[2]">
            <Suspense fallback={null}>
              <LaptopScene store={store} active={sceneOn} />
            </Suspense>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-64" style={scrimUp} />

          <motion.div
            style={{ opacity: cap1, pointerEvents: cap1Events }}
            className="absolute inset-x-0 bottom-10 z-[4] flex flex-col items-center gap-5 px-6 text-center"
          >
            <p className="max-w-xs text-sm text-paper/90 md:max-w-md md:text-base">
              Every serious laptop. One trusted shop.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="flex min-h-[48px] items-center rounded-full bg-paper px-7 font-mono text-xs uppercase tracking-widest text-ink"
              >
                Shop all laptops
              </Link>
              <Link
                to="/deals"
                className="glass flex min-h-[48px] items-center rounded-full px-7 font-mono text-xs uppercase tracking-widest text-paper"
              >
                Today’s deals
              </Link>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-mute">Scroll</span>
          </motion.div>

          <motion.div
            style={{ opacity: cap2, y: cap2Y }}
            className="pointer-events-none absolute inset-x-0 bottom-12 z-[4] px-6 text-center"
          >
            <p className="font-display wide text-2xl text-paper md:text-4xl">Awake before you are.</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-accent md:text-xs">
              Shift up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Brands and lines */}
      <Band grid className="py-16 md:py-24">
        <p className="mb-8 px-5 font-mono text-[11px] uppercase tracking-[0.3em] text-mute md:px-12">
          Every brand you trust
        </p>
        <BrandMarquee />
      </Band>

      {/* 3. Flash deals */}
      <Band word="DEALS" ghost="-right-[2vw] top-6" className="py-20 md:py-28">
        <DealRail />
      </Band>

      {/* 4. Sale stage */}
      <SaleStage />

      {/* 5. Shop by use */}
      <Band word="SHOP" ghost="-left-[2vw] bottom-0" grid className="px-5 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Shop by use</p>
          <CategoryRail />
        </div>
      </Band>

      {/* 6. Promo lineups */}
      <PromoBand
        eyebrow="Back to work"
        lines={['Built for', 'the office.']}
        body="ThinkPad, EliteBook and Latitude. Business laptops with real keyboards, real security and real warranty."
        to="/shop?category=business"
        cta="Shop business laptops"
        ids={['lenovo-thinkpad-t14', 'hp-elitebook-840-g9', 'dell-latitude-7440']}
        glow="rgba(77,124,255,0.36)"
      />
      <PromoBand
        eyebrow="Game on"
        lines={['Play', 'without limits.']}
        body="ROG, Legion and Katana. High refresh screens and RTX graphics, priced to play."
        to="/shop?category=gaming"
        cta="Shop gaming laptops"
        ids={['asus-rog-strix-g16', 'lenovo-legion-5-pro', 'msi-katana-15']}
        glow="rgba(168,85,247,0.38)"
      />

      {/* 7. Best sellers */}
      <Band word="TOP" ghost="-right-[2vw] top-4" className="py-20 md:py-28">
        <BestSellers />
      </Band>

      {/* 8. Spotlight */}
      <Spotlight />

      {/* 9. Why TechShift */}
      <WhyUs />

      {/* 10. Proof */}
      <section className="relative isolate overflow-hidden px-6 py-28 md:px-16 md:py-40">
        <Scene image="/media/bg/ridge.jpg" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Proof</p>
          <Reveal
            as="blockquote"
            text="Ordered a ThinkPad on Monday, at my desk by Wednesday, exactly as described."
            className="font-display wide mt-8 block text-[8.5vw] leading-[1.05] text-paper md:text-[3.8vw]"
          />
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mute">Amna R. · Film editor</p>
          <div className="mt-20 flex flex-col gap-12 md:flex-row md:gap-10">
            <StatCounter to={15000} suffix="+" label="Laptops delivered" />
            <StatCounter to={4.7} decimals={1} suffix="/5" label="Average rating" />
            <StatCounter to={7} suffix=" days" label="Replacement window" />
          </div>
        </div>
      </section>

      {/* 11. Deal alerts */}
      <Alerts />
    </div>
  )
}