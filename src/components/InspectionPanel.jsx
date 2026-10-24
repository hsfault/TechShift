import { motion } from 'framer-motion'
import ProductImage from './ProductImage'
import Reveal from './Reveal'

const checks = [
  'Display tested for dead pixels',
  'Keyboard and trackpad checked',
  'Battery health verified',
  'Ports and charging tested',
  'Cleaned, sealed and boxed',
]
const STEP = 0.35

function Tick({ delay }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay }}
      />
    </svg>
  )
}

export default function InspectionPanel({ product }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Our promise</p>
        <Reveal
          as="h2"
          text="Every unit inspected by hand."
          className="font-display wide mt-4 block text-[10vw] leading-[1] text-paper md:text-[3.8vw]"
        />
        <ul className="mt-8">
          {checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * STEP }}
              className="flex min-h-[48px] items-center gap-4 border-b border-white/10 py-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Tick delay={i * STEP + 0.2} />
              </span>
              <span className="text-paper">{c}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden">
        <ProductImage product={product} className="w-full" />
        <div className="scan" />
        <motion.div
          initial={{ opacity: 0, scale: 1.8, rotate: -14 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ delay: checks.length * STEP + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
          className="glass absolute right-3 top-4 rounded-full border-accent/60 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-paper"
        >
          QC passed · 5/5
        </motion.div>
      </div>
    </div>
  )
}