import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Reveal({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={false}
            animate={{ y: inView ? '0%' : '110%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.06 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}