import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from './Footer'

const ease = [0.76, 0, 0.24, 1]

export default function PageTransition({ children, label = '' }) {
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="relative z-0">{children}</main>
      <Footer />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0D14]"
        initial={{ y: '0%' }}
        animate={{ y: '-100%', transition: { duration: 0.8, ease, delay: 0.1 } }}
        exit={{ y: ['100%', '0%'], transition: { duration: 0.6, ease } }}
      >
        <span className="font-display wide text-3xl text-white md:text-6xl">
          {label}
        </span>
      </motion.div>
    </>
  )
}