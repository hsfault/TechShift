import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function StatCounter({ to, decimals = 0, prefix = '', suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <div ref={ref} className="md:border-l md:border-white/10 md:pl-10 md:first:border-l-0 md:first:pl-0">
      <p className="font-display wide whitespace-nowrap text-[12vw] leading-none tabular-nums text-paper md:text-[5vw]">
        {prefix}
        {val.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">{label}</p>
    </div>
  )
}